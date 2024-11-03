import {NgModule} from "@angular/core";
import {CommonModule, KeyValuePipe, NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {ChipModule} from "primeng/chip";
import {TagModule} from "primeng/tag";
import {AgGridAngular} from "@ag-grid-community/angular";
import {UserPlateComponent} from "./user-plate/user-plate.component";
import {BaseTableComponent} from './base-table/base-table.component';
import {BaseFormComponent} from "./base-form/base-form.component";
import {DropdownModule} from "primeng/dropdown";
import {ReactiveFormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {CalendarModule} from "primeng/calendar";
import {CardModule} from "primeng/card";
import {ChipsModule} from "primeng/chips";
import {ButtonGroupModule} from "primeng/buttongroup";
import {DialogModule} from "primeng/dialog";

@NgModule({
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    ChipModule,
    TagModule,
    AgGridAngular,
    NgSwitchCase,
    DropdownModule,
    ReactiveFormsModule,
    NgForOf,
    KeyValuePipe,
    NgSwitch,
    InputNumberModule,
    CalendarModule,
    CardModule,
    ChipsModule,
    ButtonGroupModule,
    DialogModule
  ],
  declarations: [
    UserPlateComponent, BaseTableComponent, BaseFormComponent
  ],
  exports: [
    UserPlateComponent, BaseTableComponent, BaseFormComponent
  ]
})
export class ComponentsModule {
}
