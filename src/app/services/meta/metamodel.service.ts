import {Injectable} from '@angular/core';
import {ColDef} from "@ag-grid-community/core";
import {EntityFieldMeta, EntityFieldMetaType as MT, EntityMeta} from "./metamodel";
import {metamodelData} from "./data";


@Injectable({
  providedIn: 'root'
})
export class MetamodelService {

  getEntity(id: string): EntityMeta {
    return metamodelData.entities[id]
  }

  getEnumValues(id: string): string[] {
    return metamodelData.enums[id].values
  }

  getTableColumns(viewId: string): ColDef[] {
    return metamodelData
      .views[viewId]
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
    let e = metamodelData.entities[rootEntityName]
    let field: EntityFieldMeta
    for (let i of fieldName.split('.')) {
      field = e.fields[i]
      if (field.type == MT.REL)
        e = metamodelData.entities[field.entityRef!]
    }
    return field!
  }

  private getCell(field: EntityFieldMeta): ColDef {
    switch (field.type) {
      case MT.INTEGER:
      case MT.FLOAT:
        let col : ColDef = {
          filter: "agNumberColumnFilter",
          filterParams: {
            maxNumConditions: 1,
            filterOptions: ["equals"],
          },
          cellDataType: 'number'
        }
        if(field.name === 'id')
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
            values: metamodelData.enums[field.entityRef!].values,
            filterOptions: ["equals"],
          },
          cellDataType: 'text'
        }
    }
    return {}
  }

}


