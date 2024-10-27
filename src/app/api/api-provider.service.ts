import {Injectable, Injector, Type} from '@angular/core';
import {
  AddressControllerService,
  LocationControllerService,
  OrganizationControllerService,
  PersonControllerService,
  ProductControllerService
} from "../../lib";

@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {

  private services: { [key: string]: Type<any> } = {
    Person: PersonControllerService,
    Product: ProductControllerService,
    Location: LocationControllerService,
    Address: AddressControllerService,
    Organization: OrganizationControllerService,
  }

  constructor(
    private injector: Injector
  ) {
  }

  getAPI(id: string): any {
    return this.injector.get(this.services[id])
  }
}
