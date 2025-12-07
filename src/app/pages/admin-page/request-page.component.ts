import {Component, OnDestroy} from '@angular/core';
import {
  DroneControllerService,
  DroneDto,
  ProductTypeControllerService,
  RequestControllerService,
  RequestEntryDto
} from "medicine-drone-delivery-fe-lib";
import {MessageService} from "primeng/api";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-request-page',
  templateUrl: './request-page.component.html',
  styleUrl: './request-page.component.sass'
})
export class RequestPageComponent implements OnDestroy {
  availableProducts: RequestEntryDto[] = [];
  selectedProducts: RequestEntryDto[] = [];

  drones: DroneDto[] = [];
  selectedDrone?: DroneDto;

  constructor(
    private message: MessageService,
    private requestService: RequestControllerService,
    private droneService: DroneControllerService,
    public authService: AuthService,
    productTypeService: ProductTypeControllerService
  ) {

    this.loadDrones()
    productTypeService
      .listAll()
      .subscribe(p =>
        this.availableProducts = p.map(x => ({
          productTypeType: x.type,
          quantity: 0,
          fulfilledQuantity: 0
        }))
      )
  }

  loadDrones() {
    this.droneService
      .listAll()
      .subscribe(x =>
        this.drones = x.filter(i => i.status == 'READY'))
  }

  ngOnDestroy(): void {
  }

  sendOrder() {
    if (this.selectedProducts.filter(x => !x.quantity || x.quantity < 1).length) {
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

  sendDrone() {
    this.droneService.sendDrone(this.selectedDrone!!.id!!).subscribe({
      next: (x) => {
        this.message.add({
          severity: 'success',
          summary: 'OK',
        })
        this.loadDrones()
      }
    })
  }
}
