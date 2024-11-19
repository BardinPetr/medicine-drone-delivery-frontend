import {EntityFieldMetaType, Metamodel} from "./metamodel";

export const metamodelData: Metamodel = {
  entities: [
    {
      name: 'Drone',
      titleField: 'typeOfDroneName',
      fields: [
        {name: 'typeOfDroneName', type: EntityFieldMetaType.STRING, entityRef: null, nullable: true},
        {name: 'status', type: EntityFieldMetaType.ENUM, entityRef: 'DroneStatus', nullable: true},
        {name: 'locationLat', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: true},
        {name: 'locationLon', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: true},
        {name: 'flightTaskId', type: EntityFieldMetaType.INTEGER, entityRef: 'FlightTask', nullable: true},
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
      ]
    },
    {
      name: 'Request',
      titleField: 'userUsername',
      fields: [
        {name: 'userUsername', type: EntityFieldMetaType.STRING, entityRef: null, nullable: true},
        {name: 'status', type: EntityFieldMetaType.ENUM, entityRef: 'TaskStatus', nullable: true},
        {name: 'medicalFacilityName', type: EntityFieldMetaType.STRING, entityRef: null, nullable: true},
        {name: 'requestEntries', type: EntityFieldMetaType.COL, entityRef: 'RequestEntry', nullable: false},
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
      ]
    },
    {
      name: 'Route',
      titleField: 'warehouseId',
      fields: [
        {name: 'warehouseId', type: EntityFieldMetaType.INTEGER, entityRef: 'Warehouse', nullable: true},
        {name: 'medicalFacilityId', type: EntityFieldMetaType.INTEGER, entityRef: 'MedicalFacility', nullable: true},
        {name: 'routePoints', type: EntityFieldMetaType.COL, entityRef: 'RoutePoint', nullable: false},
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
      ]
    },
    {
      name: 'MedicalFacility',
      titleField: 'name',
      fields: [
        {name: 'name', type: EntityFieldMetaType.STRING, entityRef: null, nullable: true},
        {name: 'responsibleUserUsername', type: EntityFieldMetaType.STRING, entityRef: null, nullable: true},
        {name: 'locationLat', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: true},
        {name: 'locationLon', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: true},
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
      ]
    },
    {
      name: 'RoutePoint',
      titleField: 'idRouteId',
      fields: [
        {name: 'idRouteId', type: EntityFieldMetaType.INTEGER, entityRef: 'Route', nullable: false},
        {name: 'idPointNumber', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: false},
        {name: 'locationLat', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: true},
        {name: 'locationLon', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: true},
      ]
    },
    {
      name: 'Warehouse',
      titleField: 'name',
      fields: [
        {name: 'name', type: EntityFieldMetaType.STRING, entityRef: null, nullable: true},
        {name: 'locationLat', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: true},
        {name: 'locationLon', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: true},
        {name: 'products', type: EntityFieldMetaType.COL, entityRef: 'WarehouseProducts', nullable: false},
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
      ]
    },
    {
      name: 'ProductType',
      titleField: 'type',
      fields: [
        {name: 'type', type: EntityFieldMetaType.STRING, entityRef: null, nullable: true},
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
      ]
    },
    {
      name: 'FlightTask',
      titleField: 'requestId',
      fields: [
        {name: 'requestId', type: EntityFieldMetaType.INTEGER, entityRef: 'Request', nullable: true},
        {name: 'status', type: EntityFieldMetaType.ENUM, entityRef: 'TaskStatus', nullable: true},
        {name: 'productTypeProductTypeName', type: EntityFieldMetaType.STRING, entityRef: null, nullable: true},
        {name: 'warehouseWarehouseName', type: EntityFieldMetaType.STRING, entityRef: null, nullable: true},
        {name: 'medicalFacilityMedicalFacilityName', type: EntityFieldMetaType.STRING, entityRef: null, nullable: true},
        {name: 'quantity', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
        {name: 'routeId', type: EntityFieldMetaType.INTEGER, entityRef: 'Route', nullable: true},
        {name: 'timestamp', type: EntityFieldMetaType.DATE, entityRef: null, nullable: true},
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
      ]
    },
    {
      name: 'TypeOfDrone',
      titleField: 'name',
      fields: [
        {name: 'name', type: EntityFieldMetaType.STRING, entityRef: null, nullable: true},
        {name: 'maxWeight', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
        {name: 'speed', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: true},
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
      ]
    },
    {
      name: 'NoFlightZone',
      titleField: 'radius',
      fields: [
        {name: 'radius', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: true},
        {name: 'centerLat', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: true},
        {name: 'centerLon', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: true},
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
      ]
    },
    {
      name: 'RequestEntry',
      titleField: 'requestId',
      fields: [
        {name: 'requestId', type: EntityFieldMetaType.INTEGER, entityRef: 'Request', nullable: true},
        {name: 'productTypeType', type: EntityFieldMetaType.STRING, entityRef: null, nullable: true},
        {name: 'quantity', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
        {name: 'fulfilledQuantity', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: false},
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
      ]
    },
    {
      name: 'WarehouseProducts',
      titleField: 'idProductId',
      fields: [
        {name: 'idProductId', type: EntityFieldMetaType.INTEGER, entityRef: 'ProductType', nullable: false},
        {name: 'idWarehouseId', type: EntityFieldMetaType.INTEGER, entityRef: 'Warehouse', nullable: false},
        {name: 'quantity', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
      ]
    },
  ],
  enums: [
    {
      name: 'DroneStatus',
      values: ['IDLE', 'READY', 'FLYING_TO', 'FLYING_FROM']
    },
    {
      name: 'TaskStatus',
      values: ['QUEUED', 'READY', 'PACKING', 'IN_PROGRESS', 'COMPLETED']
    },
    {
      name: 'UserRole',
      values: ['ADMIN', 'WAREHOUSE', 'MEDIC', 'USER']
    }
  ],
  views: [
    {
      name: 'Drone',
      columns: ['typeOfDroneName', 'status', 'locationLat', 'locationLon', 'flightTaskId'],
      nested: [],
      icon: 'pi pi-drone',
      update: true,
      delete: true,
      insert: true,
    },
    {
      name: 'Request',
      columns: ['userUsername', 'status', 'medicalFacilityName'],
      nested: ['requestEntries'],
      icon: 'pi pi-file',
      update: true,
      delete: true,
      insert: true,
    },
    {
      name: 'Route',
      columns: ['warehouseId', 'medicalFacilityId'],
      nested: ['routePoints'],
      icon: 'pi pi-map',
      update: true,
      delete: true,
      insert: true,
    },
    {
      name: 'MedicalFacility',
      columns: ['name', 'responsibleUserUsername', 'locationLat', 'locationLon'],
      nested: [],
      icon: 'pi pi-building',
      update: true,
      delete: true,
      insert: true,
    },
    {
      name: 'Warehouse',
      columns: ['name', 'locationLat', 'locationLon'],
      nested: ['products'],
      icon: 'pi pi-home',
      update: true,
      delete: true,
      insert: true,
    },
    {
      name: 'ProductType',
      columns: ['type'],
      nested: [],
      icon: 'pi pi-tag',
      update: true,
      delete: true,
      insert: true,
    },
    {
      name: 'FlightTask',
      columns: ['requestId', 'status', 'productTypeProductTypeName', 'warehouseWarehouseName', 'medicalFacilityMedicalFacilityName'],
      nested: [],
      icon: 'pi pi-plane',
      update: true,
      delete: true,
      insert: true,
    },
    {
      name: 'TypeOfDrone',
      columns: ['name', 'maxWeight', 'speed'],
      nested: [],
      icon: 'pi pi-drone',
      update: true,
      delete: true,
      insert: true,
    },
    {
      name: 'NoFlightZone',
      columns: ['radius', 'centerLat', 'centerLon'],
      nested: [],
      icon: 'pi pi-ban',
      update: true,
      delete: true,
      insert: true,
    },
    {
      name: 'WarehouseProducts',
      columns: ['idProductId', 'idWarehouseId', 'quantity'],
      nested: [],
      icon: 'pi pi-box',
      update: true,
      delete: true,
      insert: true,
    },
  ]
}
