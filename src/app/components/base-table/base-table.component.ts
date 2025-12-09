import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ColDef, GridReadyEvent, IDatasource, IGetRowsParams, RowSelectionOptions} from "@ag-grid-community/core";
import {encodeFilter} from "@/utils/query";
import {BehaviorSubject, map, Observable} from "rxjs";
import {AgGridAngular} from "@ag-grid-community/angular";
import {IActionDef} from "./action-def";
import {typeConverters} from "./table-type-converters";

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.sass']
})
export class BaseTableComponent implements OnInit {
  @ViewChild('agGrid') agGrid?: AgGridAngular = undefined;

  @Input() public filtered: boolean = false;
  @Input() public sorted: boolean = false;
  @Input() public paged: boolean = true;
  @Input() public interactive: boolean = true;
  @Input() public staticData: boolean = false;
  @Input() public actionDefs: IActionDef[] = []
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
  public typeDefs = typeConverters

  public pageSize: number = 20

  public get outColumnDefs(): ColDef[] {
    return this.columnDefs.map(x => {
      if (this.filtered)
        return {
          ...x,
          sortable: this.sorted
        }
      return {
        ...x,
        filter: null,
        filterParams: null,
        sortable: this.sorted
      }
    })
  }

  ngOnInit(): void {
    this.rowSelection.checkboxes = this.interactive
    this.rowSelection.enableClickSelection = this.interactive
    this.defaultColDef.floatingFilter = this.filtered
  }

  onGridReady(params: GridReadyEvent) {
    if (this.staticData) {
      this.fetchDataFunc!(null, null)
        .subscribe(x => this.staticRowData = x.content)
      return
    }

    const dataSource: IDatasource = {
      rowCount: undefined,
      getRows: (params: IGetRowsParams) => {
        const size = params.endRow - params.startRow
        this.pageSize = size
        this.fetchDataFunc!(
          {
            size: size,
            page: Math.floor(params.startRow / size),
            sort: params.sortModel.map(x => `${x.colId},${x.sort}`).join(';')
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
    // TODO check for autorefresh
  }

  refresh() {
    if (this.staticData) {
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

  isActionDisabled(def: IActionDef) {
    return this
      .selectedRow
      .pipe(map(
        x => !def.static && (!x || (def.allowActivate && !def.allowActivate(x)))
      ))
  }

  actionHandler(act: IActionDef) {
    const value = this.selectedRow.value
    this.selectedRow.next(null)
    this.agGrid!.api.deselectAll()
    act.handler(value)
    setTimeout(() => {
      this.refresh()
    }, 500)
  }
}
