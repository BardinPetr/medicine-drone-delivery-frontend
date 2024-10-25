import {Injectable} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {map, Observable} from 'rxjs';
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authService: OidcSecurityService) {
  }

  public get authenticated() {
    return this.authService.isAuthenticated()
  }

  public get roles(): Observable<string[]> {
    return this
      .authService
      .getPayloadFromAccessToken()
      .pipe(map(i => i?.['realm_access']?.['roles'] ?? []))
  }

  public get username() {
    return this
      .authService
      .getUserData()
      .pipe(map(x => x?.["preferred_username"]))
  }

  public isInRole(role: string) {
    return this
      .roles
      .pipe(take(1), map(i => i.includes(role)))
  }

  public logout() {
    this.authService
      .logoff()
      .subscribe()
  }

  public login() {
    this.authService
      .authorize()
  }
}
