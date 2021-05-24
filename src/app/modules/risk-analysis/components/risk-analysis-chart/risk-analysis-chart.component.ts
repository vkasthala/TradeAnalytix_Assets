import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { RiskAnalysisRequest } from '../../models/risk-analysis-request.model';
import { RiskAnalysisService } from '../../services/risk-analysis.service';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-risk-analysis-chart',
  templateUrl: './risk-analysis-chart.component.html',
  styleUrls: ['./risk-analysis-chart.component.scss']
})
export class RiskAnalysisChartComponent implements OnInit {

  chart: Chart;

  constructor(private riskAnalysisService: RiskAnalysisService) {
  }

  ngOnInit() {
    this.initRiskAnalysisChartProps();
  }

  initRiskAnalysisChartProps() {
    ['mousemove', 'touchmove', 'touchstart'].forEach(function (eventType) {
      document.getElementById('container').addEventListener(
        eventType,
        function (e) {
          var chart,
            point,
            i,
            event;

          for (i = 0; i < Highcharts.charts.length; i = i + 1) {
            debugger;
            chart = Highcharts.charts[i];
            if (chart) {
              chart = Highcharts.charts[i];
              // Find coordinates within the chart
              event = chart.pointer.normalize(e);
              //event.chartX = (event.chartX+400) % 400;
              event.chartX = event.offsetX;
              // Get the hovered point
              point = chart.series[0].searchPoint(event, true);

              if (point) {
                point.onMouseOver(); // Show the hover marker
                //chart.tooltip.refresh(this); // Show the tooltip
                chart.xAxis[0].drawCrosshair(event, this); 
                //point.highlight(e);
              }
            }
          }
        }
      );
    });

    /**
    * Override the reset function, we don't need to hide the tooltips and
    * crosshairs.
    */
    Highcharts.Pointer.prototype.reset = function () {
      return undefined;
    };
  }

  syncExtremes(e) {
    var thisChart = this.chart;

    if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
      Highcharts.each(Highcharts.charts, function (chart) {
        if (chart !== thisChart) {
          if (chart.xAxis[0].setExtremes) { // It is null while updating
            chart.xAxis[0].setExtremes(
              e.min,
              e.max,
              undefined,
              false,
              { trigger: 'syncExtremes' }
            );
          }
        }
      });
    }
  }

  loadChart(chartResult: any[]) {
    this.removeAllChildNodes(document.getElementById('container'));
    for (let ind = 0; ind < chartResult.length; ind++) {
      var chartDiv = document.createElement('div');
      chartDiv.className = 'chart';
      chartDiv.id = "chart" + ind;
      chartDiv.style.width = '500px';
      chartDiv.style.height = '200px';
      // chartDiv.style.float = 'left';
      chartDiv.style.marginTop = '15px';
      document.getElementById('container').appendChild(chartDiv);

      Highcharts.chart(chartDiv, chartResult[ind]);
    }
  }

  removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

}
