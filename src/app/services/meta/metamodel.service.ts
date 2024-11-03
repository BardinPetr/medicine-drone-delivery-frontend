import {Injectable} from '@angular/core';
import {metamodelData} from "./entities";
import {ColDef} from "@ag-grid-community/core";
import {TranslationService} from "../translate/translation.service";
import {EntityFieldMeta, EntityFieldMetaType as MT, EntityMeta} from "./model";


@Injectable({
  providedIn: 'root'
})
export class MetamodelService {

  constructor(
    tr: TranslationService,
  ) {
  }

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
          ...this.getFilter(fieldDesc)
        }
      })
  }

  private resolveField(rootEntityName: string, fieldName: string): EntityFieldMeta {
    let e = metamodelData.entities[rootEntityName]
    let field: EntityFieldMeta
    for (let i of fieldName.split('.')) {
      field = e.fields[i]
      if (field.type == MT.REL || field.type == MT.EMB)
        e = metamodelData.entities[field.entityRef!]
    }
    return field!
  }

  private getFilter(field: EntityFieldMeta): ColDef {
    switch (field.type) {
      case MT.INTEGER:
      case MT.FLOAT:
        return {
          filter: "agNumberColumnFilter",
          filterParams: {
            filterOptions: ["equals"],
          },
        }
      case MT.STRING:
        return {
          filter: "agTextColumnFilter",
          filterParams: {
            filterOptions: ["equals", "contains"],
          },
        }
      case MT.DATE:
        return {
          filter: "agDateColumnFilter",
          filterParams: {
            filterOptions: ["equals"],
          },
        }
      case MT.ENUM:
        return {
          filter: "agTextColumnFilter",
          filterParams: {
            values: metamodelData.enums[field.entityRef!].values,
            filterOptions: ["equals"],
          },
        }
    }
    return {}
  }

}


