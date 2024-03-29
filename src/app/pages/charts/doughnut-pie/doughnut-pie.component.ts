import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
  DoCheck,
} from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [NgApexchartsModule, MaterialModule, CommonModule],
  templateUrl: './doughnut-pie.component.html',
})
export class AppDoughnutpieChartComponent
  implements OnInit, OnChanges, DoCheck
{
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public doughnutChartOptions: Partial<ChartOptions> | any;
  public pieChartOptions: Partial<ChartOptions> | any;
  @Input() chartPoints: any;

  // updateSeries() {
  //   this.doughnutChartOptions = {
  //     series: [45, 15, 27, 18, 35],
  //     chart: {
  //       id: 'donut-chart',
  //       type: 'donut',
  //       height: 350,
  //       fontFamily: "'Plus Jakarta Sans', sans-serif",
  //       foreColor: '#adb0bb',
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     plotOptions: {
  //       pie: {
  //         donut: {
  //           size: '70px',
  //         },
  //       },
  //     },
  //     legend: {
  //       show: true,
  //       position: 'bottom',
  //       width: '50px',
  //     },
  //     colors: ['#5D87FF', '#ECF2FF', '#49BEFF', '#E8F7FF', '#FFAE1F'],
  //     tooltip: {
  //       theme: 'dark',
  //       fillSeriesColor: false,
  //     },
  //   };
  // }

  constructor() {
    //doughnut chart.
    // this.doughnutChartOptions = {
    //   series: [45, 15, 27, 18, 35],
    //   chart: {
    //     id: 'donut-chart',
    //     type: 'donut',
    //     height: 350,
    //     fontFamily: "'Plus Jakarta Sans', sans-serif",
    //     foreColor: '#adb0bb',
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   plotOptions: {
    //     pie: {
    //       donut: {
    //         size: '70px',
    //       },
    //     },
    //   },
    //   legend: {
    //     show: true,
    //     position: 'bottom',
    //     width: '50px',
    //   },
    //   colors: ['#5D87FF', '#ECF2FF', '#49BEFF', '#E8F7FF', '#FFAE1F'],
    //   tooltip: {
    //     theme: 'dark',
    //     fillSeriesColor: false,
    //   },
    // };

    this.doughnutChartOptions = {};

    //pie chart.
    // this.pieChartOptions = {
    //   series: [45, 15, 27, 18, 35],
    //   chart: {
    //     id: 'pie-chart',
    //     type: 'pie',
    //     height: 350,
    //     fontFamily: "'Plus Jakarta Sans', sans-serif",
    //     foreColor: '#adb0bb',
    //     toolbar: {
    //       show: false,
    //     },
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   plotOptions: {
    //     pie: {
    //       donut: {
    //         size: '70px',
    //       },
    //     },
    //   },
    //   legend: {
    //     show: true,
    //     position: 'bottom',
    //     width: '50px',
    //   },
    //   colors: ['#5D87FF', '#ECF2FF', '#49BEFF', '#E8F7FF', '#FFAE1F'],
    //   tooltip: {
    //     fillSeriesColor: false,
    //   },
    // };
  }

  ngOnInit(): void {
    let series = this.chartPoints?.series;
    let labels = this.chartPoints?.labels;
    console.log('labels----', this.chartPoints);
    this.doughnutChartOptions = {
      series: series,
      labels: labels,
      chart: {
        id: 'donut-chart',
        type: 'donut',
        height: 350,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        foreColor: '#adb0bb',
      },

      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70px',
          },
        },
      },
      legend: {
        show: true,
        position: 'bottom',
        width: '50px',
      },
      colors: ['#5D87FF', '#ECF2FF', '#49BEFF', '#E8F7FF', '#FFAE1F'],
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes-----------', changes);
  }

  ngDoCheck(): void {
    // this.doughnutChartOptions = {};
    console.log('chartpoints', this.chartPoints);
    this.doughnutChartOptions.series = this.chartPoints?.series;
    this.doughnutChartOptions.labels = this.chartPoints?.labels;
  }
}
