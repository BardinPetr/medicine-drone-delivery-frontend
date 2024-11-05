import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "../pages/home-page/home-page.component";
import {CommonModule} from "@angular/common";
import {MenubarModule} from "primeng/menubar";
import {PagesModule} from "../pages/pages.module";
import {ButtonModule} from "primeng/button";
import {ChipModule} from "primeng/chip";
import {NavbarComponent} from "./navbar/navbar.component";
import {tableRoutes} from "../services/meta/metamodel.routes";
import {ComponentsModule} from "../components/components.module";
import {LoginPageComponent} from "../pages/login-page/login-page.component";
import {RegisterPageComponent} from "../pages/register-page/register-page.component";
import {AdminPageComponent} from "../pages/admin-page/admin-page.component";
import {isAdmin, isAuthenticated} from "../services/auth/auth-guard.service";
import {MapPageComponent} from "../pages/map-page/map-page.component";
import {ProductPageComponent} from "../pages/product-page/product-page.component";


const routes: Routes = [
  {
    path: "",
    title: "Home",
    component: HomePageComponent
  },
  {
    title: "Admin page",
    path: "admin",
    component: AdminPageComponent,
    canActivate: [isAdmin]
  },
  {
    title: "Map",
    path: "map",
    component: MapPageComponent,
    canActivate: [isAuthenticated]
  },
  {
    title: "Product Ops",
    path: "product-ops",
    component: ProductPageComponent,
    canActivate: [isAuthenticated]
  },
  ...tableRoutes,
  {
    title: "Login",
    path: 'login',
    component: LoginPageComponent,
  },
  {
    title: "Register",
    path: 'register',
    component: RegisterPageComponent
  },
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
