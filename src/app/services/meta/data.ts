import {EntityFieldMetaType, Metamodel} from "./metamodel";

export const metamodelData: Metamodel = {
  entities: {
    Address: {
      name: 'Address',
      titleField: 'street',
      fields: {
        id: {name: 'id', readonly: true, type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
        street: {name: 'street', type: EntityFieldMetaType.STRING, entityRef: null, nullable: false},
        town: {name: 'town', type: EntityFieldMetaType.REL, entityRef: 'Location', nullable: false},
        ownerUsername: {name: 'ownerUsername', type: EntityFieldMetaType.STRING, entityRef: null, readonly: true, nullable: false},
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
        ownerUsername: {name: 'ownerUsername', type: EntityFieldMetaType.STRING, entityRef: null, readonly: true, nullable: false},
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
        ownerUsername: {name: 'ownerUsername', type: EntityFieldMetaType.STRING, entityRef: null, readonly: true, nullable: false},
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
        ownerUsername: {name: 'ownerUsername', type: EntityFieldMetaType.STRING, entityRef: null, readonly: true, nullable: false},
      }
    },
    Product: {
      name: 'Product',
      titleField: 'name',
      fields: {
        id: {name: 'id', readonly: true, type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: true},
        name: {name: 'name', type: EntityFieldMetaType.STRING, entityRef: null, nullable: false},
        coordinateX: {name: 'coordinateX', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: false},
        coordinateY: {name: 'coordinateY', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: false},
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
          nullable: true,
        },
        manufacturer: {name: 'manufacturer', type: EntityFieldMetaType.REL, entityRef: 'Organization', nullable: true},
        price: {name: 'price', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: false},
        manufactureCost: {name: 'manufactureCost', type: EntityFieldMetaType.FLOAT, entityRef: null, nullable: false},
        rating: {name: 'rating', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: false},
        partNumber: {name: 'partNumber', type: EntityFieldMetaType.STRING, entityRef: null, nullable: false},
        personOwner: {name: 'personOwner', type: EntityFieldMetaType.REL, entityRef: 'Person', nullable: true},
        ownerUsername: {name: 'ownerUsername', type: EntityFieldMetaType.STRING, entityRef: null, readonly: true, nullable: false},
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
    },
    Audit: {
      name: 'Audit',
      titleField: 'id',
      fields: {
        revision: {name: 'revision', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: false},
        entityId: {name: 'entityId', type: EntityFieldMetaType.INTEGER, entityRef: null, nullable: false},
        author: {name: 'author', type: EntityFieldMetaType.STRING, entityRef: null, nullable: false},
        timestamp: {name: 'timestamp', type: EntityFieldMetaType.DATE, entityRef: null, nullable: false},
        type: {name: 'type', type: EntityFieldMetaType.ENUM, entityRef: 'RevisionType', nullable: false},
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
    RevisionType: {
      name: 'RevisionType',
      values: ['ADD', 'MOD', 'DEL']
    }
  },
  views: {
    Address: {
      name: 'Address',
      columns: ['id', 'street', 'town.name', 'ownerUsername'],
      nested: ['town']
    },
    Organization: {
      name: 'Organization',
      columns: ['id', 'name', 'officialAddress.street', 'postalAddress.street', 'annualTurnover', 'employeesCount', 'fullName', 'type', 'ownerUsername'],
      nested: ['officialAddress', 'postalAddress']
    },
    Location: {
      name: 'Location',
      columns: ['id', 'x', 'y', 'z', 'name', 'ownerUsername'],
      nested: []
    },
    Person: {
      name: 'Person',
      columns: ['id', 'name', 'eyeColor', 'hairColor', 'location.name', 'height', 'nationality', 'ownerUsername'],
      nested: ['location']
    },
    Product: {
      name: 'Product',
      columns: ['id', 'creationDate', 'name', 'coordinateX', 'coordinateY', 'unitOfMeasure', 'manufacturer.name', 'price', 'manufactureCost', 'rating', 'partNumber', 'personOwner.name', 'ownerUsername'],
      nested: ['manufacturer', 'personOwner']
    },
    User: {
      name: 'User',
      columns: ['id', 'username', 'role'],
      nested: []
    },
    Audit: {
      name: 'Audit',
      columns: ['revision', 'timestamp', 'type', 'entityId', 'author'],
      nested: []
    }
  }
}
