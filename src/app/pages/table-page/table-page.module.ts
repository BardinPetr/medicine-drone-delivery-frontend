import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {ComponentsModule} from "../../components/components.module";
import {TablePageComponent} from "./table-page.component";
import {CardModule} from "primeng/card";

@NgModule({
  declarations: [
    TablePageComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ComponentsModule,
    CardModule
  ],
  exports: [
    TablePageComponent
  ]
})
export class TablePageModule {
}
