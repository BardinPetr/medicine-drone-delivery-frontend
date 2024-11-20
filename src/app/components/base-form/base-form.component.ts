import {Component, Input} from '@angular/core';
import {EntityFieldMeta, EntityFieldMetaType, EntityMeta} from "../../services/meta/metamodel";
import {FormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {MetamodelService} from "../../services/meta/metamodel.service";
import {Observable} from "rxjs";
import {ApiProviderService} from "../../api/api-provider.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {TranslationService} from "../../services/translate/translation.service";


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

    this.ownApi = apiProvider.getAPI(this.entityName)
    this.entityMeta = this.meta.getEntity(this.entityName)
    this.entityFields = this.entityMeta
      .fields
      // .filter(x => ((this.isEdit && !x.readonly) || !this.isEdit))

    this.entityFields
      .forEach((field) => {
        const name = field.name
        let startValue = this.entityData[name]

        if (field.type === EntityFieldMetaType.DATE && startValue)
          startValue = new Date(Date.parse(startValue))

        const control = new FormControl(
          startValue,
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
          if (field.nullable)
            this.relEnums[name] = ["", ...this.relEnums[name]]
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
    this
      .entityFields
      .forEach((field) => {
        if (!(field.name in formData)) {
          formData[field.name] = this.entityData[field.name]
          return
        }
        switch (field.type) {
          case EntityFieldMetaType.ENUM:
          case EntityFieldMetaType.STRING:
            if (formData[field.name]?.trim() === "")
              formData[field.name] = null
            break;
          case EntityFieldMetaType.REL:
            const orig = formData[field.name]
            if (!orig || orig === "" || !Object.keys(orig).length)
              formData[field.name] = null
            break;
        }
      });
    this.submit(formData)
  }

  private getRelatedEntities(entityName: string): Observable<any[]> {
    return this
      .apiProvider
      .getAPI(entityName)
      .listAll()
  }

  private submit(data: any) {
    let cmd = this.isEdit ? this.ownApi.update(this.entityData.id || 0, data) : this.ownApi.create(data)
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
