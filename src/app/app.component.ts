import {Component, OnInit} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(public oidcService: OidcSecurityService) {
  }

  ngOnInit(): void {
    this.oidcService.checkAuth().subscribe()
  }
}
