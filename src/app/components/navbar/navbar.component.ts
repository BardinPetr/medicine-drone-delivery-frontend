import {Component} from "@angular/core";
import {MenuItem} from "primeng/api";

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
    },
  ];
}
