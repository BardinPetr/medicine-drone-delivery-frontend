import {NgModule} from "@angular/core";
import {environment} from '../../environments/environment';
import {ApiModule, Configuration} from 'medicine-drone-delivery-fe-lib';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ApiErrorInterceptor} from "./api-error-interceptor.service";
import {ApiProviderService} from "./api-provider.service";
import {ApiAuthService} from "./api-auth.service";
import {MessageService} from "primeng/api";

export function apiConfigFactory(): Configuration {
  return new Configuration({
    basePath: environment.apiUrl || window.location.origin,
  });
}

@NgModule({
  imports: [ApiModule.forRoot(apiConfigFactory)],
  exports: [ApiModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ApiAuthService, multi: true},
    ApiProviderService,
    MessageService
  ]
})
export class ApiConfigModule {
}
