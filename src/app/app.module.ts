import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./routing/app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PagesModule} from "./pages/pages.module";
import {ServicesModule} from "./services/services.module";
import {PipesModule} from "./pipes/pipes.module";
import {ApiConfigModule} from "./api/api-config.module";
import {HttpClientModule} from "@angular/common/http";
import {ComponentsModule} from "./components/components.module";
import {ToastModule} from "primeng/toast";
import {MessageModule} from "primeng/message";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MessageService} from "primeng/api";
import {AgGridAngular} from "@ag-grid-community/angular";
import {ModuleRegistry} from "@ag-grid-community/core";
import {InfiniteRowModelModule} from "@ag-grid-community/infinite-row-model";
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {MqttModule} from "ngx-mqtt";

ModuleRegistry.registerModules([InfiniteRowModelModule, ClientSideRowModelModule]);

const MQTT_SERVICE_OPTIONS = {
  hostname: '78.24.218.122',
  port: 9001,
  path: '/'
}

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
    ComponentsModule,
    AppRoutingModule,
    ServicesModule,
    PipesModule,
    PagesModule,
    BrowserAnimationsModule,
    ToastModule,
    MessageModule,
    AgGridAngular,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [
    MessageService,
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
