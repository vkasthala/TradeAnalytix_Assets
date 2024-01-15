import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ViewInsightsComponent } from './view-insights/view-insights.component';
import { CopyCueTradeComponent } from './copy-cueTrade/copy-cueTrade.component';
import { AddNotesComponent } from './add-notes/add-notes.component';

@Component({
  selector: 'app-zerodha',
  templateUrl: './zerodha.component.html',
  styleUrls: ['./zerodha.component.scss']
})
export class ZerodhaComponent implements OnInit {
  private createAcSec: boolean = false;
  private zerodhaOptions: boolean = false;

  protected loginModalOpen: boolean = false;
  hamburgerMenu: boolean = false;

  constructor(
    private router: Router,
    private _dialog: MatDialog,
  ) { }

  ngOnInit() {

  }

  showOptions() {
    this.zerodhaOptions = !this.zerodhaOptions 
  }

  CopyCueTrade() {
    const dialogRef = this._dialog.open(CopyCueTradeComponent, {
      disableClose: true,
      width: 'auto',
      data: {
        title: 'Copy to CueTrade',
      }
    });
  }

  AddNotes() {
    const dialogRef = this._dialog.open(AddNotesComponent, {
      disableClose: true,
      width: 'auto',
      data: {
        title: 'Add Notes',
      }
    });
  }

  VieInsights() {
    const dialogRef = this._dialog.open(ViewInsightsComponent, {
      disableClose: true,
      width: 'auto',
      data: {
        title: 'View Insights',
      }
    });
  }



}
