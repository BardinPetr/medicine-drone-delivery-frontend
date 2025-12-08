import {DataTypeDefinition} from "@ag-grid-community/core";

export const typeConverters: { [cellDataType: string]: DataTypeDefinition } = {
  isoDateString: {
    baseDataType: "dateString",
    extendsDataType: "dateString",
    valueParser: (params) =>
      params.newValue ? params.newValue : undefined,
    valueFormatter: (params) => {
      const text = params.value
      if (!text) return ""
      const date = new Date(Date.parse(text))
      if (text.includes("T"))
        return date.toLocaleString("ru-RU")
      return date.toLocaleDateString("ru-RU")
    },
  }
}
