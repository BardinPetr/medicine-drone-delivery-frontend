import {NgModule} from "@angular/core";
import {MetamodelService} from "./meta/metamodel.service";
import {DialogService} from "primeng/dynamicdialog";
import {CUDialogService} from "./cudialog.service";
import {NotificationWsService} from "@/services/notifications/notification.ws.service";

@NgModule({
  providers: [
    MetamodelService,
    DialogService,
    CUDialogService,
    NotificationWsService
  ],
})
export class ServicesModule {
}
