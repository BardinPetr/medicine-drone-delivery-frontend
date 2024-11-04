import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {ComponentsModule} from "../../components/components.module";
import {TablePageComponent} from "./table-page.component";
import {CardModule} from "primeng/card";
import {PanelModule} from "primeng/panel";
import {DialogModule} from "primeng/dialog";

@NgModule({
  declarations: [
    TablePageComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ComponentsModule,
    CardModule,
    PanelModule,
    DialogModule
  ],
  exports: [
    TablePageComponent
  ]
})
export class TablePageModule {
}
