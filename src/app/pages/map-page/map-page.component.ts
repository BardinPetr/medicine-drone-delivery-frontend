import {Component, OnInit} from '@angular/core';
import {MapControllerService} from "../../../lib";
import {AnyLayout, CirclePaint, SymbolPaint} from "mapbox-gl";
import Palette from "iwanthue/palette";
import {CUDialogService} from "../../services/cudialog.service";
import {forkJoin} from "rxjs";
import {ApiProviderService} from "../../api/api-provider.service";

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.sass'
})
export class MapPageComponent implements OnInit {
  ptsProducts: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: []
  };
  ptsPersons: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: []
  };

  paintProducts: CirclePaint = {
    "circle-opacity": 0.5,
  }
  paintPersons: SymbolPaint = {
    "icon-color": "#f00"
  }
  layoutPersons: AnyLayout = {
    "icon-image": 'pitch',
    "icon-size": 1.6
  }

  constructor(
    private mapApi: MapControllerService,
    private cuDialog: CUDialogService,
    private apiProvider: ApiProviderService) {
  }

  ngOnInit(): void {
    this.fetchPersons()
    this.fetchProducts()
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

  private fetchPersons() {
    this
      .mapApi
      .persons()
      // @ts-ignore
      .subscribe(data => {
        this.updatePersons(data)
        setTimeout(() => this.fetchPersons(), 1000)
      })
  }

  private fetchProducts() {
    this
      .mapApi
      .products()
      // @ts-ignore
      .subscribe(data => {
        this.updateProducts(data)
        setTimeout(() => this.fetchProducts(), 1000)
      })
  }

  private updateProducts(data: any) {
    this.ptsProducts = data
    const prices = this
      .ptsProducts
      .features
      .map(x => x.properties?.['price']!)
    this.paintProducts['circle-radius'] = [
      'interpolate',
      ['linear'],
      ['get', 'price'],
      Math.min(...prices),
      5,
      Math.max(...prices),
      12
    ]
    const owners = distinct(this
      .ptsProducts
      .features
      .map(x => x.properties?.['owner']!))
    console.log(owners)
    const palette = genPaletteFromValues(owners);
    this.paintProducts["circle-color"] = [
      'match',
      ['get', 'owner'],
      ...owners.flatMap(x => [x, palette.get(x)]),
      "#f00"
    ]
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

