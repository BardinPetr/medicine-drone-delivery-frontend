export * from './addressController.service';
import {AddressControllerService} from './addressController.service';
import {LocationControllerService} from './locationController.service';
import {OrganizationControllerService} from './organizationController.service';
import {PersonControllerService} from './personController.service';
import {ProductControllerService} from './productController.service';

export * from './addressController.serviceInterface';
export * from './locationController.service';

export * from './locationController.serviceInterface';
export * from './organizationController.service';

export * from './organizationController.serviceInterface';
export * from './personController.service';

export * from './personController.serviceInterface';
export * from './productController.service';

export * from './productController.serviceInterface';
export const APIS = [AddressControllerService, LocationControllerService, OrganizationControllerService, PersonControllerService, ProductControllerService];
