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
  categorypoints: any = {};
  monthsNames: any = [
    { value: 'Today', viewValue: 'Today' },
    { value: 'Yesterday', viewValue: 'Yesterday' },
    { value: 'This Week', viewValue: 'This Week' },
    { value: 'Last Week', viewValue: 'Last Week' },
    { value: 'This Month', viewValue: 'This Month' },
    { value: 'Last Month', viewValue: 'Last Month' },
  ];
  @Input() newitem: any = {};
  name: string = '';
  color: string = '';
  selectedValue = 'Today';

  selectedPoints(type: any) {
    if (type === 'Today') {
      console.log('TodayPoints', this.newitem);
      return this.newitem?.todayPoints;
    } else if (type === 'Yesterday') {
      return this.newitem?.yesterdayPoints;
    } else if (type === 'This Week') {
      return this.newitem?.thisweekPoints;
    } else if (type === 'Last Week') {
      return this.newitem?.lastweekPoints;
    } else if (type === 'This Month') {
      return this.newitem?.thismonthPoints;
    } else if (type === 'Last Month') {
      return this.newitem?.lastmonthPoints;
    } else return this.newitem?.dataPoints;
  }

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
        show: false,
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
    };
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

      xaxis: {
        show: false,
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
    };
  }
}
