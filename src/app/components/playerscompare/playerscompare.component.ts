import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
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
import { NgClass, NgForOf } from '@angular/common';
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
  imports: [
    NgApexchartsModule,
    MaterialModule,
    TablerIconsModule,
    NgForOf,
    NgClass,
  ],
  templateUrl: './playerscompare.component.html',
})
export class PlayerscompareComponent implements OnChanges {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  selectedType: any = 'Today';
  @Output() selectEvent = new EventEmitter<string>();
  @Input() callbackFunction: (args: any) => void;
  @Input() data: any;

  selectFN(value: any) {
    this.selectEvent.emit(value);
  }

  public revenueChart!: Partial<revenueChart> | any;
  randomIntNumber: any = (min: any, max: any): any =>
    Math.floor(Math.random() * (max - min + 1) + min);

  months: month[] = [
    { value: 'Today', viewValue: 'Today Vs Yesterday' },
    { value: 'This Week', viewValue: 'This Week Vs Last Week' },
    {
      value: 'This Month',
      viewValue: 'This Month Vs Last Month',
    },
  ];

  dataPoints: any = {
    todayPoints: [0, this.randomIntNumber(1, 100), 0],
    yesterdayPoints: [0, this.randomIntNumber(1, 100), 0],
    thisWeekPoints: [...Array(7)].map((_, i) => this.randomIntNumber(1, 100)),
    lastWeekPoints: [...Array(7)].map((_, i) => this.randomIntNumber(1, 100)),
    thisMonthPoints: [...Array(30)].map((_, i) => this.randomIntNumber(1, 100)),
    lastMonthPoints: [...Array(30)].map((_, i) => this.randomIntNumber(1, 100)),
  };

  getNameFn(selectedType: any): any {
    switch (selectedType) {
      case 'Today':
        return 'Today';
        break;
      case 'This Week':
        return 'This Week';
        break;
      case 'This Month':
        return 'This Month';
        break;
    }
  }
  getNameFn2(selectedType: any): any {
    switch (selectedType) {
      case 'Today':
        return 'Yesterday';
        break;
      case 'This Week':
        return 'Last Week';
        break;
      case 'This Month':
        return 'Last Month';
        break;
    }
  }

  dataPointsFn(selectedType: any) {
    switch (selectedType) {
      case 'Today Vs Yesterday':
        console.log('this.dataPoints.todayPoints', this.dataPoints.todayPoints);
        return this.dataPoints.todayPoints;
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
        return this.dataPoints.yesterdayPoints;
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
    this.callbackFunction(this.selectedType);
    // console.log('value', value);
    // this.revenueChart = {
    //   series: [
    //     {
    //       name: this.getNameFn(this.selectedType) + ' New Players',
    //       data: this.dataPointsFn(this.selectedType),
    //       group: this.getNameFn(this.selectedType),
    //       // data: [11, 0],

    //       color: '#5DcdFF',
    //     },
    //     {
    //       name: this.getNameFn(this.selectedType) + ' Recurring Players',
    //       data: this.dataPointsFn(this.selectedType),
    //       group: this.getNameFn(this.selectedType),
    //       // data: [20, 0],
    //       color: '#00f',
    //     },
    //     {
    //       name: this.getNameFn2(this.selectedType) + ' New Players',
    //       data: this.dataPointsFn2(this.selectedType),
    //       group: this.getNameFn2(this.selectedType),
    //       // data: [11, 0],
    //       color: 'rgba(250, 137, 107,0.5)',
    //     },
    //     {
    //       name: this.getNameFn2(this.selectedType) + ' Recurring Players',
    //       data: this.dataPointsFn2(this.selectedType),
    //       group: this.getNameFn2(this.selectedType),
    //       // data: [20, 0],
    //       color: '#763EBD',
    //     },
    //   ],
    //   chart: {
    //     type: 'bar',
    //     height: 300,
    //     stacked: true,
    //   },

    //   plotOptions: {
    //     bar: {
    //       horizontal: false,
    //       borderRadius: 20,
    //       columnWidth: '50%',
    //       borderRadiusApplication: 'end',
    //       borderRadiusWhenStacked: 'all',
    //     },
    //   },

    //   stroke: {
    //     show: false,
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   legend: {
    //     show: false,
    //   },
    //   grid: {
    //     borderColor: 'rgba(0,0,0,0.1)',
    //     strokeDashArray: 3,
    //     xaxis: {
    //       show: false,
    //       lines: {
    //         show: false,
    //       },
    //     },
    //   },
    //   yaxis: {
    //     show: false,
    //   },
    //   xaxis: {
    //     show: false,
    //     labels: {
    //       show: false,
    //     },
    //     axisBorder: {
    //       show: false,
    //     },
    //     axisTicks: {
    //       show: false,
    //     },
    //   },
    //   tooltip: {
    //     theme: 'dark',
    //     fillSeriesColor: false,
    //   },
    // };
  }

  constructor() {
    this.revenueChart = {};
    // this.revenueChart = {
    //   series: [
    //     {
    //       name: this.getNameFn(this.selectedType) + ' New Players',
    //       data: this.dataPointsFn(this.selectedType),
    //       group: this.getNameFn(this.selectedType),
    //       // data: [11, 0],

    //       color: '#5DcdFF',
    //     },
    //     {
    //       name: this.getNameFn(this.selectedType) + ' Recurring Players',
    //       data: this.dataPointsFn(this.selectedType),
    //       group: this.getNameFn(this.selectedType),
    //       // data: [20, 0],
    //       color: '#00f',
    //     },
    //     {
    //       name: this.getNameFn2(this.selectedType) + ' New Players',
    //       data: this.dataPointsFn2(this.selectedType),
    //       group: this.getNameFn2(this.selectedType),
    //       // data: [11, 0],
    //       color: 'rgba(250, 137, 107,0.5)',
    //     },
    //     {
    //       name: this.getNameFn2(this.selectedType) + ' Recurring Players',
    //       data: this.dataPointsFn2(this.selectedType),
    //       group: this.getNameFn2(this.selectedType),
    //       // data: [20, 0],
    //       color: '#763EBD',
    //     },
    //   ],
    //   chart: {
    //     type: 'bar',
    //     height: 300,
    //     stacked: true,
    //   },

    //   plotOptions: {
    //     bar: {
    //       horizontal: false,
    //       borderRadius: 20,
    //       columnWidth: '50%',
    //       borderRadiusApplication: 'end',
    //       borderRadiusWhenStacked: 'all',
    //     },
    //   },

    //   stroke: {
    //     show: false,
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   legend: {
    //     show: false,
    //   },
    //   grid: {
    //     borderColor: 'rgba(0,0,0,0.1)',
    //     strokeDashArray: 3,
    //     xaxis: {
    //       show: false,
    //       lines: {
    //         show: false,
    //       },
    //     },
    //   },
    //   yaxis: {
    //     show: false,
    //   },
    //   xaxis: {
    //     show: false,
    //     labels: {
    //       show: false,
    //     },
    //     axisBorder: {
    //       show: false,
    //     },
    //     axisTicks: {
    //       show: false,
    //     },
    //   },
    //   tooltip: {
    //     theme: 'dark',
    //     fillSeriesColor: false,
    //   },
    // };
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes['data'].currentValue, '---------');

    let data = changes['data'].currentValue;
    console.log(data, '---------fjasdldkfjaslfjals');
    let datapoints1 =
      data &&
      data.length &&
      data[0].map(function (obj: any) {
        return obj.new_users;
      });
    let recurring_points1 =
      data &&
      data.length &&
      data[0].map(function (obj: any) {
        return obj.recurring_users;
      });
    let datapoints2 =
      data &&
      data.length == 2 &&
      data[1].map(function (obj: any) {
        return obj.new_users;
      });
    let recurring_points2 =
      data &&
      data.length == 2 &&
      data[1].map(function (obj: any) {
        return obj.recurring_users;
      });

    let categories =
      data &&
      data[0].map(function (obj: any) {
        return obj.date;
      });

    this.revenueChart = {
      series: [
        {
          name: this.getNameFn(this.selectedType) + ' New Players',
          data: [...datapoints1],
          group: this.getNameFn(this.selectedType),
          // data: [11, 0],

          color: '#5DcdFF',
        },
        {
          name: this.getNameFn(this.selectedType) + ' Recurring Players',
          data: [...recurring_points1],
          group: this.getNameFn(this.selectedType),
          // data: [20, 0],
          color: '#00f',
        },
        {
          name: this.getNameFn2(this.selectedType) + ' New Players',
          data: [...datapoints2],
          group: this.getNameFn2(this.selectedType),
          // data: [11, 0],
          color: 'rgba(250, 137, 107,0.5)',
        },
        {
          name: this.getNameFn2(this.selectedType) + ' Recurring Players',
          data: [...recurring_points2],
          group: this.getNameFn2(this.selectedType),
          // data: [20, 0],
          color: '#763EBD',
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
        show: true,
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
        tickPlacement: 'on',
        show: true,
        categories: [...categories, 0],
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
