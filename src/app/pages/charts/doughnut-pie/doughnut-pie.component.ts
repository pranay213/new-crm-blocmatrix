import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexXAxis,
  ApexTooltip,
  ApexTheme,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MaterialModule } from '../../../material.module';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: any;
  theme: ApexTheme;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
  markers: any;
  grid: ApexGrid;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  labels: string[];
};

@Component({
  selector: 'app-doughnut-pie',
  standalone: true,
  imports: [NgApexchartsModule, MaterialModule],
  templateUrl: './doughnut-pie.component.html',
})
export class AppDoughnutpieChartComponent {
  @Input() chartPoints: any;
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public doughnutChartOptions: Partial<ChartOptions> | any;
  public chartOptions: any;

  constructor() {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 400,
        type: 'donut',
        fontFamily: "'Plus Jakarta Sans'",
      },
      labels: [
        'Payment Gateway A',
        'Payment Gateway B',
        'Payment Gateway C',
        'Payment Gateway D',
        'Payment Gateway E',
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }
}
