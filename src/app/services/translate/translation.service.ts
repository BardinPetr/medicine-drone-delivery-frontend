import {Injectable} from '@angular/core';
import * as data from './messages.json';


// TODO finish service
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly data: { [key: string]: string } = {};

  constructor() {
    this.data = data
  }

  t(id: string): string {
    return this.data[id] || this.fallback(id)
  }

  fallback(text: string): string {
    return text
      .replace(/([A-Z])/g, ' $1')
      .replace(/^\w/, c => c.toUpperCase())
      .trim()
  }
}
