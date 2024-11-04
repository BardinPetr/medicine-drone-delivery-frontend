import {Component, ViewChild} from '@angular/core';
import {ColDef} from "@ag-grid-community/core";
import {MetamodelService} from "../../services/meta/metamodel.service";
import {Person, PersonControllerService, Product, ProductControllerService} from "../../../lib";
import {BaseTableComponent} from "../../components/base-table/base-table.component";
import {MessageService} from "primeng/api";
import {of} from "rxjs";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.sass'
})
export class ProductPageComponent {
  @ViewChild('table') table?: BaseTableComponent = undefined;

  partNumber: string = '';
  percentage: number = 0;

  unitOfMeasures: string[] = []
  selectedUnitOfMeasures: string[] = [];

  persons: Person[] = [];
  selectedPerson?: Person;

  tableState: any[] = [];
  columnDefs: ColDef[] = [];


  constructor(
    private api: ProductControllerService,
    private message: MessageService,
    personApi: PersonControllerService,
    meta: MetamodelService,
  ) {
    this.columnDefs = meta.getTableColumns('Product')
    this.unitOfMeasures = meta.getEnumValues('UnitOfMeasure')
    personApi
      .list({})
      .subscribe(data => this.persons = data.content!)
  }

  fetchWrapper = (page: any, filter: any) => {
    return of({content: this.tableState})
  }

  maxCost() {
    this.api
      .findProductWithMaxManufactureCost()
      .subscribe(data => {
        this.tableState = [data]
        this.table!.refresh()
      })
  }

  lessPerson() {
    this.api
      .countProductsLessThanOwner(this.selectedPerson?.id!)
      .subscribe(data => {
        this.message.add({
          severity: 'success',
          summary: `Count is ${data}`
        })
      })
  }

  greaterPn() {
    this.api
      .findProductsWithPartNumberGreaterThan(this.partNumber)
      .subscribe(data => {
        this.tableState = data
        this.table!.refresh()
      })
  }

  inUnit() {
    this.api
      // @ts-ignore
      .getProductsByUnitOfMeasure(this.selectedUnitOfMeasures)
      .subscribe(data => {
        this.tableState = data
        this.table!.refresh()
      })
  }

  decrease() {
    this.api
      .decreaseProductPricesBy(this.percentage)
      .subscribe(data => {
        this.message.add({
          severity: 'success',
          summary: 'Succeeded'
        })
      })
  }
}
