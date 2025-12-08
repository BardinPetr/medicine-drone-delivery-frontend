import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnyLayout, CirclePaint, FillPaint, SymbolPaint} from "mapbox-gl";
import {Subscription} from "rxjs";
import {IMqttMessage, MqttService} from "ngx-mqtt";
import {MapControllerService} from "medicine-drone-delivery-fe-lib";
import {makeCircle} from "./geo-utils";
// TODO fix home resolving
import {distinct, genPaletteFromValues} from "../../utils/iter";

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
    private mqtt: MqttService) {
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe())
  }

  ngOnInit(): void {
    // TODO make per-item subscriptions
    this.subs.push(this.mqtt
      .observe('/notify')
      .subscribe((msg: IMqttMessage) => {
        this.fetch()
      }));
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
    const types = distinct(this
      .ptsDr
      .features
      .map(x => x.properties?.['type']!)
    )
    // TODO color drones according to state
    const palette = genPaletteFromValues(types);
    this.paintDr = {
      "circle-color": [
        'match',
        ['get', 'type'],
        'TYP1', "#f00", 'TYP2', '#0f0',
        "#fff"
      ],
      "circle-opacity": 1,
      "circle-radius": 6,
    }
  }
}

