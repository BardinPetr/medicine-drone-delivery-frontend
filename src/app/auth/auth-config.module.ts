import {NgModule} from '@angular/core';
import {AbstractSecurityStorage, AuthInterceptor, AuthModule} from 'angular-auth-oidc-client';
import {environment} from '../../environments/environment'
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthStorageService} from "./auth-storage.service";

const customRequestParams = {
  client_secret: environment.idcClientSecret
}

const keycloakCustomParams = {
  customParamsAuthRequest: customRequestParams,
  customParamsCodeRequest: customRequestParams,
  customParamsRefreshTokenRequest: customRequestParams,
  customParamsEndSessionRequest: {
    client_id: environment.idcClientId,
    ...customRequestParams
  }
}

const baseUrl = window.location.origin

@NgModule({
  imports: [AuthModule.forRoot({
    config: {
      authority: environment.idcUrl,
      clientId: environment.idcClientId,
      redirectUrl: baseUrl,
      postLogoutRedirectUri: baseUrl,
      scope: 'openid profile email offline_access',
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      ignoreNonceAfterRefresh: true,
      renewTimeBeforeTokenExpiresInSeconds: 30,
      secureRoutes: [environment.apiUrl],
      startCheckSession: true,
      ...keycloakCustomParams
    }
  })],
  exports: [AuthModule],
  providers: [
    {
      provide: AbstractSecurityStorage,
      useClass: AuthStorageService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AuthConfigModule {
}
