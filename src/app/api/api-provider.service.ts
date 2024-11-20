import {Injectable, Injector, Type} from '@angular/core';
// import {RoutePointControllerService} from "../../lib"
// import {WarehouseProductsControllerService} from "../../lib"
import {
  DroneControllerService,
  FlightTaskControllerService,
  MedicalFacilityControllerService,
  NoFlightZoneControllerService,
  ProductTypeControllerService,
  RequestControllerService,
  RequestEntryControllerService,
  RouteControllerService,
  TypeOfDroneControllerService, UserControllerService,
  WarehouseControllerService, WarehouseProductsControllerService
} from "../../lib"

@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {

  private services: { [key: string]: Type<any> } = {
    TypeOfDrone: TypeOfDroneControllerService,
    NoFlightZone: NoFlightZoneControllerService,
    Request: RequestControllerService,
    Drone: DroneControllerService,
    MedicalFacility: MedicalFacilityControllerService,
    RequestEntry: RequestEntryControllerService,
    Warehouse: WarehouseControllerService,
    FlightTask: FlightTaskControllerService,
    Route: RouteControllerService,
    ProductType: ProductTypeControllerService,
    User: UserControllerService,
    WarehouseProducts: WarehouseProductsControllerService,
    // RoutePoint: RoutePointControllerService,
  }

  constructor(
    private injector: Injector
  ) {
  }

  getAPI(id: string): any {
    return this.injector.get(this.services[id])
  }
}
