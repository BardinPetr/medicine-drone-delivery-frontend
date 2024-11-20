import {Component, OnDestroy, OnInit} from '@angular/core';
// import {MapControllerService} from "../../../lib";
import {AnyLayout, CirclePaint, FillPaint, SymbolPaint} from "mapbox-gl";
import Palette from "iwanthue/palette";
import {CUDialogService} from "../../services/cudialog.service";
import {forkJoin, Subscription} from "rxjs";
import {ApiProviderService} from "../../api/api-provider.service";
import {IMqttMessage, MqttService} from "ngx-mqtt";
import {MapControllerService} from "../../../lib";

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
    private cuDialog: CUDialogService,
    private apiProvider: ApiProviderService,
    private mqtt: MqttService) {
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe())
  }

  ngOnInit(): void {
    this.subs.push(this.mqtt
      .observe('/notify')
      .subscribe((msg: IMqttMessage) => {
        // console.warn("MQTT NOTIFY : " + msg.payload)
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
    // console.log(data)
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

  onClick(entityType: string, event: any) {
    //   const ids = entityIdsOfEvent(event)
    //   fetchAll(this.apiProvider.getAPI(entityType), ids)
    //     .subscribe(data => {
    //       data.forEach(i => {
    //         this.cuDialog.openEdit(entityType, i)
    //       })
    //     })
  }

  onClickCreate(event: mapboxgl.MapMouseEvent & mapboxgl.EventData) {
    console.log(`${event.lngLat.lat}, ${event.lngLat.lng}`)
    //   if (!event.originalEvent.ctrlKey) return
    //   this.cuDialog.show(false, 'Product', {
    //     coordinateX: event.lngLat.lat * 1000,
    //     coordinateY: Math.round(event.lngLat.lng * 1000)
    //   })
  }
}


const genPaletteFromValues = (values: string[]) =>
  Palette.generateFromValues('p', values, {defaultColor: '#f00'})

const distinct = (arr: any[]) => [...new Set(arr)]

const entityIdsOfEvent = (event: any) =>
  event.features.map((x: any) => x.id)

const fetchAll = (api: any, ids: number[]) =>
  forkJoin(ids.map(id => api.get(id)))


const makeCircle = (feature: any) => {
  const points = 32
  const coords = {
    latitude: feature.geometry.coordinates[1],
    longitude: feature.geometry.coordinates[0]
  };

  const km = feature.properties.radius / 0.013; // 0.018
  const ret = [];
  const distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
  const distanceY = km / 110.574;

  let theta, x, y;
  for (let i = 0; i < points; i++) {
    theta = (i / points) * (2 * Math.PI);
    x = distanceX * Math.cos(theta);
    y = distanceY * Math.sin(theta);

    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]);

  return {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": [ret]
    }
  }
};
