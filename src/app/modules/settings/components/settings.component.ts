import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  stockAdded: boolean;
  constructor() { }

  ngOnInit() {
  }
  addStock() {
    this.stockAdded = true;
  }

}
