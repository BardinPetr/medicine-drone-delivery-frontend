import {Component, OnDestroy, ViewChild} from '@angular/core';
import {MetamodelService} from "../../services/meta/metamodel.service";
import {ActivatedRoute} from "@angular/router";
import {ApiProviderService} from "../../api/api-provider.service";
import {ColDef} from "@ag-grid-community/core";
import {EntityMeta} from "../../services/meta/metamodel";
import {ActionDef, BaseTableComponent} from "../../components/base-table/base-table.component";
import {MessageService} from "primeng/api";
import {AuthService} from "../../services/auth/auth.service";
import {CUDialogService} from "../../services/cudialog.service";
import {map, Subscription} from "rxjs";
import {RegisterDto} from "../../../lib";
import RoleEnum = RegisterDto.RoleEnum;
import {IMqttMessage, MqttService} from "ngx-mqtt";

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrl: './table-page.component.sass'
})
export class TablePageComponent implements OnDestroy {
  @ViewChild('mainTable') mainTable?: BaseTableComponent = undefined;
  @ViewChild('auditTable') auditTable?: BaseTableComponent = undefined;

  auditDialogVisible: boolean = false

  entityMeta: EntityMeta;
  columnDefs: ColDef[] = [];
  auditColumnDefs: ColDef[] = [];

  private api: any;
  private subs: Subscription[] = [];
  actionDefs: ActionDef[] = [
    {
      label: "Create",
      icon: "plus",
      severity: "success",
      static: true,
      handler: (_) => {
        this.cuDialogService.openCreate(this.entityMeta.name)
      }
    },
    {
      label: "Audit",
      icon: "search",
      severity: "info",
      static: true,
      handler: (_) => {
        this.auditDialogVisible = true
        this.auditTable!.refresh()
      }
    },
    {
      label: "Edit",
      icon: "file-edit",
      severity: "warning",
      allowActivate: (x) => this.allowActivateOwned(x),
      handler: (x) => {
        this.cuDialogService.openEdit(this.entityMeta.name, x)
      }
    },
    {
      label: "Delete",
      icon: "trash",
      severity: "danger",
      allowActivate: (x) => this.allowActivateOwned(x),
      handler: (x) => {
        this.api
          .remove(x.id)
          .subscribe({
            complete: () => this.successMessage()
          })
      }
    }
  ]

  constructor(
    apiProvider: ApiProviderService,
    meta: MetamodelService,
    route: ActivatedRoute,
    private message: MessageService,
    private authService: AuthService,
    private cuDialogService: CUDialogService,
    private mqtt: MqttService
  ) {
    const viewId = route.snapshot.routeConfig?.data!['id']
    if (!viewId) {
      console.error(route.snapshot)
      throw Error("Invalid page")
    }

    this.api = apiProvider.getAPI(viewId)
    this.entityMeta = meta.getEntity(viewId)
    this.columnDefs = meta.getTableColumns(viewId)
    this.auditColumnDefs = meta.getTableColumns('Audit')

    this.subs.push(this.mqtt
      .observe(`/notify/${viewId}`)
      .subscribe((msg: IMqttMessage) => {
        console.warn("MQTT UPDATE : " + msg.payload)
        this.mainTable!.refresh()
        this.auditTable!.refresh()
      }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe())
  }

  allowActivateOwned(x: any): boolean {
    return this.authService.state?.username == x?.ownerUsername ||
      this.authService.state?.role == RoleEnum.Admin
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

  auditFetchWrapper = (page: any, filter: any) =>
    this.api
      .audit(page)
      .pipe(map((x: any[]) => ({content: x})))
}
