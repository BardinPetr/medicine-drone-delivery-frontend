import {Injectable, Injector, Type} from '@angular/core';
import {
  DroneControllerService,
  FlightTaskControllerService,
  MedicalFacilityControllerService,
  NoFlightZoneControllerService,
  ProductTypeControllerService,
  RequestControllerService,
  RequestEntryControllerService,
  RouteControllerService,
  TypeOfDroneControllerService,
  UserControllerService,
  WarehouseControllerService,
  WarehouseProductsControllerService
} from 'medicine-drone-delivery-fe-lib';


@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {

  private services: { [key: string]: Type<any> } = {
    Drone: DroneControllerService,
    FlightTask: FlightTaskControllerService,
    MedicalFacility: MedicalFacilityControllerService,
    NoFlightZone: NoFlightZoneControllerService,
    ProductType: ProductTypeControllerService,
    Request: RequestControllerService,
    RequestEntry: RequestEntryControllerService,
    Route: RouteControllerService,
    TypeOfDrone: TypeOfDroneControllerService,
    User: UserControllerService,
    Warehouse: WarehouseControllerService,
    WarehouseProducts: WarehouseProductsControllerService
  }

  constructor(
    private injector: Injector
  ) {
  }

  getAPI(id: string): any {
    return this.injector.get(this.services[id])
  }
}
