import {Injectable} from '@angular/core';
import * as data from './messages.json';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly data: { [key: string]: string } = {};

  constructor() {
    this.data = data
  }

  m(id: string): string {
    console.log(id)
    return this.data[id] || id
  }
}
