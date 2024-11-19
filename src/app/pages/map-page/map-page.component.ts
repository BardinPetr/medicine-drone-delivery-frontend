import {Component, OnDestroy, OnInit} from '@angular/core';
// import {MapControllerService} from "../../../lib";
import {AnyLayout, CirclePaint, SymbolPaint} from "mapbox-gl";
import Palette from "iwanthue/palette";
import {CUDialogService} from "../../services/cudialog.service";
import {forkJoin, Subscription} from "rxjs";
import {ApiProviderService} from "../../api/api-provider.service";
import {IMqttMessage, MqttService} from "ngx-mqtt";

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.sass'
})
export class MapPageComponent implements OnInit, OnDestroy {
  ptsProducts: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: []
  };
  ptsPersons: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: []
  };

  paintProducts: CirclePaint = {
    "circle-opacity": 1,
  }
  paintPersons: SymbolPaint = {
    "icon-color": "#f00"
  }
  layoutPersons: AnyLayout = {
    "icon-image": 'pitch',
    "icon-size": 1.6
  }
  private subs: Subscription[] = [];

  constructor(
    // private mapApi: MapControllerService,
    private cuDialog: CUDialogService,
    private apiProvider: ApiProviderService,
    private mqtt: MqttService) {
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe())
  }

  ngOnInit(): void {
    this.fetchPersons()
    this.fetchProducts()

    this.subs.push(this.mqtt
      .observe('/notify/Person')
      .subscribe((msg: IMqttMessage) => {
        console.warn("MQTT PERSON : " + msg.payload)
        this.fetchPersons()
      }));
    this.subs.push(this.mqtt
      .observe('/notify/Product')
      .subscribe((msg: IMqttMessage) => {
        console.warn("MQTT PRODUCT : " + msg.payload)
        this.fetchProducts()
      }));
  }

  onClick(entityType: string, event: any) {
    const ids = entityIdsOfEvent(event)
    fetchAll(this.apiProvider.getAPI(entityType), ids)
      .subscribe(data => {
        data.forEach(i => {
          this.cuDialog.openEdit(entityType, i)
        })
      })
  }

  onClickCreate(event: mapboxgl.MapMouseEvent & mapboxgl.EventData) {
    if (!event.originalEvent.ctrlKey) return
    this.cuDialog.show(false, 'Product', {
      coordinateX: event.lngLat.lat * 1000,
      coordinateY: Math.round(event.lngLat.lng * 1000)
    })
  }

  private fetchPersons() {
    // this
    //   .mapApi
    //   .persons()
    //   // @ts-ignore
    //   .subscribe(data => {
    //     this.updatePersons(JSON.parse(data))
    //   })
  }

  private fetchProducts() {
    // this
    //   .mapApi
    //   .products()
    //   // @ts-ignore
    //   .subscribe(data => {
    //     this.updateProducts(JSON.parse(data))
    //   })
  }

  private updateProducts(data: any) {
    this.ptsProducts = data
    const prices = this
      .ptsProducts
      .features
      .map(x => x.properties?.['price']!)
    const owners = distinct(this
      .ptsProducts
      .features
      .map(x => x.properties?.['owner']!))
    const palette = genPaletteFromValues(owners);
    this.paintProducts = {
      "circle-color": [
        'match',
        ['get', 'owner'],
        ...owners.flatMap(x => [x, palette.get(x)]),
        "#f00"
      ],
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['get', 'price'],
        Math.min(...prices),
        5,
        Math.max(...prices),
        12
      ]
    }
  }

  private updatePersons(data: any) {
    this.ptsPersons = data
  }
}


const genPaletteFromValues = (values: string[]) =>
  Palette.generateFromValues('p', values, {defaultColor: '#f00'})

const distinct = (arr: any[]) => [...new Set(arr)]

const entityIdsOfEvent = (event: any) =>
  event.features.map((x: any) => x.id)

const fetchAll = (api: any, ids: number[]) =>
  forkJoin(ids.map(id => api.get(id)))

