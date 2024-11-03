import {NgModule} from "@angular/core";
import {MetamodelService} from "./meta/metamodel.service";
import {DialogService} from "primeng/dynamicdialog";
import {CUDialogService} from "./cudialog.service";

@NgModule({
  providers: [
    MetamodelService,
    DialogService,
    CUDialogService,
  ],
})
export class ServicesModule {
}
