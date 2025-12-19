import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {UserControllerService} from "medicine-drone-delivery-fe-lib";
import {NotificationWsService} from "@/services/notifications/notification.ws.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService,
              private userApi: UserControllerService) {
  }

  ngOnInit(): void {
    this.userApi
      .get()
      .subscribe({
        next: x => this.authService.update(x)
      })
  }
}
