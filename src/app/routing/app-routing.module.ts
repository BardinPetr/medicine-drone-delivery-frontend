import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "../pages/home-page/home-page.component";
import {CommonModule} from "@angular/common";
import {MenubarModule} from "primeng/menubar";
import {PagesModule} from "../pages/pages.module";
import {ButtonModule} from "primeng/button";
import {ChipModule} from "primeng/chip";
import {NavbarComponent} from "./navbar/navbar.component";
import {tableRoutes} from "../services/meta/metaroutes";
import {ComponentsModule} from "../components/components.module";


const routes: Routes = [
  {
    path: "",
    title: "Home",
    component: HomePageComponent
  },
  ...tableRoutes,
  {
    path: "**",
    redirectTo: "/"
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    MenubarModule,
    PagesModule,
    ButtonModule,
    ChipModule,
    ComponentsModule
  ],
  exports: [RouterModule, NavbarComponent],
  declarations: [NavbarComponent]
})
export class AppRoutingModule {
}
