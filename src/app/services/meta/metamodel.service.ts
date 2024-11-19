import {Injectable} from '@angular/core';
import {ColDef} from "@ag-grid-community/core";
import {EntityFieldMeta, EntityFieldMetaType as MT, EntityMeta, ViewMeta} from "./metamodel";
import {metamodelData} from "./data";


@Injectable({
  providedIn: 'root'
})
export class MetamodelService {

  getEntity(id: string): EntityMeta {
    return metamodelData.entities.filter(x => x.name == id)[0];
  }

  getView(id: string): ViewMeta {
    return metamodelData.views.filter(x => x.name == id)[0];
  }

  getEnumValues(id: string): string[] {
    return metamodelData.enums.filter(x => x.name == id)[0].values;
  }

  getTableColumns(viewId: string): ColDef[] {
    console.log(viewId)
    console.log(this.getView(viewId))
    return this
      .getView(viewId)
      .columns
      .map(fieldName => {
        const fieldDesc = this.resolveField(viewId, fieldName)
        return {
          "field": fieldName,
          ...this.getCell(fieldDesc)
        }
      })
  }

  private resolveField(rootEntityName: string, fieldName: string): EntityFieldMeta {
    let e = this.getEntity(rootEntityName)
    let field: EntityFieldMeta
    for (let i of fieldName.split('.')) {
      field = e.fields.find(x => x.name == i)!!
      if (field.type == MT.REL)
        e = this.getEntity(field.entityRef!)
    }
    return field!
  }

  private getCell(field: EntityFieldMeta): ColDef {
    switch (field.type) {
      case MT.INTEGER:
      case MT.FLOAT:
        let col: ColDef = {
          filter: "agNumberColumnFilter",
          filterParams: {
            maxNumConditions: 1,
            filterOptions: ["equals"],
          },
          cellDataType: 'number'
        }
        if (field.name === 'id')
          col.sort = 'asc'
        return col
      case MT.STRING:
        return {
          filter: "agTextColumnFilter",
          filterParams: {
            maxNumConditions: 1,
            filterOptions: ["equals", "contains"],
          },
          cellDataType: 'text'
        }
      case MT.DATE:
        return {
          filter: "agDateColumnFilter",
          filterParams: {
            maxNumConditions: 1,
            filterOptions: ["equals"],
          },
          cellDataType: 'isoDateString'
        }
      case MT.ENUM:
        return {
          filter: "agTextColumnFilter",
          filterParams: {
            maxNumConditions: 1,
            values: this.getEnumValues(field.entityRef!),
            filterOptions: ["equals"],
          },
          cellDataType: 'text'
        }
    }
    return {}
  }

}


