import {Component, Input} from '@angular/core';
import {ColDef, GridReadyEvent, IDatasource, IGetRowsParams} from "@ag-grid-community/core";
import {encodeFilter} from "../../utils/query";
import {Observable} from "rxjs";


@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.sass']
})
export class BaseTableComponent {
  @Input() public columnDefs: ColDef[] = []
  @Input() public fetchDataFunc?: ((paging: any, filter: any) => Observable<any>)

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    floatingFilter: true,
  };
  public pageSize: number = 5

  public rowData: any;

  onGridReady(params: GridReadyEvent) {
    const dataSource: IDatasource = {
      rowCount: undefined,
      getRows: (params: IGetRowsParams) => {
        const size = params.endRow - params.startRow
        this.fetchDataFunc!(
          {
            size: size,
            page: Math.floor(params.startRow / size),
            sort: params.sortModel.map(x => `${x.colId},${x.sort}`)
          }, encodeFilter(params.filterModel)
        )
          .subscribe(
            (data) => {
              params.successCallback(data.content!, data.totalElements)
            }
          )
      },
    };
    params.api.setGridOption("datasource", dataSource)
  }
}
