export * from './addressController.service';
import {AddressControllerService} from './addressController.service';
import {LocationControllerService} from './locationController.service';
import {LoginControllerService} from './loginController.service';
import {OrganizationControllerService} from './organizationController.service';
import {PersonControllerService} from './personController.service';
import {ProductControllerService} from './productController.service';
import {UserControllerService} from './userController.service';

export * from './addressController.serviceInterface';
export * from './locationController.service';

export * from './locationController.serviceInterface';
export * from './loginController.service';

export * from './loginController.serviceInterface';
export * from './organizationController.service';

export * from './organizationController.serviceInterface';
export * from './personController.service';

export * from './personController.serviceInterface';
export * from './productController.service';

export * from './productController.serviceInterface';
export * from './userController.service';

export * from './userController.serviceInterface';
export const APIS = [AddressControllerService, LocationControllerService, LoginControllerService, OrganizationControllerService, PersonControllerService, ProductControllerService, UserControllerService];
