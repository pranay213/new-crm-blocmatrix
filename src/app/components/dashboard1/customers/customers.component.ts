import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgForOf } from '@angular/common';

interface month {
  value: string;
  viewValue: string;
}

export interface customerChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}
@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [NgApexchartsModule, MaterialModule, TablerIconsModule, NgForOf],
  templateUrl: './customers.component.html',
})
export class AppCustomersComponent implements OnInit {
  monthsNames: any = [
    { value: 'Today', viewValue: 'Today' },
    { value: 'Yesterday', viewValue: 'Yesterday' },
    { value: 'Last week', viewValue: 'Last week' },
    { value: 'Last month', viewValue: 'Last month' },
  ];
  @Input() newitem: any = {};
  name: string = '';
  color: string = '';
  selectedValue = 'Today';

  setCategoryValue(event: any) {
    this.selectedValue = event.value;
    console.log(event.value);
    this.customerChart = {
      series: [
        {
          name: this.newitem?.name,
          // color: this.newitem?.color,
          color: '#49BEFF',
          // color: '#59B259',
          // data: [0, 1, 2, 3, 4, 5],
          data: this.selectedPoints(this.selectedValue),
        },
      ],

      chart: {
        type: 'area',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 80,
        sparkline: {
          enabled: true,
        },
        group: 'sparklines',
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        colors: ['#E8F7FF'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },

      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
        ],
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
    };
  }

  selectedPoints(type: any) {
    if (type === 'Today') {
      return this.newitem?.todayPoints;
    } else if (type === 'Yesterday') {
      return this.newitem?.yesterdayPoints;
    } else if (type === 'Last week') {
      return this.newitem?.lastweekPoints;
    } else if (type === 'Last month') {
      return this.newitem?.lastmonthPoints;
    } else return this.newitem?.dataPoints;
  }
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public customerChart!: Partial<customerChart> | any;

  constructor() {}
  ngOnInit() {
    console.log('selectedValue', this.selectedValue);
    this.customerChart = {
      series: [
        {
          name: this.newitem?.name,
          // color: this.newitem?.color,
          color: '#49BEFF',
          // color: '#59B259',
          // data: [0, 1, 2, 3, 4, 5],
          data: this.selectedPoints(this.selectedValue),
        },
      ],

      chart: {
        type: 'area',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 80,
        sparkline: {
          enabled: true,
        },
        group: 'sparklines',
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        colors: ['#E8F7FF'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
    };
  }
}
