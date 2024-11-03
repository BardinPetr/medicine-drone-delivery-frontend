import {Injectable, OnDestroy} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ApiProviderService} from "../api/api-provider.service";
import {MetamodelService} from "./meta/metamodel.service";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";
import {AuthService} from "./auth/auth.service";
import {BaseFormComponent} from "../components/base-form/base-form.component";

@Injectable({
  providedIn: 'root'
})
export class CUDialogService implements OnDestroy {
  dialogRef: DynamicDialogRef | undefined;

  constructor(
    private apiProvider: ApiProviderService,
    private meta: MetamodelService,
    private route: ActivatedRoute,
    private message: MessageService,
    private authService: AuthService,
    private dialogService: DialogService
  ) {
  }

  openCreate(entityName: string) {
    this.show(false, entityName, {})
  }

  openEdit(entityName: string, entityData: any) {
    this.show(true, entityName, entityData)
  }

  ngOnDestroy() {
    if (this.dialogRef)
      this.dialogRef.close();
  }

  private show(edit: boolean, entityName: string, entityData: any) {
    this.dialogRef = this
      .dialogService
      .open(BaseFormComponent, {
        data: {entityName, entityData, edit},
        header: (edit ? 'Edit ' : 'Create ') + entityName,
        modal: true,
        maximizable: true,
        style: {
          minWidth: '50vw',
          minHeight: '80vh'
        }
      });
  }
}
