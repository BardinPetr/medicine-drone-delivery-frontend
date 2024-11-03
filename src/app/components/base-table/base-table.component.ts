import {Component, Input, ViewChild} from '@angular/core';
import {ColDef, GridReadyEvent, IDatasource, IGetRowsParams, RowSelectionOptions} from "@ag-grid-community/core";
import {encodeFilter} from "../../utils/query";
import {BehaviorSubject, map, Observable} from "rxjs";
import {AgGridAngular} from "@ag-grid-community/angular";

export interface ActionDef {
  label: string
  icon: string
  severity?: 'success' | 'info' | 'warning' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast'
  handler: (row: any) => void
  allowActivate?: (row: any) => boolean
  static?: boolean
}

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.sass']
})
export class BaseTableComponent {
  @ViewChild('agGrid') agGrid?: AgGridAngular = undefined;

  @Input() public columnDefs: ColDef[] = []
  @Input() public actionDefs: ActionDef[] = []
  @Input() public fetchDataFunc?: ((paging: any, filter: any) => Observable<any>)

  public readonly selectedRow = new BehaviorSubject<any>(null);

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    floatingFilter: true,
  };
  public rowSelection: RowSelectionOptions = {
    mode: 'singleRow',
    checkboxes: true,
    enableClickSelection: true,
  };

  public pageSize: number = 5

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

    setInterval(() => {
      this.refresh()
    }, 1000)

    console.warn("!!")
  }

  refresh() {
    this.agGrid!!.api.refreshInfiniteCache()
  }

  onSelectionChanged(event: any) {
    const selectedRows = this.agGrid!!.api.getSelectedRows();
    this.selectedRow.next(selectedRows.length == 1 ? selectedRows[0] : null)
  }

  isActionDisabled(def: ActionDef) {
    return this
      .selectedRow
      .pipe(map(
        x => !def.static && (!x || (def.allowActivate && !def.allowActivate(x)))
      ))
  }

  actionHandler(act: ActionDef) {
    act.handler(this.selectedRow.value)
    this.refresh()
  }
}
