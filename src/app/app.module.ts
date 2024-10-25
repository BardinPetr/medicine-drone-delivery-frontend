import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./routing/app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PagesModule} from "./pages/pages.module";
import {ServicesModule} from "./services/services.module";
import {PipesModule} from "./pipes/pipes.module";
import {AuthConfigModule} from './auth/auth-config.module';
import {ApiConfigModule} from "./api/api-config.module";
import {HttpClientModule} from "@angular/common/http";
import {ComponentsModule} from "./components/components.module";
import {ToastModule} from "primeng/toast";
import {MessageModule} from "primeng/message";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApiConfigModule,
    AuthConfigModule,
    AppRoutingModule,
    ComponentsModule,
    ServicesModule,
    PipesModule,
    PagesModule,
    BrowserAnimationsModule,
    ToastModule,
    MessageModule,
  ],
  providers: [MessageService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
