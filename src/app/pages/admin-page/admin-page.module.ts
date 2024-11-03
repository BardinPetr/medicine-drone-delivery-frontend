import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {ComponentsModule} from "../../components/components.module";
import {AdminPageComponent} from "./admin-page.component";

@NgModule({
  declarations: [
    AdminPageComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ComponentsModule
  ],
  exports: [
    AdminPageComponent
  ]
})
export class AdminPageModule {
}
