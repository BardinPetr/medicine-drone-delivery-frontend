import {NgModule} from "@angular/core";
import {HomePageModule} from "./home-page/home-page.module";
import {TablePageModule} from "./table-page/table-page.module";
import {AdminPageModule} from "./admin-page/admin-page.module";
import {MapPageModule} from "./map-page/map-page.module";

@NgModule({
  declarations: [],
  imports: [
    HomePageModule,
    TablePageModule,
    AdminPageModule,
    MapPageModule
  ]
})
export class PagesModule {
}
