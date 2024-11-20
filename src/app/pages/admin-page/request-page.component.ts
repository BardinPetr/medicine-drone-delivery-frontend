import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ColDef} from "@ag-grid-community/core";
import {MetamodelService} from "../../services/meta/metamodel.service";
import {
  ProductTypeControllerService, RequestControllerService,
  RequestEntryDto,
  User,
  UserControllerService,
  WarehouseProductsDto
} from "../../../lib";
import {ActionDef, BaseTableComponent} from "../../components/base-table/base-table.component";
import {Product} from "../../../lib/model/product";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-request-page',
  templateUrl: './request-page.component.html',
  styleUrl: './request-page.component.sass'
})
export class RequestPageComponent implements OnDestroy {
  availableProducts: RequestEntryDto[] = [];
  selectedProducts: RequestEntryDto[] = [];

  constructor(
    private message: MessageService,
    private requestService: RequestControllerService,
    productTypeService: ProductTypeControllerService
    ) {

    productTypeService
      .listAll()
      .subscribe(x =>
        this.availableProducts = x.map(x => ({
          productTypeType: x.type,
          quantity: 0,
          fulfilledQuantity: 0
        }))
      )
  }

  ngOnDestroy(): void {
  }

  sendOrder() {
    if(this.selectedProducts.filter(x => !x.quantity || x.quantity < 1).length){
      this.message.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid quantity'
      })
      return
    }
    console.warn(this.selectedProducts)
    this.requestService.create({
      requestEntries: this.selectedProducts
    }).subscribe({
      next: (x) => {
        this.message.add({
          severity: 'success',
          summary: 'OK',
        })
      }
    })
  }
}
