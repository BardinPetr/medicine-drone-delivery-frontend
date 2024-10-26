import {Component} from "@angular/core";
import {MenuItem} from "primeng/api";
import {tableRouteData} from "../../services/meta/metaroutes";

const ICON_MAP: { [key: string]: string } = {
  "Person": "pi-user",
  "Product": "pi-shopping-bag",
  "Organization": "pi-building",
  "Location": "pi-map-marker",
  "Address": "pi-map"
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  menuItems: MenuItem[] = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      routerLink: "/"
    }
  ]

  constructor() {
    let tablePages =
      tableRouteData
        .map(x => ({
          label: x.title,
          icon: `pi ${ICON_MAP[x.id]}`,
          routerLink: x.path
        }))
    this.menuItems.push(...tablePages)
  }
}
