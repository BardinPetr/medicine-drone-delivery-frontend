import {EntityFieldMetaType, Metamodel} from "./metamodel";

export const metamodelData: Metamodel = {
  entities: [
    {
      name: 'User',
      titleField: 'username',
      fields: [
        {name: 'id', readonly: true, type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
        {name: 'username', type: EntityFieldMetaType.STRING, entityRef: null, nullable: false},
        {name: 'role', type: EntityFieldMetaType.ENUM, entityRef: 'UserRole', nullable: false, hidden: true},
      ]
    },
    {
      name: 'Drone',
      titleField: 'typeOfDroneName',
      fields: [
        {name: 'typeOfDrone', type: EntityFieldMetaType.REL, entityRef: 'TypeOfDrone', nullable: false, readonly: false},
        {name: 'status', type: EntityFieldMetaType.ENUM, entityRef: 'DroneStatus', nullable: true, readonly: true},
        {name: 'locationLat', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: true, readonly: true},
        {name: 'locationLon', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: true, readonly: true},
        {name: 'flightTask', type: EntityFieldMetaType.REL, entityRef: 'FlightTask', nullable: true, readonly: true},
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true, readonly: true},
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
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true, readonly: true},
      ]
    },
    {
      name: 'Route',
      titleField: 'warehouseId',
      fields: [
        {name: 'warehouseId', type: EntityFieldMetaType.INTEGER, entityRef: 'Warehouse', nullable: true},
        {name: 'medicalFacilityId', type: EntityFieldMetaType.INTEGER, entityRef: 'MedicalFacility', nullable: true},
        {name: 'routePoints', type: EntityFieldMetaType.COL, entityRef: 'RoutePoint', nullable: false},
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true, readonly: true},
      ]
    },
    {
      name: 'MedicalFacility',
      titleField: 'name',
      fields: [
        {name: 'name', type: EntityFieldMetaType.STRING, entityRef: null, nullable: false},
        {name: 'responsibleUser', type: EntityFieldMetaType.REL, entityRef: 'User', nullable: false},
        {name: 'locationLat', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: false},
        {name: 'locationLon', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: false},
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true, readonly: true},
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
        {name: 'name', type: EntityFieldMetaType.STRING, entityRef: null, nullable: false},
        {name: 'locationLat', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: false},
        {name: 'locationLon', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: false},
        {name: 'products', type: EntityFieldMetaType.COL, entityRef: 'WarehouseProducts', nullable: true, hidden: true, readonly: true},
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true, readonly: true},
      ]
    },
    {
      name: 'ProductType',
      titleField: 'type',
      fields: [
        {name: 'type', type: EntityFieldMetaType.STRING, entityRef: null, nullable: true},
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true, readonly: true},
      ]
    },
    {
      name: 'FlightTask',
      titleField: 'id',
      fields: [
        {name: 'request', type: EntityFieldMetaType.REL, entityRef: 'Request', nullable: true},
        {name: 'status', type: EntityFieldMetaType.ENUM, entityRef: 'TaskStatus', nullable: true},
        {name: 'productType', type: EntityFieldMetaType.REL, entityRef: 'ProductType', nullable: true},
        {name: 'warehouse', type: EntityFieldMetaType.REL, entityRef: 'Warehouse', nullable: true},
        {name: 'medicalFacility', type: EntityFieldMetaType.REL, entityRef: 'MedicalFacility', nullable: true},
        {name: 'quantity', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
        {name: 'route', type: EntityFieldMetaType.REL, entityRef: 'Route', nullable: true},
        {name: 'timestamp', type: EntityFieldMetaType.DATE, entityRef: null, nullable: true},
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true, readonly: true},
      ]
    },
    {
      name: 'TypeOfDrone',
      titleField: 'name',
      fields: [
        {name: 'name', type: EntityFieldMetaType.STRING, entityRef: null, nullable: false},
        {name: 'maxWeight', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: false},
        {name: 'speed', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: false},
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true, readonly: true},
      ]
    },
    {
      name: 'NoFlightZone',
      titleField: 'radius',
      fields: [
        {name: 'radius', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: false},
        {name: 'centerLat', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: false},
        {name: 'centerLon', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: false},
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true, readonly: true},
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
        {name: 'id', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true, readonly: true},
      ]
    },
    {
      name: 'WarehouseProducts',
      titleField: 'product.name',
      fields: [
        {name: 'warehouse', type: EntityFieldMetaType.REL, entityRef: 'Warehouse', nullable: false, readonly: true},
        {name: 'product', type: EntityFieldMetaType.REL, entityRef: 'ProductType', nullable: false, readonly: true},
        {name: 'quantity', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: false},
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
      name: 'Request',
      columns: ['id', 'userUsername', 'status', 'medicalFacilityName'],
      nested: ['requestEntries'],
      icon: 'pi pi-file',
      update: false,
      delete: false,
      insert: false,
    },
    {
      name: 'Drone',
      columns: ['id', 'typeOfDrone.name', 'status', 'flightTask.id', 'locationLat', 'locationLon'],
      nested: [],
      icon: 'pi pi-send',
      update: false,
      delete: true,
      insert: true,
    },
    {
      name: 'FlightTask',
      columns: ['request.id', 'status', 'productType.type', 'warehouse.name', 'medicalFacility.name'],
      nested: [],
      icon: 'pi pi-book',
      update: false,
      delete: false,
      insert: false,
    },
    // {
    //   name: 'NoFlightZone',
    //   columns: ['id', 'radius', 'centerLat', 'centerLon'],
    //   nested: [],
    //   icon: 'pi pi-ban',
    //   update: true,
    //   delete: true,
    //   insert: true,
    // },
    {
      name: 'TypeOfDrone',
      columns: ['id', 'name', 'maxWeight', 'speed'],
      nested: [],
      icon: 'pi pi-sliders-h',
      update: true,
      delete: false,
      insert: true,
    },
    {
      name: 'Warehouse',
      columns: ['id', 'name', 'locationLat', 'locationLon'],
      nested: ['products'],
      icon: 'pi pi-home',
      update: false,
      delete: false,
      insert: true,
    },
    {
      name: 'MedicalFacility',
      columns: ['id', 'name', 'responsibleUser.username', 'locationLat', 'locationLon'],
      nested: [],
      icon: 'pi pi-building',
      update: false,
      delete: false,
      insert: true,
    },
    {
      name: 'ProductType',
      columns: ['id', 'type'],
      nested: [],
      icon: 'pi pi-tag',
      update: true,
      delete: false,
      insert: true,
    },
    {
      name: 'WarehouseProducts',
      columns: ['warehouse.name', 'product.type', 'quantity'],
      nested: [],
      icon: 'pi pi-box',
      update: true,
      delete: false,
      insert: true,
    },
  ]
}
