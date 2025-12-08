import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {ComponentsModule} from "../../components/components.module";
import {CardModule} from "primeng/card";
import {PanelModule} from "primeng/panel";
import {DialogModule} from "primeng/dialog";
import {MapPageComponent} from "./map-page.component";
import {NgxMapboxGLModule} from "ngx-mapbox-gl";
import {environment} from "../../../environments/environment";

@NgModule({
  declarations: [
    MapPageComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ComponentsModule,
    CardModule,
    PanelModule,
    DialogModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapboxKey
    })
  ],
  exports: [
    MapPageComponent
  ]
})
export class MapPageModule {
}
