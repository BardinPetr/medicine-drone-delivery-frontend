import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {ComponentsModule} from "../../components/components.module";
import {CardModule} from "primeng/card";
import {PanelModule} from "primeng/panel";
import {DialogModule} from "primeng/dialog";
import {MapPageComponent} from "./map-page.component";
import {NgxMapboxGLModule} from "ngx-mapbox-gl";

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
      accessToken: 'pk.eyJ1IjoiYmFyZGlucGV0ciIsImEiOiJjajhpbjVtNW8wejByMzNzMTl1ajE3MnNmIn0.cxr8oxFntLscHf75rGMz9A'
    })
  ],
  exports: [
    MapPageComponent
  ]
})
export class MapPageModule {
}
