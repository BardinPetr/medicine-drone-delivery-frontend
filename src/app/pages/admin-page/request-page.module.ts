import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {ComponentsModule} from "../../components/components.module";
import {RequestPageComponent} from "./request-page.component";
import {CardModule} from "primeng/card";
import {PickListModule} from "primeng/picklist";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    RequestPageComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ComponentsModule,
    CardModule,
    PickListModule,
    InputNumberModule,
    FormsModule
  ],
  exports: [
    RequestPageComponent
  ]
})
export class RequestPageModule {
}
