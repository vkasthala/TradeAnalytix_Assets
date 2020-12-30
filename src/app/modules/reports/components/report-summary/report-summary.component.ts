import { Component, OnInit, Input } from '@angular/core';
import { ReportSummaryItem } from '../../model/report-summary-item.model';

@Component({
  selector: 'app-report-summary',
  templateUrl: './report-summary.component.html',
  styleUrls: ['./report-summary.component.scss']
})
export class ReportSummaryComponent implements OnInit {

  @Input("reportSummaryItems") reportSummaryItems: ReportSummaryItem[];

  constructor() { }

  ngOnInit() {
  }

}
