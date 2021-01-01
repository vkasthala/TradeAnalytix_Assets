import { Component, OnInit, Input } from '@angular/core';
import { ReportDetails } from '../../model/report-details.model';

@Component({
  selector: 'app-report-chart',
  templateUrl: './report-chart.component.html',
  styleUrls: ['./report-chart.component.scss']
})
export class ReportChartComponent implements OnInit {

  @Input("report") report: ReportDetails;

  constructor() { }

  ngOnInit() {
    console.log('rport: ', this.report);
  }

}
