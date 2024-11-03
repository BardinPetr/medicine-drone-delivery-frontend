import {Component} from '@angular/core';
import {ColDef} from "@ag-grid-community/core";
import {MetamodelService} from "../../services/meta/metamodel.service";
import {User, UserControllerService} from "../../../lib";
import {ActionDef} from "../../components/base-table/base-table.component";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.sass'
})
export class AdminPageComponent {
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

  constructor(
    private adminApi: UserControllerService,
    meta: MetamodelService,
  ) {
    this.columnDefs = meta.getTableColumns('User')
  }

  fetchWrapper = (page: any, filter: any) => {
    return this.adminApi.list(page, filter)
  }
}
