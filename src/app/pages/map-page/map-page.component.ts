import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnyLayout, CirclePaint, FillPaint, SymbolPaint} from "mapbox-gl";
import {mergeMap, Subscription} from "rxjs";
import {MapControllerService} from "medicine-drone-delivery-fe-lib";
import {makeCircle} from "./geo-utils";
import {NotificationWsService} from "@/services/notifications/notification.ws.service";
import {NotificationType} from "@/services/notifications/NotificationModel";

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.sass'
})
export class MapPageComponent implements OnInit, OnDestroy {
  ptsWh: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: []
  };
  ptsMd: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: []
  };
  ptsDr: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: []
  };
  ptsNfz: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: []
  };
  paintNfz: FillPaint = {
    "fill-color": "red",
    "fill-opacity": 0.3
  }
  paintDr: CirclePaint = {}
  paintWh: SymbolPaint = {}
  layoutWh: AnyLayout = {
    "icon-image": 'museum',
    "icon-size": 1.6
  }
  paintMd: SymbolPaint = {}
  layoutMd: AnyLayout = {
    "icon-image": 'hospital',
    "icon-size": 1.6
  }

  private subs: Subscription[] = [];

  constructor(
    private mapApi: MapControllerService,
    private eventService: NotificationWsService
  ) {
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe())
  }

  ngOnInit(): void {
    this.fetch()

    this.subs.push(
      this.eventService
        .watch("Drone", [NotificationType.UPDATE])
        .pipe(mergeMap(evt => this.mapApi.dronesPartial(evt.objects)))
        .subscribe(update => {
          const updatedDrones = JSON.parse(update).features
          this.ptsDr = {
            type: 'FeatureCollection',
            features: this.mergeFeatures(this.ptsDr.features, updatedDrones)
          }
        })
    );
  }

  private mergeFeatures(original: any[], updates: any[]): any[] {
    return [
      ...updates,
      ...original.filter(obj => !updates.some(update => update.id === obj.id))
    ];
  }

  private fetch() {
    this.mapApi
      .warehouses()
      .subscribe(data => this.ptsWh = JSON.parse(data))
    this.mapApi
      .medicalFacilities()
      .subscribe(data => this.ptsMd = JSON.parse(data))
    this.mapApi
      .drones()
      .subscribe(data => this.updateDrone(JSON.parse(data)))
    this.mapApi
      .noZones()
      .subscribe(data => this.updateNfz(JSON.parse(data)))
  }

  private updateNfz(data: any) {
    this.ptsNfz = {
      "type": "FeatureCollection",
      "features": data.features.map((x: any) => makeCircle(x))
    }
  }

  private updateDrone(data: any) {
    this.ptsDr = data
    this.paintDr = {
      "circle-color": [
        'match',
        ['get', 'status'],
        'IDLE', '#0f0', 'READY', '#f0f', 'FLYING_TO', '#0af', 'FLYING_FROM', '#f00',
        "#fff"
      ],
      "circle-opacity": 1,
      "circle-radius": 6,
    }
  }
}
