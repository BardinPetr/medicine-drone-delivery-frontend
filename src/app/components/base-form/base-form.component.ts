import {Component, Input} from '@angular/core';
import {EntityFieldMeta, EntityFieldMetaType, EntityMeta} from "../../services/meta/model";
import {FormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {MetamodelService} from "../../services/meta/metamodel.service";
import {Observable} from "rxjs";
import {ApiProviderService} from "../../api/api-provider.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {TranslationService} from "../../services/translate/translation.service";
import {flattenData} from "./utils";


@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrl: './base-form.component.sass'
})
export class BaseFormComponent {
  readonly MT = EntityFieldMetaType;

  // @ts-ignore
  @Input() entityName: string;
  @Input() entityData: any;

  entityMeta: EntityMeta;
  entityFields: EntityFieldMeta[] = [];

  form: UntypedFormGroup = new UntypedFormGroup({});

  relEnums: { [key: string]: string[] } = {};
  relEntities: { [key: string]: any[] } = {};
  private isEdit: EntityMeta;
  private ownApi: any;

  constructor(public meta: MetamodelService,
              private apiProvider: ApiProviderService,
              private dialogApi: DynamicDialogRef,
              private messageApi: MessageService,
              public trs: TranslationService,
              dialogConfig: DynamicDialogConfig,
  ) {
    this.entityName = dialogConfig.data.entityName
    this.isEdit = dialogConfig.data.edit

    this.entityData = dialogConfig.data.entityData
    const flatData = flattenData(this.entityData)

    this.ownApi = apiProvider.getAPI(this.entityName)
    this.entityMeta = this.meta.getEntity(this.entityName)
    this.entityFields = this.flattenFields(Object.values(this.entityMeta.fields))

    this.entityFields
      .forEach((field) => {
        const name = field.name
        const control = new FormControl(
          flatData[name],
          {
            validators: field.nullable ? [] : [Validators.required],
            nonNullable: !field.nullable
          }
        );

        if (field.readonly)
          control.disable()

        this.form.addControl(name, control);

        if (field.type === EntityFieldMetaType.ENUM) {
          this.relEnums[name] =
            this
              .meta
              .getEnumValues(field.entityRef!)
        } else if (field.type === EntityFieldMetaType.REL) {
          this
            .getRelatedEntities(field.entityRef!)
            .subscribe(items => {
              if (field.nullable)
                items = [{}, ...items]
              this.relEntities[name] = items
            })
        }
      });
  }

  onSubmit(): void {
    const formData = this.form.value;
    Object
      .values(this.entityMeta.fields)
      .forEach((field) => {
        if (field.type === EntityFieldMetaType.EMB) {
          let embeddableData: { [key: string]: any } = {};
          Object
            .keys(this.meta.getEntity(field.entityRef!).fields)
            .forEach((embName) => {
              embeddableData[embName] = formData[embName];
              delete formData[embName];
            });
          formData[field.name] = embeddableData;
        } else if (field.type === EntityFieldMetaType.REL) {
          const orig = formData[field.name]
          if (!orig || !Object.keys(orig).length)
            formData[field.name] = null
        }
      });
    this.submit(formData)
  }

  private flattenFields(fields: EntityFieldMeta[]): EntityFieldMeta[] {
    return fields
      .flatMap((x) => {
        if (x.name === 'id' && !this.entityData[x.name]) return []

        if (x.type === EntityFieldMetaType.EMB)
          return Object.values(this.meta.getEntity(x.entityRef!).fields)
        return [x]
      })
  }

  private getRelatedEntities(entityName: string): Observable<any[]> {
    return this
      .apiProvider
      .getAPI(entityName)
      .listAll()
  }

  private submit(data: any) {
    let cmd = this.isEdit ? this.ownApi.update(this.entityData.id, data) : this.ownApi.create(data)
    cmd.subscribe({
      complete: () => {
        this.messageApi.add({
          severity: 'success',
          summary: 'Completed successfully',
        })
        this.dialogApi.close()
      }
    })
  }
}
