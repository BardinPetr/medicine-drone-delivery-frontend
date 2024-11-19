export enum EntityFieldMetaType {
  INTEGER, FLOAT, STRING, DATE, ENUM, REL, COL
}

export interface EntityFieldMeta {
  name: string,
  type: EntityFieldMetaType,
  entityRef: string | null,
  nullable: boolean,
  readonly?: boolean,
  hidden?: boolean
}

export interface EntityMeta {
  name: string,
  titleField?: string,
  fields: EntityFieldMeta[]
}

export interface EnumMeta {
  name: string,
  values: string[]
}

export interface ViewMeta {
  name: string,
  columns: string[],
  nested: string[],
  icon: string,
  update?: boolean,
  delete?: boolean,
  insert?: boolean,
}

export interface Metamodel {
  entities: EntityMeta[],
  enums: EnumMeta[],
  views: ViewMeta[]
}
