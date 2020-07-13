import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UpdateStrategyPopupComponent } from '../../modalAsComponents/update-strategy-popup/update-strategy-popup.component';

@Component({
  selector: 'app-compare-strategies',
  templateUrl: './compare-strategies.component.html',
  styleUrls: ['./compare-strategies.component.scss']
})
export class CompareStrategiesComponent implements OnInit {

  strategies:any[] = [];
  compareStrategies:boolean;

  constructor( private _dialog: MatDialog) { }

  ngOnInit() {
  }

  addStrategy() {
    this.strategies.push(true);
  }

  update() {
    const dialogRef = this._dialog.open(UpdateStrategyPopupComponent, {
      disableClose: true,
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe((res) => {
   
    });
  }

}
