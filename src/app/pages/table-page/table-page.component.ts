import {Component, OnDestroy, ViewChild} from '@angular/core';
import {MetamodelService} from "@/services/meta/metamodel.service";
import {ActivatedRoute} from "@angular/router";
import {ApiProviderService} from "@/api/api-provider.service";
import {ColDef} from "@ag-grid-community/core";
import {EntityMeta, ViewMeta} from "@/services/meta/metamodel";
import {BaseTableComponent} from "@/components/base-table/base-table.component";
import {MessageService} from "primeng/api";
import {CUDialogService} from "@/services/cudialog.service";
import {Subscription} from "rxjs";
import {IActionDef} from "@/components/base-table/action-def";
import {NotificationWsService} from "@/services/notifications/notification.ws.service";

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrl: './table-page.component.sass'
})
export class TablePageComponent implements OnDestroy {
  @ViewChild('mainTable') mainTable?: BaseTableComponent = undefined;

  entityMeta: EntityMeta;
  columnDefs: ColDef[] = [];
  actionDefs: IActionDef[] = [];
  private api: any;
  private subs: Subscription[] = [];
  private viewMeta: ViewMeta;

  constructor(
    apiProvider: ApiProviderService,
    meta: MetamodelService,
    route: ActivatedRoute,
    private message: MessageService,
    private cuDialogService: CUDialogService,
    private eventService: NotificationWsService
  ) {
    const viewId = route.snapshot.routeConfig?.data!['id']
    if (!viewId) {
      console.error(route.snapshot)
      throw Error("Invalid page")
    }

    this.api = apiProvider.getAPI(viewId)
    this.entityMeta = meta.getEntity(viewId)
    this.columnDefs = meta.getTableColumns(viewId)
    this.viewMeta = meta.getView(viewId)
    this.createActionDefs()

    this.subs.push(
      this.eventService
        .watch(viewId)
        .subscribe(_ => {
          this.mainTable!.refresh()
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe())
  }

  allowActivateOwned(x: any): boolean {
    return true
  }

  successMessage() {
    this.message.add({
      severity: 'success',
      summary: 'Success'
    })
  }

  fetchWrapper = (page: any, filter: any) =>
    this.api
      .list(page, filter)

  createActionDefs() {
    this.actionDefs = []
    if (this.viewMeta.insert) {
      this.actionDefs.push({
        label: "Create",
        icon: "plus",
        severity: "success",
        static: true,
        handler: (_) => {
          this.cuDialogService.openCreate(this.entityMeta.name)
        }
      })
    }
    if (this.viewMeta.delete) {
      this.actionDefs.push({
        label: "Delete",
        icon: "trash",
        severity: "danger",
        allowActivate: (x) => this.allowActivateOwned(x) && (this.viewMeta.delete || false),
        handler: (x) => {
          this.api
            .remove(x.id)
            .subscribe({
              complete: () => this.successMessage()
            })
        }
      })
    }
    if (this.viewMeta.update) {
      this.actionDefs.push({
        label: "Edit",
        icon: "file-edit",
        severity: "warning",
        allowActivate: (x) => this.allowActivateOwned(x),
        handler: (x) => {
          this.cuDialogService.openEdit(this.entityMeta.name, x)
        }
      })
    }
  }
}
