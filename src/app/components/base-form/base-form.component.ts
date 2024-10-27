import {Component, Input, OnInit} from '@angular/core';
import {EntityFieldMeta, EntityFieldMetaType} from "../../services/meta/model";
import {FormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {MetamodelService} from "../../services/meta/metamodel.service";

const getEnumValues = (enumName: string): string[] => {
  return ['value1', 'value2', 'value3'];
};


const getRelatedEntities = (entityName: string): any[] => {
  return [
    {id: 1, name: 'Entity 1'},
    {id: 2, name: 'Entity 2'},
    {id: 3, name: 'Entity 3'},
  ];
};

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrl: './base-form.component.sass'
})
export class BaseFormComponent implements OnInit {
  // @ts-ignore
  @Input() entityName: string;
  @Input() entityData: any;

  entityFields: EntityFieldMeta[] = [];

  form: UntypedFormGroup = new UntypedFormGroup({});

  relEnums: { [key: string]: string[] } = {};
  relEntities: { [key: string]: string[] } = {};
  protected readonly MT = EntityFieldMetaType;

  constructor(private meta: MetamodelService) {
  }

  ngOnInit(): void {
    const entityMeta = this.meta.getEntity(this.entityName)
    this.entityFields = this.flattenFields(Object.values(entityMeta.fields))

    this.entityFields
      .forEach((field) => {
        const name = field.name

        const control = new FormControl(
          this.entityData[name],
          {
            validators: field.nullable ? [] : [Validators.required],
            nonNullable: !field.nullable
          }
        );
        if (field.readonly)
          control.disable()
        this.form.addControl(name, control);

        if (field.type === EntityFieldMetaType.ENUM) {
          this.relEnums[name] = getEnumValues(field.entityRef!);
        } else if (field.type === EntityFieldMetaType.REL) {
          this.relEntities[name] = getRelatedEntities(field.entityRef!);
        }
      });
  }

  onSubmit(): void {
    const formData = this.form.value;
    Object.values(this.meta.getEntity(this.entityName).fields)
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
        }
      });
    console.log(formData);
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
}
