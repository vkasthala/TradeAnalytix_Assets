import { Component, OnInit } from '@angular/core';
import { ConfigureFieldsPopupComponent } from '../../shared/components/widgets/configure-fields-popup/configure-fields-popup.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  stockAdded: boolean;
  selectedType: string = "InvestmentGoals";
  constructor() { }

  ngOnInit() {
  }
  addStock() {
    this.stockAdded = true;
  }

  settingsTabChange(value:string) {
    this.selectedType = value
  }

  openEntryQuestions() {
    const dialogRef = this._dialog.open(ConfigureFieldsPopupComponent, {
      disableClose: true,
      width: 'auto',
      data: {
        title: 'Configure Entry Questions',
        category: 'EntryThesis'
      }
    });
  }

  openExitQuestions() {
    const dialogRef = this._dialog.open(ConfigureFieldsPopupComponent, {
      disableClose: true,
      width: 'auto',
      data: {
        title: 'Configure Exit Questions',
        category: 'ExitThesis'
      }
    });
  }

}

