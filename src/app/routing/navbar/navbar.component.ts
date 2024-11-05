import {Component} from "@angular/core";
import {MenuItem} from "primeng/api";
import {tableRouteData} from "../../services/meta/metamodel.routes";
import {map} from "rxjs";
import {RegisterDto} from "../../../lib";
import {AuthService} from "../../services/auth/auth.service";

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
  menuItems: MenuItem[] = []

  constructor(private authService: AuthService) {
    this.authService
      .roles
      .pipe(map(roles => ([
          {
            label: "Home",
            icon: "pi pi-fw pi-home",
            routerLink: "/",
          },
          {
            label: "Map",
            icon: "pi pi-fw pi-map",
            routerLink: "/map",
            disabled: roles.length == 0
          },
          {
            label: "Admin",
            icon: "pi pi-fw pi-exclamation-triangle",
            routerLink: "/admin",
            disabled: !roles.includes(RegisterDto.RoleEnum.Admin)
          },
          ...tableRouteData
            .map(x => ({
              label: x.title,
              icon: `pi ${ICON_MAP[x.id]}`,
              routerLink: x.path,
              disabled: roles.length == 0
            })),
          {
            label: "Product Ops",
            icon: "pi pi-fw pi-code",
            routerLink: "/product-ops",
            disabled: roles.length == 0
          },
        ]
      )))
      .subscribe(x => {
        this.menuItems = x
      })
  }
}
