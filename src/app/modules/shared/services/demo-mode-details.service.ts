import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoModeDetailsService {

  demoMode: boolean = false;

  constructor() { }

  setDemoModeStatus(enabled: boolean): void {
    this.demoMode = enabled;
  }

}
