import {Component} from "@angular/core";
import {MenuItem} from "primeng/api";
import {ICON_MAP, tableRouteData} from "../../services/meta/metamodel.routes";
import {map} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";


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
            label: "New Request",
            icon: "pi pi-fw pi-send",
            routerLink: "/new",
            disabled: roles.length == 0 // TODO
          },
          ...tableRouteData
            .map(x => ({
              label: x.title,
              icon: `pi ${ICON_MAP.get(x.id)}`,
              routerLink: x.path,
              disabled: roles.length == 0
            })),
        ]
      )))
      .subscribe(x => {
        this.menuItems = x
      })
  }
}
