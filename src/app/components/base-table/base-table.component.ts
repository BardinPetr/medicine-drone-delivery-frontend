import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
export class BaseTableComponent implements OnInit {
  @ViewChild('agGrid') agGrid?: AgGridAngular = undefined;

  @Input() public paged: boolean = true;
  @Input() public interactive: boolean = true;
  @Input() public staticData: boolean = false;
  @Input() public actionDefs: ActionDef[] = []
  @Input() public fetchDataFunc?: ((paging: any, filter: any) => Observable<any>)
  @Input() columnDefs: ColDef[] = []

  public readonly selectedRow = new BehaviorSubject<any>(null);
  public staticRowData?: any[] = undefined

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
  };
  public rowSelection: RowSelectionOptions = {
    mode: 'singleRow',
  };

  public pageSize: number = 5

  public get outColumnDefs(): ColDef[] {
    if (this.interactive)
      return this.columnDefs
    return this.columnDefs.map(x => {
      return {
        ...x,
        filter: null,
        filterParams: null,
        sortable: false
      }
    })
  }

  ngOnInit(): void {
    this.rowSelection.checkboxes = this.interactive
    this.rowSelection.enableClickSelection = this.interactive
    this.defaultColDef.floatingFilter = this.interactive
  }

  onGridReady(params: GridReadyEvent) {
    if(this.staticData) {
      this.fetchDataFunc!(null, null)
        .subscribe(x => this.staticRowData = x.content)
      return
    }

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
              let content = data.content!
              if (content.length)
                params.successCallback(data.content!, data.totalElements)
              else
                params.failCallback()
            }
          )
      },
    };
    params.api.setGridOption("datasource", dataSource)

    // TODO
    setInterval(() => {
      // this.refresh()
    }, 1000)
  }

  refresh() {
    if(this.staticData) {
      this.fetchDataFunc!(null, null)
        .subscribe(x => this.staticRowData = x.content)
      return
    }

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
    const value = this.selectedRow.value
    this.selectedRow.next(null)
    this.agGrid!.api.deselectAll()
    act.handler(value)
    setTimeout(() => {
      this.refresh()
    }, 500)
  }
}
