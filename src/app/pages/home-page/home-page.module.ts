import {NgModule} from "@angular/core";
import {HomePageComponent} from "./home-page.component";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {ComponentsModule} from "@/components/components.module";

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ComponentsModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomePageModule {
}
