import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ColDef} from "@ag-grid-community/core";
import {MetamodelService} from "../../services/meta/metamodel.service";
import {User, UserControllerService} from "../../../lib";
import {ActionDef, BaseTableComponent} from "../../components/base-table/base-table.component";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.sass'
})
export class AdminPageComponent implements OnDestroy {
  @ViewChild('table') table?: BaseTableComponent = undefined;

  columnDefs: ColDef[] = []
  actionDefs: ActionDef[] = [
    {
      label: "Verify",
      icon: "check",
      severity: "danger",
      allowActivate: (x: User) => x.role == User.RoleEnum.AdminPending,
      handler: (x: User) => {
        this.adminApi
          .verifyAdmin(x.id!!)
          .subscribe({
            complete: () => {
              // this.message.add({
              //   severity: 'success',
              //   summary: 'Success'
              // })
            },
          })
      }
    }
  ]
  private updater: any;

  constructor(
    private adminApi: UserControllerService,
    meta: MetamodelService,
  ) {
    this.columnDefs = meta.getTableColumns('User')

    this.updater = setInterval(() => {
      this.table!.refresh()
    }, 1000)
  }

  ngOnDestroy(): void {
    clearInterval(this.updater)
  }

  fetchWrapper = (page: any, filter: any) => {
    return this.adminApi.list(page, filter)
  }
}
