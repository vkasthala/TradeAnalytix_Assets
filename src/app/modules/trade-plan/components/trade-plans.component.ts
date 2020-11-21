import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDrpOptions } from 'mydaterangepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-trade-plans',
  templateUrl: './trade-plans.component.html',
  styleUrls: ['./trade-plans.component.scss']
})
export class TradePlansComponent implements OnInit {

  displayedColumns: string[] = ['date', 'perspective', 'direction', 'planned_trades', 'aligned_with_plan', 'lessions_learnt', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
    editableDateRangeField: false,
    ariaLabelInputField: 'Date'
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addEntry() { this.router.navigate(['/add-new-trade-plan']) }

}

export interface PeriodicElement {
  perspective: string;
  date: string;
  direction: string;
  planned_trades: string;
  lessions_learnt: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { date: '12-Nov-20', perspective: 'Negative on the market fundamentally but neutral from money-inﬂow and Fed action ', direction: 'Bullish', planned_trades: 'FB, AMZN, GOOG, AAPL', lessions_learnt: 'Keep stop loss' },
  { date: '10-Nov-20', perspective: 'Negative on the market fundamentally but neutral from money-inﬂow and Fed action ', direction: 'Bullish', planned_trades: 'FB, AMZN, GOOG, AAPL', lessions_learnt: 'Keep stop loss' },
  { date: '07-Nov-20', perspective: 'Negative on the market fundamentally but neutral from money-inﬂow and Fed action ', direction: 'Bullish', planned_trades: 'FB, AMZN, GOOG, AAPL', lessions_learnt: 'Keep stop loss' },
  { date: '06-Nov-20', perspective: 'Negative on the market fundamentally but neutral from money-inﬂow and Fed action ', direction: 'Bullish', planned_trades: 'FB, AMZN, GOOG, AAPL', lessions_learnt: 'Keep stop loss' },
  { date: '05-Nov-20', perspective: 'Negative on the market fundamentally but neutral from money-inﬂow and Fed action ', direction: 'Bullish', planned_trades: 'FB, AMZN, GOOG, AAPL', lessions_learnt: 'Keep stop loss' },
  { date: '04-Nov-20', perspective: 'Negative on the market fundamentally but neutral from money-inﬂow and Fed action ', direction: 'Bullish', planned_trades: 'FB, AMZN, GOOG, AAPL', lessions_learnt: 'Keep stop loss' },
  { date: '03-Nov-20', perspective: 'Negative on the market fundamentally but neutral from money-inﬂow and Fed action ', direction: 'Bullish', planned_trades: 'FB, AMZN, GOOG, AAPL', lessions_learnt: 'Keep stop loss' },

];
