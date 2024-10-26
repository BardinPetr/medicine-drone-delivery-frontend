import {FilterModel} from "@ag-grid-community/core";


const toBase64 = (bytes: Uint8Array): string =>
  btoa(
    Array
      .from(bytes, (byte) => String.fromCodePoint(byte))
      .join("")
  );

const jsonToBase64 = (data: any): string =>
  toBase64(new TextEncoder().encode(JSON.stringify(data)))

export function encodeFilter(filterModel: FilterModel): string {
  const FILTER_TYPE_MAP: { [key: string]: string } = {
    "equals": "EQ",
    "contains": "SCT"
  }

  const items =
    Object
      .entries(filterModel)
      .map(x => ({
        field: x[0],
        operator: FILTER_TYPE_MAP[x[1].type],
        value: x[1].filter,
        type: x[1].filterType
      }))
  return jsonToBase64(items)
}
