import { Component, ViewChild } from '@angular/core';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgForOf } from '@angular/common';

interface month {
  value: string;
  viewValue: string;
}

export interface revenueChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

@Component({
  selector: 'app-revenue-updates',
  standalone: true,
  imports: [NgApexchartsModule, MaterialModule, TablerIconsModule, NgForOf],
  templateUrl: './revenue-updates.component.html',
})
export class AppRevenueUpdatesComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public revenueChart!: Partial<revenueChart> | any;
  selectedType: any = 'Today';

  randomIntNumber: any = (min: any, max: any): any =>
    Math.floor(Math.random() * (max - min + 1) + min);

  months: month[] = [
    { value: 'Today', viewValue: 'Today' },
    { value: 'Yesterday', viewValue: 'Yesterday' },
    { value: 'This Week', viewValue: 'This Week' },
    { value: 'Last Week', viewValue: 'Last Week' },
    { value: 'This Month', viewValue: 'This Month' },
    { value: 'Last Month', viewValue: 'Last Month' },
  ];

  dataPoints: any = {
    todayPoints: [0, this.randomIntNumber(1, 100), 0],
    yesterdayPoints: [0, this.randomIntNumber(1, 100), 0],
    thisWeekPoints: [...Array(7)].map((_, i) => this.randomIntNumber(1, 100)),
    lastWeekPoints: [...Array(7)].map((_, i) => this.randomIntNumber(1, 100)),
    thisMonthPoints: [...Array(30)].map((_, i) => this.randomIntNumber(1, 100)),
    lastMonthPoints: [...Array(30)].map((_, i) => this.randomIntNumber(1, 100)),
  };

  dataPointsFn(selectedType: any) {
    switch (selectedType) {
      case 'Today':
        return this.dataPoints.todayPoints;
        break;
      case 'Yesterday':
        return this.dataPoints.yesterdayPoints;
        break;
      case 'This Week':
        return this.dataPoints.thisWeekPoints;
        break;
      case 'Last Week':
        return this.dataPoints.lastWeekPoints;
        break;
      case 'This Month':
        return this.dataPoints.thisMonthPoints;
        break;
      case 'Last Month':
        return this.dataPoints.lastMonthPoints;
        break;
    }
  }

  btnClick(value: any) {
    // alert('hi');
    this.selectedType = value;
    // console.log('value', value);
    this.revenueChart = {
      series: [
        {
          name: 'New Players',
          data: this.dataPointsFn(this.selectedType),
          color: '#5DcdFF',
        },
        {
          name: 'Recurring Players',
          data: this.dataPointsFn(this.selectedType),
          color: '#00f',
        },
      ],

      chart: {
        type: 'bar',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: true,
        },
        height: 300,
        stacked: true,
      },

      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 20,
          columnWidth: '20%',
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'all',
        },
      },

      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      yaxis: {
        show: false,
      },
      xaxis: {
        show: false,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
    };
  }
  todayPoints = {};

  constructor() {
    console.log('dataPoints', this.dataPoints);

    this.revenueChart = {
      series: [
        {
          name: 'New Players',
          data: this.dataPointsFn(this.selectedType),
          color: '#5DcdFF',
        },
        {
          name: 'Recurring Players',
          data: this.dataPointsFn(this.selectedType),
          color: '#00f',
        },
      ],

      chart: {
        type: 'bar',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: true,
        },
        height: 300,
        stacked: true,
      },

      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 20,
          columnWidth: '20%',
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'all',
        },
      },

      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      yaxis: {
        show: false,
      },
      xaxis: {
        show: false,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
    };
  }
}
