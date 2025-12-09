import {metamodelData} from "./data";
import {Route} from "@angular/router";
import {TablePageComponent} from "@/pages/table-page/table-page.component";
import {isAuthenticated} from "@/services/auth/auth-guard.service";

const COMPONENT_MAP =
  new Map(metamodelData.views.map(obj => [obj.name, TablePageComponent]));

export const ICON_MAP =
  new Map(metamodelData.views.map(obj => [obj.name, obj.icon]));

export const tableRouteData =
  metamodelData.views
    .filter(x => COMPONENT_MAP.get(x.name))
    .map(x => ({
      path: `table/${x.name}`,
      title: x.name,
      id: x.name
    }))

export const tableRoutes: Route[] =
  tableRouteData.map(x => ({
    path: x.path,
    title: x.title,
    component: COMPONENT_MAP.get(x.id),
    data: {
      id: x.id
    },
    canActivate: [isAuthenticated]
  }))
