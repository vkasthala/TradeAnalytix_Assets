import {Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

/* Static data */ 
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { strategyId: '05082020-001', strategy: 'Naked Call', stock: 'Facebook', direction: 'Long', status:'Draft' },
  { strategyId: '05082020-002', strategy: 'Naked Put', stock: 'Google', direction: 'Neutral', status:'Open' },
  { strategyId: '05082020-003', strategy: 'Iron Condor', stock: 'Amazon', direction: 'Neutral', status:'Closed' },
];

@Component({
  selector: 'app-trade-strategies-grid',
  styleUrls: ['trade-strategies-grid.css'],
  templateUrl: 'trade-strategies-grid.html',
})
export class TradeStrategiesGrid {
  displayedColumns: string[] = ['strategyId', 'strategy', 'stock', 'direction', 'status'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}



