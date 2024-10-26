import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {ChipModule} from "primeng/chip";
import {TagModule} from "primeng/tag";
import {AgGridAngular} from "@ag-grid-community/angular";
import {UserPlateComponent} from "./user-plate/user-plate.component";
import {BaseTableComponent} from './base-table/base-table.component';

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
    UserPlateComponent, BaseTableComponent
  ],
  exports: [
    UserPlateComponent, BaseTableComponent
  ]
})
export class ComponentsModule {
}
