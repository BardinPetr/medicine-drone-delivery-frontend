import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {ChipModule} from "primeng/chip";
import {NavbarComponent} from "./navbar/navbar.component";
import {UserPlateComponent} from "./user-plate/user-plate.component";
import {TagModule} from "primeng/tag";
import {BaseTableComponent} from './base-table/base-table.component';
import {AgGridAngular} from "ag-grid-angular";

@NgModule({
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    ChipModule,
    TagModule,
    AgGridAngular
  ],
  declarations: [
    NavbarComponent, UserPlateComponent, BaseTableComponent
  ],
  exports: [
    NavbarComponent, UserPlateComponent, BaseTableComponent
  ]
})
export class ComponentsModule {
}
