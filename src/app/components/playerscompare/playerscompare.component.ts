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
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgForOf } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

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
  selector: 'app-playerscompare',
  standalone: true,
  imports: [NgApexchartsModule, MaterialModule, TablerIconsModule, NgForOf],
  templateUrl: './playerscompare.component.html',
})
export class PlayerscompareComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  selectedType: any = 'Today Vs Yesterday';

  public revenueChart!: Partial<revenueChart> | any;
  randomIntNumber: any = (min: any, max: any): any =>
    Math.floor(Math.random() * (max - min + 1) + min);

  months: month[] = [
    { value: 'Today Vs Yesterday', viewValue: 'Today Vs Yesterday' },
    { value: 'This Week Vs Last Week', viewValue: 'This Week Vs Last Week' },
    {
      value: 'This Month Vs Last Month',
      viewValue: 'This Month Vs Last Month',
    },
  ];

  dataPoints: any = {
    todayPoints: [this.randomIntNumber(1, 100)],
    yesterdayPoints: [this.randomIntNumber(1, 100)],
    thisWeekPoints: [...Array(7)].map((_, i) => this.randomIntNumber(1, 100)),
    lastWeekPoints: [...Array(7)].map((_, i) => this.randomIntNumber(1, 100)),
    thisMonthPoints: [...Array(30)].map((_, i) => this.randomIntNumber(1, 100)),
    lastMonthPoints: [...Array(30)].map((_, i) => this.randomIntNumber(1, 100)),
  };

  dataPointsFn(selectedType: any) {
    switch (selectedType) {
      case 'Today Vs Yesterday':
        console.log('this.dataPoints.todayPoints', this.dataPoints.todayPoints);
        return [...this.dataPoints.todayPoints, 0];
        break;
      case 'This Week Vs Last Week':
        return this.dataPoints.thisWeekPoints;
        break;
      case 'This Month Vs Last Month':
        return this.dataPoints.thisMonthPoints;
        break;
    }
  }

  dataPointsFn2(selectedType: any) {
    switch (selectedType) {
      case 'Today Vs Yesterday':
        return [...this.dataPoints.yesterdayPoints, 0];
        break;

      case 'This Week Vs Last Week':
        return this.dataPoints.lastWeekPoints;
        break;

      case 'This Month Vs Last Month':
        return this.dataPoints.lastMonthPoints;
        break;
    }
  }

  btnClick(value: any) {
    // alert('hi');
    this.selectedType = value;
    console.log('value', value);
    this.revenueChart = {
      series: [
        {
          data: this.dataPointsFn(this.selectedType),
          color: '#5DcdFF',
        },
        {
          data: this.dataPointsFn2(this.selectedType),
          color: '#00f',
        },
      ],
      chart: {
        type: 'bar',
        height: 380,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 20,
          columnWidth: '50%',
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'all',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
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
    };
  }

  constructor() {
    this.revenueChart = {
      series: [
        {
          data: this.dataPointsFn(this.selectedType),
          // data: [11, 0],
          color: '#5DcdFF',
        },
        {
          data: this.dataPointsFn2(this.selectedType),
          // data: [20, 0],
          color: '#00f',
        },
      ],
      chart: {
        type: 'bar',
        height: 380,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 20,
          columnWidth: '50%',
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'all',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
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
    };
  }
}
