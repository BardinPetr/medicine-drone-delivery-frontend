import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {ComponentsModule} from "../../components/components.module";
import {TablePageComponent} from "./table-page.component";

@NgModule({
  declarations: [
    TablePageComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ComponentsModule
  ],
  exports: [
    TablePageComponent
  ]
})
export class TablePageModule {
}
