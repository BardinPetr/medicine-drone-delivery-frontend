import {metamodelData} from "./entities";
import {Route} from "@angular/router";
import {TablePageComponent} from "../../pages/table-page/table-page.component";
import {ComponentType} from "@angular/cdk/overlay";

const COMPONENT_MAP: { [key: string]: ComponentType<any> } = {
  "Person": TablePageComponent,
  "Product": TablePageComponent,
  "Location": TablePageComponent,
  "Organization": TablePageComponent,
  "Address": TablePageComponent
}

export const tableRouteData =
  Object.values(metamodelData.views)
    .map(x => ({
      path: `table/${x.name}`,
      title: x.name,
      id: x.name
    }))

export const tableRoutes: Route[] =
  tableRouteData.map(x => ({
    path: x.path,
    title: x.title,
    component: COMPONENT_MAP[x.id],
    data: {
      id: x.id
    }
  }))
