export enum EntityFieldMetaType {
  INTEGER, FLOAT, STRING, DATE, ENUM, REL, EMB
}

export interface EntityFieldMeta {
  name: string,
  type: EntityFieldMetaType,
  entityRef: string | null,
  nullable: boolean,
  readonly?: boolean
}

export interface EntityMeta {
  name: string,
  fields: { [key: string]: EntityFieldMeta }
}

export interface EnumMeta {
  name: string,
  values: string[]
}

export interface ViewMeta {
  name: string,
  columns: string[],
  nested: string[],
}

export interface Metamodel {
  entities: { [key: string]: EntityMeta },
  enums: { [key: string]: EnumMeta },
  views: { [key: string]: ViewMeta }
}
