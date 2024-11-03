import {NgModule} from "@angular/core";
import {HomePageModule} from "./home-page/home-page.module";
import {TablePageModule} from "./table-page/table-page.module";
import {AdminPageModule} from "./admin-page/admin-page.module";

@NgModule({
  declarations: [],
  imports: [
    HomePageModule,
    TablePageModule,
    AdminPageModule
  ]
})
export class PagesModule {
}
