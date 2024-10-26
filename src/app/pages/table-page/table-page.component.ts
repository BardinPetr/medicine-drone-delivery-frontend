import { Component } from '@angular/core';
import {MetamodelService} from "../../services/meta/metamodel.service";
import {ActivatedRoute} from "@angular/router";
import {ApiProviderService} from "../../api/api-provider.service";
import {ColDef} from "@ag-grid-community/core";
import {Observable} from "rxjs";

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrl: './table-page.component.sass'
})
export class TablePageComponent {
  columnDefs: ColDef[] = []
  private api: any;

  constructor (
    private apiProvider: ApiProviderService,
    private meta: MetamodelService,
    private route: ActivatedRoute
  ) {
    const viewId = route.snapshot.routeConfig?.data!['id']
    if(!viewId) {
      console.error("Invalid page")
      console.error(route.snapshot)
      return
    }

    this.api = apiProvider.getAPI(viewId)
    this.columnDefs = meta.getTableColumns(viewId)
  }

  fetchWrapper = (page: any, filter: any) => {
    return this.api.list(page, filter)
  }
}
