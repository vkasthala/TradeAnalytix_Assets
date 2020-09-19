import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  formatValueToPercentage(value) {
    return `${value}%`;
  }
}
