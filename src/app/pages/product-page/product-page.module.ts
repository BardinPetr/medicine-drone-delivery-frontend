import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {ComponentsModule} from "../../components/components.module";
import {ProductPageComponent} from "./product-page.component";
import {AccordionModule} from "primeng/accordion";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";

@NgModule({
  declarations: [
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ComponentsModule,
    AccordionModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
    DropdownModule,
    MultiSelectModule
  ],
  exports: [
    ProductPageComponent
  ]
})
export class ProductPageModule {
}
