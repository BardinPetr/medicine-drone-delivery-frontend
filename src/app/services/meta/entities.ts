import {EntityFieldMetaType, Metamodel} from "./model";

export const metamodelData: Metamodel = {
  entities: {
    Address: {
      name: 'Address',
      titleField: 'street',
      fields: {
        id: {name: 'id', readonly: true, type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
        street: {name: 'street', type: EntityFieldMetaType.STRING, entityRef: null, nullable: false},
        town: {name: 'town', type: EntityFieldMetaType.REL, entityRef: 'Location', nullable: false},
      }
    },
    Organization: {
      name: 'Organization',
      titleField: 'name',
      fields: {
        id: {name: 'id', readonly: true, type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
        name: {name: 'name', type: EntityFieldMetaType.STRING, entityRef: null, nullable: false},
        officialAddress: {name: 'officialAddress', type: EntityFieldMetaType.REL, entityRef: 'Address', nullable: true},
        annualTurnover: {name: 'annualTurnover', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: true},
        employeesCount: {name: 'employeesCount', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: false},
        fullName: {name: 'fullName', type: EntityFieldMetaType.STRING, entityRef: null, nullable: false},
        type: {name: 'type', type: EntityFieldMetaType.ENUM, entityRef: 'OrganizationType', nullable: true},
        postalAddress: {name: 'postalAddress', type: EntityFieldMetaType.REL, entityRef: 'Address', nullable: true},
      }
    },
    Location: {
      name: 'Location',
      titleField: 'name',
      fields: {
        id: {name: 'id', readonly: true, type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
        x: {name: 'x', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: false},
        y: {name: 'y', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: false},
        z: {name: 'z', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: false},
        name: {name: 'name', type: EntityFieldMetaType.STRING, entityRef: null, nullable: false},
      }
    },
    Person: {
      name: 'Person',
      titleField: 'name',
      fields: {
        id: {name: 'id', readonly: true, type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
        name: {name: 'name', type: EntityFieldMetaType.STRING, entityRef: null, nullable: false},
        eyeColor: {name: 'eyeColor', type: EntityFieldMetaType.ENUM, entityRef: 'Color', nullable: false},
        hairColor: {name: 'hairColor', type: EntityFieldMetaType.ENUM, entityRef: 'Color', nullable: true},
        location: {name: 'location', type: EntityFieldMetaType.REL, entityRef: 'Location', nullable: true},
        height: {name: 'height', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: false},
        nationality: {name: 'nationality', type: EntityFieldMetaType.ENUM, entityRef: 'Country', nullable: true},
      }
    },
    Product: {
      name: 'Product',
      titleField: 'name',
      fields: {
        id: {name: 'id', readonly: true, type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
        name: {name: 'name', type: EntityFieldMetaType.STRING, entityRef: null, nullable: false},
        coordinates: {name: 'coordinates', type: EntityFieldMetaType.EMB, entityRef: 'Coordinates', nullable: false},
        creationDate: {
          name: 'creationDate',
          type: EntityFieldMetaType.DATE,
          entityRef: null,
          nullable: false,
          readonly: true
        },
        unitOfMeasure: {
          name: 'unitOfMeasure',
          type: EntityFieldMetaType.ENUM,
          entityRef: 'UnitOfMeasure',
          nullable: true
        },
        manufacturer: {name: 'manufacturer', type: EntityFieldMetaType.REL, entityRef: 'Organization', nullable: true},
        price: {name: 'price', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: false},
        manufactureCost: {name: 'manufactureCost', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: false},
        rating: {name: 'rating', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: false},
        partNumber: {name: 'partNumber', type: EntityFieldMetaType.STRING, entityRef: null, nullable: false},
        owner: {name: 'owner', type: EntityFieldMetaType.REL, entityRef: 'Person', nullable: true},
      }
    },
    Coordinates: {
      name: 'Coordinates',
      fields: {
        x: {name: 'x', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: false},
        y: {name: 'y', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: false},
      }
    },
    User: {
      name: 'User',
      titleField: 'username',
      fields: {
        id: {name: 'id', readonly: true, type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
        username: {name: 'username', type: EntityFieldMetaType.STRING, entityRef: null, nullable: false},
        role: {name: 'role', type: EntityFieldMetaType.ENUM, entityRef: 'UserRole', nullable: false},
      }
    }
  },
  enums: {
    OrganizationType: {
      name: 'OrganizationType',
      values: ['COMMERCIAL', 'PUBLIC', 'GOVERNMENT', 'TRUST', 'PRIVATE_LIMITED_COMPANY']
    },
    Color: {
      name: 'Color',
      values: ['GREEN', 'BLUE', 'YELLOW']
    },
    Country: {
      name: 'Country',
      values: ['RUSSIA', 'SPAIN', 'VATICAN', 'NORTH_KOREA', 'JAPAN']
    },
    UnitOfMeasure: {
      name: 'UnitOfMeasure',
      values: ['METERS', 'CENTIMETERS', 'MILLILITERS']
    },
    UserRole: {
      name: 'UserRole',
      values: ['ADMIN', 'ADMIN_PENDING', 'USER']
    },
  },
  views: {
    Address: {
      name: 'Address',
      columns: ['id', 'street', 'town.name'],
      nested: ['town']
    },
    Organization: {
      name: 'Organization',
      columns: ['id', 'name', 'officialAddress.street', 'postalAddress.street', 'annualTurnover', 'employeesCount', 'fullName', 'type'],
      nested: ['officialAddress', 'postalAddress']
    },
    Location: {
      name: 'Location',
      columns: ['id', 'x', 'y', 'z', 'name'],
      nested: []
    },
    Person: {
      name: 'Person',
      columns: ['id', 'name', 'eyeColor', 'hairColor', 'location.name', 'height', 'nationality'],
      nested: ['location']
    },
    Product: {
      name: 'Product',
      columns: ['id', 'name', 'coordinates.x', 'coordinates.y', 'creationDate', 'unitOfMeasure', 'manufacturer.name', 'price', 'manufactureCost', 'rating', 'partNumber', 'owner.name'],
      nested: ['manufacturer', 'owner']
    },
    User: {
      name: 'User',
      columns: ['id', 'username', 'role'],
      nested: []
    }
  }
}
