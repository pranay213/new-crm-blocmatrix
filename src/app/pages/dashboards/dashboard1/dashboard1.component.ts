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
  constructor(
    private apiService: ApiService,
    private allApiService: AllApiService
  ) {}
  profitvalue: any;
  ggrvalue: any;
  liveValue: any;
  depositValue: any;
  ftdvalue: any;
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

  genralData: any;
  conpareData: any;
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
      // this.ggrData = this.fullData?.profit_ggr;Fc
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
    this.selected = value;
    if (value == 'compare') {
      let compare = 'PLALYER-COMPARE';
      this.newPlayerDatafn('TODAY', 'PLAYERS-COMPARE');
    }
    if (value == 'data') {
      let compare = 'PLALYER-COMPARE';
      this.newPlayerDatafn('TODAY', 'PLALYERS');
    }

    console.log('this.selected', this.selected);
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

  getData() {
    try {
      this.apiService.getDashboardData().subscribe((res: any) => {
        this.fullData = res.data;

        this.top_depositors = res.data.top_depositors;
        this.genralData = res.data.general_data;

        this.profitData = res.data?.profit_ggr;
        this.profitvalue = res.data.profit_ggr?.[0].profit || 0;

        this.ggrvalue = res.data.profit_ggr?.[0].ggr || 0;
        this.liveValue = res.data.live_players?.[0].live_players || 0;
        this.depositValue = res.data.deposits?.[0].deposits || 0;
        this.ftdvalue = res.data.ftd?.[0].ftd || 0;

        // this.profitvalue =
        //   (this.profitData?.profit.length > 0 && this.profitData?.profit[0]) || 0;
        this.profitPercentage =
          (
            ((this.profitData[0].profit -
              this.profitData[this.profitData.length - 1].profit) *
              100) /
            (this.profitData[this.profitData.length - 1].profit === 0
              ? 1
              : this.profitData[this.profitData.length - 1].profit)
          ).toFixed(1) || 0;

        this.ggrData = res.data.profit_ggr;
        // this.ggrvalue = this.ggrData?.ggr.length > 0 && this.ggrData?.ggr[0];

        this.ggrPercentage = (
          ((this.ggrData[0].ggr - this.ggrData[this.ggrData.length - 1].ggr) *
            100) /
          (this.ggrData[this.ggrData.length - 1].ggr === 0
            ? 1
            : this.ggrData[this.ggrData.length - 1].ggr)
        ).toFixed(1);

        this.playersData = res.data.live_players;

        // this.liveValue =
        //   this.playersData?.live_players.length > 0 && this.playersData?.ggr[0];

        this.playersPercentage = (
          ((this.playersData[0].live_players -
            this.playersData[this.playersData.length - 1].live_players) *
            100) /
          (this.playersData[this.playersData.length - 1].live_players === 0
            ? 1
            : this.playersData[this.playersData.length - 1].live_players)
        ).toFixed(1);

        this.despositorData = res.data.deposits;
        this.depositValue = res.data.deposits?.[0].deposits || 0;

        this.despositPercentage =
          (
            ((this.despositorData[0].deposits -
              this.despositorData[this.despositorData.length - 1].deposits) *
              100) /
            (this.despositorData[this.despositorData.length - 1].deposits === 0
              ? 1
              : this.despositorData[this.despositorData.length - 1].deposits)
          ).toFixed(1) || 0;

        this.ftdsData = res.data.ftd;

        this.ftdvalue = res.data.ftd?.[0].ftd || 0;
        this.ftdsPercentage =
          (
            ((this.ftdsData[0].ftd -
              this.ftdsData[this.ftdsData.length - 1].ftd) *
              100) /
            (this.ftdsData[this.ftdsData.length - 1].ftd === 0
              ? 1
              : this.ftdsData[this.ftdsData.length - 1].ftd)
          ).toFixed(1) || 0;
        if (isNaN(this.ftdsPercentage)) {
          this.ftdsPercentage = 0;
        }

        this.profitPoints = {
          series: [
            {
              name: ['Profit'],
              // color: this.newitem?.color,
              color: '#7ebbf4',
              // color: '#59B259',
              data: [
                0,
                ...res.data?.profit_ggr.map(function (obj: any) {
                  return obj.profit;
                }),
                0,
              ],
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
            categories: [
              0,
              ...res.data?.profit_ggr.map(function (obj: any) {
                return obj.date;
              }),
              0,
            ],
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
              data: [
                0,
                ...res.data.profit_ggr.map(function (obj: any) {
                  return obj.ggr;
                }),
                0,
              ],
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
            categories: [
              0,
              ...res.data.profit_ggr.map(function (obj: any) {
                return obj.date;
              }),
              0,
            ],
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

        let points = res.data?.payment_gateways.slice(0, 5);
        if (points && points.length > 0) {
          let series = points.map(function (obj: any) {
            return Number(obj.count);
          });
          let labels = points.map(function (obj: any) {
            return obj.payment_gateway;
          });

          this.piePoints = {
            series: series,
            labels: labels,
          };
        } else {
          this.piePoints = {
            series: [],
            labels: [],
          };
        }
      });
    } catch (err: any) {
      console.log('err', err);
    }
  }

  upDateData(arg1: any, arg2: any) {
    try {
      this.apiService.getData(arg2, arg1).subscribe((res: any) => {
        this.fullData = { ...this.fullData, ...res.data };
        if (arg1 == 'PSP') {
          let points = this.fullData?.payment_gateways.slice(0, 5);
          if (points && points.length > 0) {
            let series = points.map(function (obj: any) {
              return Number(obj.count);
            });
            let labels = points.map(function (obj: any) {
              return obj.payment_gateway;
            });

            this.piePoints = {
              series: series,
              labels: labels,
            };
          } else {
            this.piePoints = {
              series: [],
              labels: [],
            };
          }
        }
      });
    } catch (err) {
      console.log('err', err);
    }
  }

  updateSelectionData(param1: any, param2: any) {
    try {
      this.apiService.getData(param1, param2).subscribe((res: any) => {
        // this.fullData = { ...this.fullData, ...res.data };
        let data = res.data;
        if (param2 === 'PROFIT') {
          this.profitData = data?.profit_ggr;
          this.profitvalue = res.data.profit_ggr?.[0].profit || 0;

          this.profitPercentage =
            (
              ((this.profitData[0].profit -
                this.profitData[this.profitData.length - 1].profit) *
                100) /
              (this.profitData[this.profitData.length - 1].profit === 0
                ? 1
                : this.profitData[this.profitData.length - 1].profit)
            ).toFixed(2) || 0;
          this.profitPoints = {
            series: [
              {
                name: 'Profit',
                // color: this.newitem?.color,
                color: '#7ebbf4',
                // color: '#59B259',
                data: [
                  0,
                  ...res.data?.profit_ggr.map(function (obj: any) {
                    return obj.profit;
                  }),
                  0,
                ],
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
              categories: [
                0,
                ...res.data?.profit_ggr.map(function (obj: any) {
                  return obj.date;
                }),
                0,
              ],
            },
            tooltip: {
              theme: 'dark',
              fillSeriesColor: false,
            },
          };
        }
        if (param2 === 'GGR') {
          this.ggrData = res.data?.profit_ggr;
          this.ggrvalue = res.data.profit_ggr?.[0].ggr || 0;

          this.ggrPercentage =
            (
              ((this.ggrData[0].ggr -
                this.ggrData[this.ggrData.length - 1].ggr) *
                100) /
              (this.ggrData[this.ggrData.length - 1].ggr === 0
                ? 1
                : this.ggrData[this.ggrData.length - 1].ggr)
            ).toFixed(1) || 0;

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
          this.liveValue = res.data.live_players?.[0].live_players || 0;

          this.playersPercentage =
            (
              ((this.playersData[0].live_players -
                this.playersData[this.playersData.length - 1].live_players) *
                100) /
              (this.playersData[this.playersData.length - 1].live_players === 0
                ? 1
                : this.playersData[this.playersData.length - 1].live_players)
            ).toFixed(1) || 0;

          this.livePlayerPoints = {
            series: [
              {
                name: 'Live Players',
                // color: this.newitem?.color,
                color: '#7ebbf4',
                // color: '#59B259',
                data: [
                  0,
                  ...res.data?.live_players.map(function (obj: any) {
                    return obj.live_players;
                  }),
                  0,
                ],
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
              categories: [
                0,
                ...res.data?.live_players.map(function (obj: any) {
                  return obj.date;
                }),
                0,
              ],
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
                  data: [
                    1,
                    ...res.data?.deposits.map(function (obj: any) {
                      return obj.deposits;
                    }),
                    1,
                  ],
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
                categories: [
                  0,
                  ...res.data?.deposits.map(function (obj: any) {
                    return obj.date;
                  }),
                  0,
                ],
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
          this.depositValue = res.data.deposits?.[0].deposits || 0;
          this.despositPercentage =
            (
              ((this.despositorData[0].deposits -
                this.despositorData[this.despositorData.length - 1].deposits) *
                100) /
              (this.despositorData[this.despositorData.length - 1].deposits ===
              0
                ? 1
                : this.despositorData[this.despositorData.length - 1].deposits)
            ).toFixed(1) || 0;
          this.depositsPoints = {
            series: [
              {
                name: 'Deposits',
                // color: this.newitem?.color,
                color: '#7ebbf4',
                // color: '#59B259',
                data: [
                  0,
                  ...res.data?.deposits.map(function (obj: any) {
                    return obj.deposits;
                  }),
                  0,
                ],
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
              categories: [
                0,
                ...res.data?.deposits.map(function (obj: any) {
                  return obj.date;
                }),
                0,
              ],
            },
            tooltip: {
              theme: 'dark',
              fillSeriesColor: false,
            },
          };
        }
        if (param2 === 'FTD') {
          this.ftdsData = res.data.ftd;

          this.ftdvalue = res.data.ftd?.[0].ftd || 0;
          this.ftdsPercentage =
            (
              ((this.ftdsData[0].ftd -
                this.ftdsData[this.ftdsData.length - 1].ftd) *
                100) /
              (this.ftdsData[this.ftdsData.length - 1].ftd === 0
                ? 1
                : this.ftdsData[this.ftdsData.length - 1].ftd)
            ).toFixed(1) || 0;
          if (isNaN(this.ftdsPercentage)) this.ftdsPercentage = 0;
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
    } catch (err) {
      console.log('err', err);
    }
    // this.ngOnInit();
  }
  newPlayerDatafn(arg1: any, arg2: any): any {
    try {
      this.apiService.getData(arg1, arg2).subscribe((res: any) => {
        if (this.selected === 'data') this.genralData = res.data.general_data;
        else this.conpareData = res.data?.comparison;
      });
    } catch (err) {
      console.log('err', err);
    }
  }

  callbackfn = (value: any): void => {
    console.log('Function invoked 2', value);
    let playervalue;
    if (this.selected === 'data') {
      playervalue = 'PLAYERS';
    }
    if (this.selected === 'compare') {
      playervalue = 'PLAYERS-COMPARE';
    }
    this.newPlayerDatafn(value.toUpperCase().replace(' ', '-'), playervalue);
  };
  ngOnInit() {
    this.getData();
  }
  ngDoCheck() {
    // console.log('hello ng docheck', this.fullData.top_games);
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

    // console.log('profitData', this.profitData);
  }
  ngOnChanges(changes: SimpleChanges) {
    // console.log('changes;-----', changes);
  }
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
