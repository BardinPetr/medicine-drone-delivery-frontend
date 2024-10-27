import {Component} from '@angular/core';
import {MetamodelService} from "../../services/meta/metamodel.service";
import {ActivatedRoute} from "@angular/router";
import {ApiProviderService} from "../../api/api-provider.service";
import {ColDef} from "@ag-grid-community/core";
import {EntityMeta} from "../../services/meta/model";

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrl: './table-page.component.sass'
})
export class TablePageComponent {
  entityMeta: EntityMeta;
  columnDefs: ColDef[] = []
  private api: any;

  constructor(
    private apiProvider: ApiProviderService,
    private meta: MetamodelService,
    private route: ActivatedRoute
  ) {
    const viewId = route.snapshot.routeConfig?.data!['id']
    if (!viewId) {
      console.error(route.snapshot)
      throw Error("Invalid page")
    }

    this.api = apiProvider.getAPI(viewId)
    this.entityMeta = meta.getEntity(viewId)
    this.columnDefs = meta.getTableColumns(viewId)
  }

  fetchWrapper = (page: any, filter: any) => {
    return this.api.list(page, filter)
  }
}
