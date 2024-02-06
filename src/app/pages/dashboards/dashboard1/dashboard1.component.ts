import {
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';

// components
import { AppTopCardsComponent } from '../../../components/dashboard1/top-cards/top-cards.component';
import { AppRevenueUpdatesComponent } from '../../../components/dashboard1/revenue-updates/revenue-updates.component';
import { AppYearlyBreakupComponent } from '../../../components/dashboard1/yearly-breakup/yearly-breakup.component';
import { AppMonthlyEarningsComponent } from '../../../components/dashboard1/monthly-earnings/monthly-earnings.component';
import { AppEmployeeSalaryComponent } from '../../../components/dashboard1/employee-salary/employee-salary.component';
import { AppCustomersComponent } from '../../../components/dashboard1/customers/customers.component';
import { AppProductsComponent } from '../../../components/dashboard2/products/products.component';
import { AppSocialCardComponent } from '../../../components/dashboard1/social-card/social-card.component';
import { AppSellingProductComponent } from '../../../components/dashboard1/selling-product/selling-product.component';
import { AppWeeklyStatsComponent } from '../../../components/dashboard1/weekly-stats/weekly-stats.component';
import { AppTopProjectsComponent } from '../../../components/dashboard1/top-projects/top-projects.component';
import { AppProjectsComponent } from '../../../components/dashboard1/projects/projects.component';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { PlayerscompareComponent } from 'src/app/components/playerscompare/playerscompare.component';
import { CardsNewComponent } from 'src/app/components/cards-new/cards-new.component';
import { DataTablesComponent } from 'src/app/data-tables/data-tables.component';
import { AppDynamicTableComponent } from '../../tables/dynamic-table/dynamic-table.component';
import { MatTableDataSource } from '@angular/material/table';
import { AppBasicTableComponent } from '../../tables/basic-table/basic-table.component';
import { ApiService } from 'src/app/services/api.service';
import { AllApiService } from 'src/app/all-api.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-dashboard1',
  standalone: true,
  imports: [
    TablerIconsModule,
    AppTopCardsComponent,
    AppRevenueUpdatesComponent,
    AppYearlyBreakupComponent,
    AppMonthlyEarningsComponent,
    AppEmployeeSalaryComponent,
    AppCustomersComponent,
    AppProductsComponent,
    AppSocialCardComponent,
    AppSellingProductComponent,
    AppWeeklyStatsComponent,
    AppTopProjectsComponent,
    AppProjectsComponent,
    CommonModule,
    PlayerscompareComponent,
    AppTopCardsComponent,
    CardsNewComponent,
    NgIf,
    DataTablesComponent,
    AppDynamicTableComponent,
    AppBasicTableComponent,
    NgApexchartsModule,
    NgApexchartsModule,
    MaterialModule,
    TablerIconsModule,
    NgForOf,
  ],
  templateUrl: './dashboard1.component.html',
})
export class AppDashboard1Component implements OnInit, DoCheck, OnChanges {
  fullData: any;
  profitData: any;
  ggrData: any;
  playersData: any;
  playersPercentage: any;
  despositorData: any;
  ftdsData: any;
  despositPercentage: any;
  ftdsPercentage: any;

  live_players: any;
  deposits: any;
  ftd: any;
  top_depositors: any;
  selectedValue: any = 'Today';
  profitselectedValue: any = '2D';
  ggrselectedValue: any = '2D';
  liveplayersselectedValue: any = '2D';
  depositssselectedValue: any = '2D';
  ftdssselectedValue: any = '2D';

  profitPercentage: any = '';
  ggrPercentage: any = '';

  profitPoints: any = {};
  ggrPoints: any = {};
  livePlayerPoints: any = {};
  depositsPoints: any = {};
  ftdsPoints: any = {};

  customerChart: any = {};
  monthsNames: any = [
    { value: '2D', viewValue: '2days' },
    { value: '7D', viewValue: '1 Week' },
    { value: '15D', viewValue: '15 Days' },
    { value: '30D', viewValue: '1 Month' },
    { value: '180D', viewValue: '6 Months' },
    { value: '365D', viewValue: '1 Year' },
  ];

  setCategoryValue(event: any, value: string) {
    if (value === 'PROFIT') {
      this.profitselectedValue = event.value;
      this.updateSelectionData(this.profitselectedValue, value);
    }
    if (value === 'GGR') {
      this.ggrselectedValue = event.value;
      this.updateSelectionData(this.ggrselectedValue, value);
      // this.ggrData = this.fullData?.profit_ggr;
      // this.ggrPercentage = (
      //   ((this.ggrData[0].ggr - this.ggrData[this.ggrData.length - 1].ggr) *
      //     100) /
      //   this.ggrData[this.ggrData.length - 1].ggr
      // ).toFixed(2);
    }
    if (value === 'LIVE-PLAYERS') {
      this.liveplayersselectedValue = event.value;

      this.updateSelectionData(this.liveplayersselectedValue, value);

      this.liveplayersselectedValue = event.value;
    }
    if (value === 'DEPOSITS') {
      this.depositssselectedValue = event.value;
      this.updateSelectionData(this.depositssselectedValue, value);
    }
    if (value === 'FTD') {
      this.ftdssselectedValue = event.value;
      this.updateSelectionData(this.ftdssselectedValue, value);
    }
    this.customerChart = {
      series: [
        {
          name: 'Profit',
          // color: this.newitem?.color,
          color: '#49BEFF',
          // color: '#59B259',
          // data: [0, 1, 2, 3, 4, 5],
          data: [],
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

  displayedColumns: string[] = [
    'game_name',
    'provider_game_type',
    'total_wagered',
    'total_win',
    'players_count',
  ];
  displayedColumns2: string[] = [
    'player_name',
    'total_deposits',
    'total_withdrawals',
    'avg_deposits',
    'created_at',
  ];

  displayedColumns3: string[] = [
    'payment_gateway',
    'success_count',
    'failed_count',
    'total_deposits',
  ];

  selected: any = 'data';
  randomIntFromInterval: any = (min: any, max: any): any => [
    Math.floor(Math.random() * (max - min + 1) + min),
    Math.floor(Math.random() * (max - min + 1) + min),
    Math.floor(Math.random() * (max - min + 1) + min),
    Math.floor(Math.random() * (max - min + 1) + min),
    Math.floor(Math.random() * (max - min + 1) + min),
    Math.floor(Math.random() * (max - min + 1) + min),
  ];

  randomIntNumber: any = (min: any, max: any): any =>
    Math.floor(Math.random() * (max - min + 1) + min);

  cardslist: any;

  randomIntHours: any = (min: any, max: any): any => {
    // new Array(100).fill().map((_, i) => console.log(i + 1))
  };

  selectedFn(value: any): void {
    // alert(value);
    this.selected = value;

    // console.log('this.selected', this.selected);
  }

  myCallbackFunction = (arg1: any, arg2: any): void => {
    console.log('Fn invocked', arg1, arg2);
    if (arg1 === 'Payment Gateways') {
      arg1 = 'PSP';
    } else {
      arg1 = arg1.replace(' ', '-').toUpperCase();
    }

    this.upDateData(arg1, arg2.replace(' ', '-').toUpperCase());
    //callback code here
  };
  topGamesData = new MatTableDataSource<PeriodicElement>([]);
  // topGamesData: PeriodicElement;
  topDepositorData = new MatTableDataSource<DepositElement>([]);
  paymentGateways = new MatTableDataSource<PaymentGateElement>([]);
  piePoints: any;
  // elementGameData = ELEMENT_DATA;
  tableData: any = [
    {
      'Count of Players': 2,
      'Game Name': 'Hydrogen',
      'Game Type': 'Hydrogen',
      'Total Wagered': 1.0079,
      'Total Winnings': 'H',
    },
    {
      'Count of Players': 2,
      'Game Name': 2,
      'Game Type': 'Helium',
      'Total Wagered': 4.0026,
      'Total Winnings': 'He',
    },
    {
      'Count of Players': 2,
      'Game Name': 3,
      'Game Type': 'Lithium',
      'Total Wagered': 6.941,
      'Total Winnings': 'Li',
    },
    {
      'Count of Players': 2,
      'Game Name': 4,
      'Game Type': 'Beryllium',
      'Total Wagered': 9.0122,
      'Total Winnings': 'Be',
    },
    {
      'Count of Players': 2,
      'Game Name': 5,
      'Game Type': 'Boron',
      'Total Wagered': 10.811,
      'Total Winnings': 'B',
    },
    {
      'Count of Players': 2,
      'Game Name': 6,
      'Game Type': 'Carbon',
      'Total Wagered': 12.0107,
      'Total Winnings': 'C',
    },
    {
      'Count of Players': 2,
      'Game Name': 7,
      'Game Type': 'Nitrogen',
      'Total Wagered': 14.0067,
      'Total Winnings': 'N',
    },
    {
      'Count of Players': 2,
      'Game Name': 8,
      'Game Type': 'Oxygen',
      'Total Wagered': 15.9994,
      'Total Winnings': 'O',
    },
    {
      'Count of Players': 2,
      'Game Name': 9,
      'Game Type': 'Fluorine',
      'Total Wagered': 18.9984,
      'Total Winnings': 'F',
    },
    {
      'Count of Players': 2,
      'Game Name': 10,
      'Game Type': 'Neon',
      'Total Wagered': 20.1797,
      'Total Winnings': 'Ne',
    },
  ];
  getData() {
    // this.apiService
    //   .getdashboradData()
    //   .subscribe((res) => (this.fullData = res));
    this.allApiService.getDashboardData().then((res) => {
      console.log('data======', res.data.live_players);
      this.fullData = res.data;
      // this.profi = res.data.profit_ggr;
      // this.ggtD;
      this.top_depositors = res.data.top_depositors;

      this.profitData = res.data.profit_ggr;
      this.profitPercentage = (
        ((this.profitData[0].profit -
          this.profitData[this.profitData.length - 1].profit) *
          100) /
        (this.profitData[this.profitData.length - 1].profit === 0
          ? 1
          : this.profitData[this.profitData.length - 1].profit)
      ).toFixed(1);

      this.ggrData = res.data.profit_ggr;

      this.ggrPercentage = (
        ((this.ggrData[0].ggr - this.ggrData[this.ggrData.length - 1].ggr) *
          100) /
        (this.ggrData[this.ggrData.length - 1].ggr === 0
          ? 1
          : this.ggrData[this.ggrData.length - 1].ggr)
      ).toFixed(1);

      this.playersData = res.data.live_players;

      this.playersPercentage = (
        ((this.playersData[0].live_players -
          this.playersData[this.playersData.length - 1].live_players) *
          100) /
        (this.playersData[this.playersData.length - 1].live_players === 0
          ? 1
          : this.playersData[this.playersData.length - 1].live_players)
      ).toFixed(1);

      this.despositorData = res.data.deposits;

      this.despositPercentage = (
        ((this.despositorData[0].deposits -
          this.despositorData[this.despositorData.length - 1].deposits) *
          100) /
        (this.despositorData[this.despositorData.length - 1].deposits === 0
          ? 1
          : this.despositorData[this.despositorData.length - 1].deposits)
      ).toFixed(1);

      this.ftdsData = res.data.ftd;

      this.ftdsPercentage = (
        ((this.ftdsData[0].ftd - this.ftdsData[this.ftdsData.length - 1].ftd) *
          100) /
        (this.ftdsData[this.ftdsData.length - 1].ftd === 0
          ? 1
          : this.ftdsData[this.ftdsData.length - 1].ftd)
      ).toFixed(1);
      if (this.ftdsPercentage === 'NaN') {
        this.ftdsPercentage = 0;
      }

      this.profitPoints = {
        series: [
          {
            name: ['Profit'],
            // color: this.newitem?.color,
            color: '#7ebbf4',
            // color: '#59B259',
            data: res.data?.profit_ggr.map(function (obj: any) {
              return obj.profit;
            }),
          },
        ],
        dataLabels: {
          enabled: false,
          style: {
            colors: ['#333'],
          },
          offsetX: 30,
        },
        xaxis: {
          categories: res.data?.profit_ggr.map(function (obj: any) {
            return obj.date;
          }),
        },
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
          colors: ['#6688F7'],
          type: 'solid',
          opacity: 0.05,
        },
        markers: {
          size: 0,
        },

        tooltip: {
          theme: 'dark',
          fillSeriesColor: false,
        },
      };
      this.ggrPoints = {
        series: [
          {
            name: 'GGR',
            // color: this.newitem?.color,
            color: '#7ebbf4',
            // color: '#59B259',
            data: res.data.profit_ggr.map(function (obj: any) {
              return obj.ggr;
            }),
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
          colors: ['#6688F7'],
          type: 'solid',
          opacity: 0.05,
        },
        markers: {
          size: 0,
        },

        xaxis: {
          show: true,
          categories: res.data.profit_ggr.map(function (obj: any) {
            return obj.date;
          }),
        },
        tooltip: {
          theme: 'dark',
          fillSeriesColor: false,
        },
      };
      this.livePlayerPoints = {
        series: [
          {
            name: 'Live Players',
            // color: this.newitem?.color,
            color: '#7ebbf4',
            // color: '#59B259',
            data: res.data.live_players.map(function (obj: any) {
              return obj.live_players;
            }),
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
          colors: ['#6688F7'],
          type: 'solid',
          opacity: 0.05,
        },
        markers: {
          size: 0,
        },

        xaxis: {
          show: true,
          categories: res.data.live_players.map(function (obj: any) {
            return obj.date;
          }),
        },
        tooltip: {
          theme: 'dark',
          fillSeriesColor: false,
        },
      };
      this.depositsPoints = {
        series: [
          {
            name: 'Deposits',
            // color: this.newitem?.color,
            color: '#7ebbf4',
            // color: '#59B259',
            data: res.data.deposits.map(function (obj: any) {
              return obj.deposits;
            }),
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
          colors: ['#6688F7'],
          type: 'solid',
          opacity: 0.05,
        },
        markers: {
          size: 0,
        },

        xaxis: {
          show: true,
          categories: res.data.deposits.map(function (obj: any) {
            return obj.date;
          }),
        },
        tooltip: {
          theme: 'dark',
          fillSeriesColor: false,
        },
      };
      this.ftdsPoints = {
        series: [
          {
            name: 'FTDS',
            // color: this.newitem?.color,
            color: '#7ebbf4',
            // color: '#59B259',
            data: res.data.ftd.map(function (obj: any) {
              return obj.ftd;
            }),
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
          colors: ['#6688F7'],
          type: 'solid',
          opacity: 0.05,
        },
        markers: {
          size: 0,
        },

        xaxis: {
          show: true,
          categories: res.data.ftd.map(function (obj: any) {
            return obj.date;
          }),
        },
        tooltip: {
          theme: 'dark',
          fillSeriesColor: false,
        },
      };
    });
  }

  upDateData(arg1: any, arg2: any) {
    this.allApiService.getData(arg2, arg1).then((res) => {
      this.fullData = { ...this.fullData, ...res.data };
      if ((arg1 = 'PSP')) {
        this.piePoints = this.fullData?.payment_gateways.slice(0, 5);
      }
    });
  }

  updateSelectionData(param1: any, param2: any) {
    this.allApiService.getData(param1, param2).then((res) => {
      // this.fullData = { ...this.fullData, ...res.data };
      let data = res.data;
      if (param2 === 'PROFIT') {
        this.profitData = data?.profit_ggr;
        this.profitPercentage = (
          ((this.profitData[0].profit -
            this.profitData[this.profitData.length - 1].profit) *
            100) /
          (this.profitData[this.profitData.length - 1].profit === 0
            ? 1
            : this.profitData[this.profitData.length - 1].profit)
        ).toFixed(1);
        this.profitPoints = {
          series: [
            {
              name: 'Profit',
              // color: this.newitem?.color,
              color: '#7ebbf4',
              // color: '#59B259',
              data: res.data?.profit_ggr.map(function (obj: any) {
                return obj.profit;
              }),
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
            colors: ['#6688F7'],
            type: 'solid',
            opacity: 0.05,
          },
          markers: {
            size: 0,
          },

          xaxis: {
            show: true,
            categories: res.data?.profit_ggr.map(function (obj: any) {
              return obj.date;
            }),
          },
          tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
          },
        };
      }
      if (param2 === 'GGR') {
        this.ggrData = res.data?.profit_ggr;
        this.ggrPercentage = (
          ((this.ggrData[0].ggr - this.ggrData[this.ggrData.length - 1].ggr) *
            100) /
          (this.ggrData[this.ggrData.length - 1].ggr === 0
            ? 1
            : this.ggrData[this.ggrData.length - 1].ggr)
        ).toFixed(1);

        this.ggrPoints = {
          series: [
            {
              name: 'GGR',
              // color: this.newitem?.color,
              color: '#7ebbf4',
              // color: '#59B259',
              data: res.data?.profit_ggr.map(function (obj: any) {
                return obj.ggr;
              }),
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
            colors: ['#6688F7'],
            type: 'solid',
            opacity: 0.05,
          },
          markers: {
            size: 0,
          },

          xaxis: {
            show: true,
            categories: res.data?.profit_ggr.map(function (obj: any) {
              return obj.date;
            }),
          },
          tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
          },
        };
      }
      if (param2 === 'LIVE-PLAYERS') {
        this.playersData = res.data?.live_players;

        this.playersPercentage = (
          ((this.playersData[0].live_players -
            this.playersData[this.playersData.length - 1].live_players) *
            100) /
          (this.playersData[this.playersData.length - 1].live_players === 0
            ? 1
            : this.playersData[this.playersData.length - 1].live_players)
        ).toFixed(1);

        this.livePlayerPoints = {
          series: [
            {
              name: 'Live Players',
              // color: this.newitem?.color,
              color: '#7ebbf4',
              // color: '#59B259',
              data: res.data?.live_players.map(function (obj: any) {
                return obj.live_players;
              }),
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
            colors: ['#6688F7'],
            type: 'solid',
            opacity: 0.05,
          },
          markers: {
            size: 0,
          },

          xaxis: {
            show: true,
            categories: res.data?.live_players.map(function (obj: any) {
              return obj.date;
            }),
          },
          tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
          },
        };
        if (param2 === 'DEPOSITS') {
          this.depositsPoints = {
            series: [
              {
                name: 'Deposits',
                // color: this.newitem?.color,
                color: '#7ebbf4',
                // color: '#59B259',
                data: res.data?.deposits.map(function (obj: any) {
                  return obj.deposits;
                }),
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
              colors: ['#6688F7'],
              type: 'solid',
              opacity: 0.05,
            },
            markers: {
              size: 0,
            },

            xaxis: {
              show: true,
              categories: res.data?.deposits.map(function (obj: any) {
                return obj.date;
              }),
            },
            tooltip: {
              theme: 'dark',
              fillSeriesColor: false,
            },
          };
        }
        if (param2 === 'FTD') {
          this.ftdsPoints = {
            series: [
              {
                name: 'FTDS',
                // color: this.newitem?.color,
                color: '#7ebbf4',
                // color: '#59B259',
                data: res.data?.ftd.map(function (obj: any) {
                  return obj.ftd;
                }),
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
              colors: ['#6688F7'],
              type: 'solid',
              opacity: 0.05,
            },
            markers: {
              size: 0,
            },

            xaxis: {
              show: true,
              categories: res.data?.ftd.map(function (obj: any) {
                return obj.date;
              }),
            },
            tooltip: {
              theme: 'dark',
              fillSeriesColor: false,
            },
          };
        }
      }
      if (param2 === 'DEPOSITS') {
        this.despositorData = res.data?.deposits;
        this.despositPercentage = (
          ((this.despositorData[0].deposits -
            this.despositorData[this.despositorData.length - 1].deposits) *
            100) /
          (this.despositorData[this.despositorData.length - 1].deposits === 0
            ? 1
            : this.despositorData[this.despositorData.length - 1].deposits)
        ).toFixed(1);
        this.depositsPoints = {
          series: [
            {
              name: 'Deposits',
              // color: this.newitem?.color,
              color: '#7ebbf4',
              // color: '#59B259',
              data: res.data?.deposits.map(function (obj: any) {
                return obj.deposits;
              }),
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
            colors: ['#6688F7'],
            type: 'solid',
            opacity: 0.05,
          },
          markers: {
            size: 0,
          },

          xaxis: {
            show: true,
            categories: res.data?.deposits.map(function (obj: any) {
              return obj.date;
            }),
          },
          tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
          },
        };
      }
      if (param2 === 'FTD') {
        this.ftdsData = res.data.ftd;

        this.despositPercentage = (
          ((this.ftdsData[0].ftd -
            this.ftdsData[this.ftdsData.length - 1].ftd) *
            100) /
          (this.ftdsData[this.ftdsData.length - 1].ftd === 0
            ? 1
            : this.ftdsData[this.ftdsData.length - 1].ftd)
        ).toFixed(1);
        this.ftdsPoints = {
          series: [
            {
              name: 'FTDS',
              // color: this.newitem?.color,
              color: '#7ebbf4',
              // color: '#59B259',
              data: res.data?.ftd.map(function (obj: any) {
                return obj.ftd;
              }),
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
            colors: ['#6688F7'],
            type: 'solid',
            opacity: 0.05,
          },
          markers: {
            size: 0,
          },

          xaxis: {
            show: true,
            categories: res.data?.ftd.map(function (obj: any) {
              return obj.date;
            }),
          },
          tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
          },
        };
      }
    });
    // this.ngOnInit();
  }

  constructor(
    private apiService: ApiService,
    private allApiService: AllApiService
  ) {}
  ngOnInit() {
    this.getData();
    console.log('----------data', this.fullData.profit_ggr);

    // let profitFirst = this.fullData?.profit_ggr[0]?.profit;
    // let profitLast =
    //   this.fullData.profit_ggr[this.fullData.profit_ggr.length - 1].profit;
    // let ggrFirst = this.fullData.profit_ggr[0].ggr;
    // let ggrLast =
    //   this.fullData.profit_ggr[this.fullData.profit_ggr.length - 1].ggr;
    // let liveplayerFirst = this.fullData.live_players[0].live_players;
    // let liveplayerLast =
    //   this.fullData.live_players[this.fullData.live_players.length - 1]
    //     .live_players;
    // let depositsFirst = this.fullData.deposits[0].deposits;
    // let depositsLast =
    //   this.fullData.deposits[this.fullData.deposits.length - 1].deposits;
    // let ftdFirst = this.fullData.ftd[0].ftd;
    // let ftdLast = this.fullData.ftd[this.fullData.ftd.length - 1].ftd;

    // // this.profitPercentage = (
    // //   ((profitFirst - profitLast) * 100) /
    // //   profitLast
    // // ).toFixed(2);

    // console.log('profitPercentage', profitFirst);

    // this.cardslist = [

    //   {
    //     name: 'Profit',
    //     color: '#ECF2FF',

    //     value: this.randomIntNumber(1, 100),
    //     dataPoints: this.randomIntFromInterval(1, 100),

    //     todayPoints: [...Array(24)].map((_, i) => this.randomIntNumber(1, 100)),
    //     yesterdayPoints: [...Array(24)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     thisweekPoints: [...Array(7)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     lastweekPoints: [...Array(7)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     thismonthPoints: [...Array(30)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     lastmonthPoints: [...Array(30)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //   },
    //   {
    //     name: 'GGR',
    //     color: '#fff',
    //     // value: '20',
    //     value: this.randomIntNumber(1, 100),
    //     // dataPoints: [2, 5, 6, 10, 50, 40],
    //     dataPoints: this.randomIntFromInterval(1, 100),
    //     todayPoints: [...Array(24)].map((_, i) => this.randomIntNumber(1, 100)),
    //     yesterdayPoints: [...Array(24)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     thisweekPoints: [...Array(7)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     lastweekPoints: [...Array(7)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     thismonthPoints: [...Array(30)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     lastmonthPoints: [...Array(30)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //   },
    //   {
    //     name: 'Live Players',
    //     color: '#ECF2FF',
    //     // value: '25',
    //     value: this.randomIntNumber(1, 100),
    //     // dataPoints: [1, 20, 3, 10, 50, 40],
    //     dataPoints: this.randomIntFromInterval(1, 100),
    //     todayPoints: [...Array(24)].map((_, i) => this.randomIntNumber(1, 100)),
    //     yesterdayPoints: [...Array(24)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     thisweekPoints: [...Array(7)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     lastweekPoints: [...Array(7)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     thismonthPoints: [...Array(30)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     lastmonthPoints: [...Array(30)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //   },
    //   {
    //     name: 'Deposits',
    //     color: '#fff',
    //     // value: '15',
    //     points: [],
    //     value: this.randomIntNumber(1, 100),

    //     // dataPoints: [6, 20, 4, 10, 8, 40],
    //     dataPoints: this.randomIntFromInterval(1, 100),
    //     todayPoints: [...Array(24)].map((_, i) => this.randomIntNumber(1, 100)),
    //     yesterdayPoints: [...Array(24)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     thisweekPoints: [...Array(7)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     lastweekPoints: [...Array(7)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     thismonthPoints: [...Array(30)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     lastmonthPoints: [...Array(30)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //   },
    //   {
    //     name: 'FTDS',
    //     color: '#ECF2FF',
    //     // value: '5',
    //     value: this.randomIntNumber(1, 100),
    //     // dataPoints: [180, 20, 25, 10, 50, 9],
    //     dataPoints: this.randomIntFromInterval(1, 100),
    //     todayPoints: [...Array(24)].map((_, i) => this.randomIntNumber(1, 100)),
    //     yesterdayPoints: [...Array(24)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     thisweekPoints: [...Array(7)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     lastweekPoints: [...Array(7)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     thismonthPoints: [...Array(30)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //     lastmonthPoints: [...Array(30)].map((_, i) =>
    //       this.randomIntNumber(1, 100)
    //     ),
    //   },
    // ];

    this.profitPoints = {
      series: [
        {
          name: 'Profit',
          // color: this.newitem?.color,
          color: '#7ebbf4',
          // color: '#59B259',
          data: this.fullData?.profit_ggr.map(function (obj: any) {
            return obj.profit;
          }),
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
        colors: ['#6688F7'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },

      xaxis: {
        show: true,
        categories: this.fullData?.profit_ggr.map(function (obj: any) {
          return obj.date;
        }),
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
    };
    this.ggrPoints = {
      series: [
        {
          name: 'GGR',
          // color: this.newitem?.color,
          color: '#7ebbf4',
          // color: '#59B259',
          data: this.fullData?.profit_ggr.map(function (obj: any) {
            return obj.ggr;
          }),
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
        colors: ['#6688F7'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },

      xaxis: {
        show: true,
        categories: this.fullData?.profit_ggr.map(function (obj: any) {
          return obj.date;
        }),
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
    };
    this.livePlayerPoints = {
      series: [
        {
          name: 'Live Players',
          // color: this.newitem?.color,
          color: '#7ebbf4',
          // color: '#59B259',
          data: this.fullData?.live_players.map(function (obj: any) {
            return obj.live_players;
          }),
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
        colors: ['#6688F7'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },

      xaxis: {
        show: true,
        categories: this.fullData?.live_players.map(function (obj: any) {
          return obj.date;
        }),
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
    };
    this.depositsPoints = {
      series: [
        {
          name: 'Deposits',
          // color: this.newitem?.color,
          color: '#7ebbf4',
          // color: '#59B259',
          data: this.fullData?.deposits.map(function (obj: any) {
            return obj.deposits;
          }),
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
        colors: ['#6688F7'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },

      xaxis: {
        show: true,
        categories: this.fullData?.deposits.map(function (obj: any) {
          return obj.date;
        }),
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
    };
    this.ftdsPoints = {
      series: [
        {
          name: 'FTDS',
          // color: this.newitem?.color,
          color: '#7ebbf4',
          // color: '#59B259',
          data: this.fullData?.ftd.map(function (obj: any) {
            return obj.ftd;
          }),
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
        colors: ['#6688F7'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },

      xaxis: {
        show: true,
        categories: this.fullData?.ftd.map(function (obj: any) {
          return obj.date;
        }),
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
    };
  }
  ngDoCheck() {
    console.log('hello ng docheck', this.fullData.top_games);
    let topGameData: PeriodicElement[] = this.fullData?.top_games.slice(0, 5);
    let topDespositData: DepositElement[] = this.fullData?.top_depositors.slice(
      0,
      5
    );
    let paymentGateways: PaymentGateElement[] =
      this.fullData?.payment_gateways.slice(0, 5);

    this.topGamesData = new MatTableDataSource<PeriodicElement>(topGameData);
    this.topDepositorData = new MatTableDataSource<DepositElement>(
      topDespositData
    );
    this.paymentGateways = new MatTableDataSource<PaymentGateElement>(
      paymentGateways
    );
    this.piePoints = this.fullData?.payment_gateways.slice(0, 5);

    // console.log('profitData', this.profitData);
  }
  ngOnChanges() {}
}
export interface PeriodicElement {
  game_name: string;
  provider_game_type: number;
  total_wagered: number;
  total_win: number;
  players_count: number;
}
export interface DepositElement {
  total_deposits: number;
  player_name: string;
  total_withdrawals: any;
  avg_deposits: any;
  Registeredat: any;
}
export interface PaymentGateElement {
  'Success Count': number;
  Name: string;
  'Declined Count': number;
  'Total Success': number;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     'Game Type': 1,
//     'Game Name': 'Hydrogen',
//     'Total Wagered': 1.0079,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
//   {
//     'Game Type': 2,
//     'Game Name': 'Helium',
//     'Total Wagered': 4.0026,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
//   {
//     'Game Type': 3,
//     'Game Name': 'Lithium',
//     'Total Wagered': 6.941,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
//   {
//     'Game Type': 4,
//     'Game Name': 'Beryllium',
//     'Total Wagered': 9.0122,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
//   {
//     'Game Type': 5,
//     'Game Name': 'Boron',
//     'Total Wagered': 10.811,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
//   {
//     'Game Type': 6,
//     'Game Name': 'Carbon',
//     'Total Wagered': 12.0107,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
//   {
//     'Game Type': 7,
//     'Game Name': 'Nitrogen',
//     'Total Wagered': 14.0067,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
//   {
//     'Game Type': 8,
//     'Game Name': 'Oxygen',
//     'Total Wagered': 15.9994,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
//   {
//     'Game Type': 9,
//     'Game Name': 'Fluorine',
//     'Total Wagered': 18.9984,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
//   {
//     'Game Type': 10,
//     'Game Name': 'Neon',
//     'Total Wagered': 20.1797,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
//   {
//     'Game Type': 11,
//     'Game Name': 'Sodium',
//     'Total Wagered': 22.9897,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
//   {
//     'Game Type': 12,
//     'Game Name': 'Magnesium',
//     'Total Wagered': 24.305,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
//   {
//     'Game Type': 13,
//     'Game Name': 'Aluminum',
//     'Total Wagered': 26.9815,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
//   {
//     'Game Type': 14,
//     'Game Name': 'Silicon',
//     'Total Wagered': 28.0855,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
//   {
//     'Game Type': 15,
//     'Game Name': 'Phosphorus',
//     'Total Wagered': 30.9738,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
//   {
//     'Game Type': 16,
//     'Game Name': 'Sulfur',
//     'Total Wagered': 32.065,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
//   {
//     'Game Type': 17,
//     'Game Name': 'Chlorine',
//     'Total Wagered': 35.453,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
//   {
//     'Game Type': 18,
//     'Game Name': 'Argon',
//     'Total Wagered': 39.948,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
//   {
//     'Game Type': 19,
//     'Game Name': 'Potassium',
//     'Total Wagered': 39.0983,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
//   {
//     'Game Type': 20,
//     'Game Name': 'Calcium',
//     'Total Wagered': 40.078,
//     'Total Winnings': 5,
//     'Count of Players': 10,
//   },
// ];
// const ELEMENT_DATA2: DepositElement[] = [
//   {
//     'Total Deposits': 1,
//     'Player Name': 'Hydrogen',
//     'Total Withdraw': 1.0079,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
//   {
//     'Total Deposits': 2,
//     'Player Name': 'Helium',
//     'Total Withdraw': 4.0026,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
//   {
//     'Total Deposits': 3,
//     'Player Name': 'Lithium',
//     'Total Withdraw': 6.941,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
//   {
//     'Total Deposits': 4,
//     'Player Name': 'Beryllium',
//     'Total Withdraw': 9.0122,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
//   {
//     'Total Deposits': 5,
//     'Player Name': 'Boron',
//     'Total Withdraw': 10.811,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
//   {
//     'Total Deposits': 6,
//     'Player Name': 'Carbon',
//     'Total Withdraw': 12.0107,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
//   {
//     'Total Deposits': 7,
//     'Player Name': 'Nitrogen',
//     'Total Withdraw': 14.0067,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
//   {
//     'Total Deposits': 8,
//     'Player Name': 'Oxygen',
//     'Total Withdraw': 15.9994,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
//   {
//     'Total Deposits': 9,
//     'Player Name': 'Fluorine',
//     'Total Withdraw': 18.9984,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
//   {
//     'Total Deposits': 10,
//     'Player Name': 'Neon',
//     'Total Withdraw': 20.1797,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
//   {
//     'Total Deposits': 11,
//     'Player Name': 'Sodium',
//     'Total Withdraw': 22.9897,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
//   {
//     'Total Deposits': 12,
//     'Player Name': 'Magnesium',
//     'Total Withdraw': 24.305,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
//   {
//     'Total Deposits': 13,
//     'Player Name': 'Aluminum',
//     'Total Withdraw': 26.9815,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
//   {
//     'Total Deposits': 14,
//     'Player Name': 'Silicon',
//     'Total Withdraw': 28.0855,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
//   {
//     'Total Deposits': 15,
//     'Player Name': 'Phosphorus',
//     'Total Withdraw': 30.9738,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
//   {
//     'Total Deposits': 16,
//     'Player Name': 'Sulfur',
//     'Total Withdraw': 32.065,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
//   {
//     'Total Deposits': 17,
//     'Player Name': 'Chlorine',
//     'Total Withdraw': 35.453,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
//   {
//     'Total Deposits': 18,
//     'Player Name': 'Argon',
//     'Total Withdraw': 39.948,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
//   {
//     'Total Deposits': 19,
//     'Player Name': 'Potassium',
//     'Total Withdraw': 39.0983,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
//   {
//     'Total Deposits': 20,
//     'Player Name': 'Calcium',
//     'Total Withdraw': 40.078,
//     'Avg Data': 5,
//     'Reg Data': 10,
//   },
// ];
const ELEMENT_DATA3: PaymentGateElement[] = [
  {
    'Success Count': 1,
    Name: 'Hydrogen',

    'Declined Count': 5,
    'Total Success': 10,
  },
  {
    'Success Count': 2,
    Name: 'Helium',

    'Declined Count': 5,
    'Total Success': 10,
  },
  {
    'Success Count': 3,
    Name: 'Lithium',
    'Declined Count': 5,
    'Total Success': 10,
  },
  {
    'Success Count': 4,
    Name: 'Beryllium',

    'Declined Count': 5,
    'Total Success': 10,
  },
  {
    'Success Count': 5,
    Name: 'Boron',

    'Declined Count': 5,
    'Total Success': 10,
  },
  {
    'Success Count': 6,
    Name: 'Carbon',

    'Declined Count': 5,
    'Total Success': 10,
  },
  {
    'Success Count': 7,
    Name: 'Nitrogen',

    'Declined Count': 5,
    'Total Success': 10,
  },
  {
    'Success Count': 8,
    Name: 'Oxygen',

    'Declined Count': 5,
    'Total Success': 10,
  },
  {
    'Success Count': 9,
    Name: 'Fluorine',

    'Declined Count': 5,
    'Total Success': 10,
  },
  {
    'Success Count': 10,
    Name: 'Neon',

    'Declined Count': 5,
    'Total Success': 10,
  },
  {
    'Success Count': 11,
    Name: 'Sodium',

    'Declined Count': 5,
    'Total Success': 10,
  },
  {
    'Success Count': 12,
    Name: 'Magnesium',

    'Declined Count': 5,
    'Total Success': 10,
  },
  {
    'Success Count': 13,
    Name: 'Aluminum',

    'Declined Count': 5,
    'Total Success': 10,
  },
  {
    'Success Count': 14,
    Name: 'Silicon',

    'Declined Count': 5,
    'Total Success': 10,
  },
  {
    'Success Count': 15,
    Name: 'Phosphorus',

    'Declined Count': 5,
    'Total Success': 10,
  },
  {
    'Success Count': 16,
    Name: 'Sulfur',

    'Declined Count': 5,
    'Total Success': 10,
  },
  {
    'Success Count': 17,
    Name: 'Chlorine',

    'Declined Count': 5,
    'Total Success': 10,
  },
  {
    'Success Count': 18,
    Name: 'Argon',

    'Declined Count': 5,
    'Total Success': 10,
  },
  {
    'Success Count': 19,
    Name: 'Potassium',

    'Declined Count': 5,
    'Total Success': 10,
  },
  {
    'Success Count': 20,
    Name: 'Calcium',

    'Declined Count': 5,
    'Total Success': 10,
  },
];
