import {Component} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-plate',
  templateUrl: './user-plate.component.html',
  styleUrls: ['user-plate.component.sass']
})
export class UserPlateComponent {
  constructor(public authService: AuthService, public router: Router) {
  }
}
