import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
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
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgClass, NgForOf, NgIf } from '@angular/common';

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
  imports: [
    NgApexchartsModule,
    MaterialModule,
    TablerIconsModule,
    NgForOf,
    NgClass,
    NgIf,
  ],
  templateUrl: './revenue-updates.component.html',
})
export class AppRevenueUpdatesComponent implements OnInit, OnChanges {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  @Output() selectEvent = new EventEmitter<string>();
  @Input() data: any;
  @Input() callbackFunction: (args: any) => void;

  totalRecurringPlayers: any;
  totalNewPlayers: any;
  public loading: boolean = false;

  public revenueChart!: Partial<revenueChart> | any;
  selectedType: any = 'Today';

  selectFN(value: any) {
    this.selectEvent.emit(value);
  }
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
    this.selectedType = value;
    this.callbackFunction(this.selectedType);
    console.log(this.data, 'adflajkklf-----------');

    // this.revenueChart = {
    //   series: [
    //     {
    //       name: 'New Players',
    //       data: [
    //         0,
    //         ...this.data.map(function (obj: any) {
    //           return obj.new_users;
    //         }),
    //         0,
    //       ],
    //       color: '#5DcdFF',
    //     },
    //     {
    //       name: 'Recurring Players',
    //       data: [
    //         0,
    //         ...this.data.map(function (obj: any) {
    //           return obj.recurring_users;
    //         }),
    //         0,
    //       ],

    //       color: '#00f',
    //     },
    //   ],

    //   chart: {
    //     type: 'bar',
    //     fontFamily: "'Plus Jakarta Sans', sans-serif;",
    //     foreColor: '#adb0bb',
    //     toolbar: {
    //       show: true,
    //     },
    //     height: 300,
    //     stacked: true,
    //   },

    //   plotOptions: {
    //     bar: {
    //       horizontal: false,
    //       borderRadius: 20,
    //       columnWidth: '20%',
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
    //       lines: {
    //         show: false,
    //       },
    //     },
    //   },
    //   yaxis: {
    //     show: false,
    //   },
    //   xaxis: {
    //     show: true,
    //     categories: [
    //       0,
    //       ...data.map(function (obj: any) {
    //         return obj.date;
    //       }),
    //       0,
    //     ],
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

    // alert('hi');
    // // console.log('value', value);
    // this.revenueChart = {
    //   series: [
    //     {
    //       name: 'New Players',
    //       data: this.dataPointsFn(this.selectedType),
    //       color: '#5DcdFF',
    //     },
    //     {
    //       name: 'Recurring Players',
    //       data: this.dataPointsFn(this.selectedType),
    //       color: '#00f',
    //     },
    //   ],

    //   chart: {
    //     type: 'bar',
    //     fontFamily: "'Plus Jakarta Sans', sans-serif;",
    //     foreColor: '#adb0bb',
    //     toolbar: {
    //       show: true,
    //     },
    //     height: 300,
    //     stacked: true,
    //   },

    //   plotOptions: {
    //     bar: {
    //       horizontal: false,
    //       borderRadius: 20,
    //       columnWidth: '20%',
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
  todayPoints = {};

  constructor() {
    // console.log('dataPoints', this.dataPoints);
    this.revenueChart = {};

    // this.revenueChart = {
    //   series: [
    //     {
    //       name: 'New Players',
    //       data: this.dataPointsFn(this.selectedType),
    //       color: '#5DcdFF',
    //     },
    //     {
    //       name: 'Recurring Players',
    //       data: this.dataPointsFn(this.selectedType),
    //       color: '#00f',
    //     },
    //   ],

    //   chart: {
    //     type: 'bar',
    //     fontFamily: "'Plus Jakarta Sans', sans-serif;",
    //     foreColor: '#adb0bb',
    //     toolbar: {
    //       show: true,
    //     },
    //     height: 300,
    //     stacked: true,
    //   },

    //   plotOptions: {
    //     bar: {
    //       horizontal: false,
    //       borderRadius: 20,
    //       columnWidth: '20%',
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

  ngOnInit(): void {
    console.log('-----------------', this.data);
    let newplayers = this.data?.map(function (obj: any) {
      return obj.new_users;
    });
    let recurringPlaeyers = this.data?.map(function (obj: any) {
      return obj.recurring_users;
    });

    console.log(
      'newplayers',
      'resuccring players',
      newplayers,
      recurringPlaeyers
    );
    // this.revenueChart = {
    //   series: [
    //     {
    //       name: 'New Players',
    //       // data: this.data?.map(function (obj: any) {
    //       //   return obj.new_users;
    //       // }),
    //       data: [10],
    //       color: '#5DcdFF',
    //     },
    //     {
    //       name: 'Recurring Players',
    //       // data: this.data?.map(function (obj: any) {
    //       //   return obj.recurring_users;
    //       // }),
    //       data: [20],

    //       color: '#00f',
    //     },
    //   ],

    //   chart: {
    //     type: 'bar',
    //     fontFamily: "'Plus Jakarta Sans', sans-serif;",
    //     foreColor: '#adb0bb',
    //     toolbar: {
    //       show: true,
    //     },
    //     height: 300,
    //     stacked: true,
    //   },

    //   plotOptions: {
    //     bar: {
    //       horizontal: false,
    //       borderRadius: 20,
    //       columnWidth: '20%',
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
    this.loading = true;

    let data = changes['data'].currentValue;
    let datapoints =
      data &&
      data.length > 0 &&
      data.map(function (obj: any) {
        return Number(obj.new_users);
      });
    if (datapoints.length > 0) {
      this.totalNewPlayers = datapoints.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0
      );
    }
    let recurring_points =
      data &&
      data.length > 0 &&
      data.map(function (obj: any) {
        return Number(obj.recurring_users);
      });

    if (datapoints.length > 0) {
      this.totalRecurringPlayers = recurring_points.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0
      );
    }

    let categories =
      data &&
      data.length > 0 &&
      data.map(function (obj: any) {
        return obj.date;
      });

    this.revenueChart = {
      series: [
        {
          name: 'New Players',
          data: [0, ...datapoints, 0],
          color: '#5DcdFF',
        },
        {
          name: 'Recurring Players',
          data: [0, ...recurring_points, 0],

          color: '#00f',
        },
      ],

      chart: {
        zoom: {
          enabled: true,
          type: 'x',
          autoScaleYaxis: false,
          zoomedArea: {
            fill: {
              color: '#90CAF9',
              opacity: 0.4,
            },
            stroke: {
              color: '#0D47A1',
              opacity: 0.4,
              width: 1,
            },
          },
        },
        type: 'bar',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: [],
          },
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
        show: true,
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
        categories: [0, ...categories, 0],
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

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
