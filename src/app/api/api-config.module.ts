import {NgModule} from "@angular/core";
import {environment} from '../../environments/environment';
import {ApiModule, Configuration} from '../../lib';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ApiErrorInterceptor} from "./api-error-interceptor.service";

export function apiConfigFactory(): Configuration {
  return new Configuration({
    basePath: environment.apiUrl,
  });
}

@NgModule({
  imports: [ApiModule.forRoot(apiConfigFactory)],
  exports: [ApiModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true}
  ]
})
export class ApiConfigModule {
}
