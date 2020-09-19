import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UpdateStrategyPopupComponent } from './update-strategy-popup/update-strategy-popup.component';
import { UpdatePriceRangeComponent } from './update-price-range/update-price-range.component';

@Component({
  selector: 'app-compare-strategies',
  templateUrl: './compare-strategies.component.html',
  styleUrls: ['./compare-strategies.component.scss']
})
export class CompareStrategiesComponent implements OnInit {

  strategies:any[] = [true];
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
      this.compareStrategies = false;
    });
  }

  deleteStrategy(index) {
    this.strategies.splice(index,1);
  }

  updatePriceRange() {
    const dialogRef = this._dialog.open(UpdatePriceRangeComponent, {
      disableClose: true,
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe((res) => {
    });
  }

}
