import { Component, OnInit } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { PlayerscompareComponent } from 'src/app/components/playerscompare/playerscompare.component';

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
  ],
  templateUrl: './dashboard1.component.html',
})
export class AppDashboard1Component implements OnInit {
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

  constructor() {}
  ngOnInit() {
    this.cardslist = [
      {
        name: 'Profit',
        color: '#ECF2FF',
        value: this.randomIntNumber(1, 100),
        // dataPoints: [10, 20, 30, 10, 50, 40],
        dataPoints: this.randomIntFromInterval(1, 100),
        todayPoints: this.randomIntFromInterval(1, 100),
        yesterdayPoints: this.randomIntFromInterval(1, 100),
        lastweekPoints: this.randomIntFromInterval(1, 100),
        lastmonthPoints: this.randomIntFromInterval(1, 100),
      },
      {
        name: 'GGR',
        color: '#fff',
        // value: '20',
        value: this.randomIntNumber(1, 100),
        // dataPoints: [2, 5, 6, 10, 50, 40],
        dataPoints: this.randomIntFromInterval(1, 100),
        todayPoints: this.randomIntFromInterval(1, 100),
        yesterdayPoints: this.randomIntFromInterval(1, 100),
        lastweekPoints: this.randomIntFromInterval(1, 100),
        lastmonthPoints: this.randomIntFromInterval(1, 100),
      },
      {
        name: 'Deposits',
        color: '#ECF2FF',
        // value: '25',
        value: this.randomIntNumber(1, 100),
        // dataPoints: [1, 20, 3, 10, 50, 40],
        dataPoints: this.randomIntFromInterval(1, 100),
        todayPoints: this.randomIntFromInterval(1, 100),
        yesterdayPoints: this.randomIntFromInterval(1, 100),
        lastweekPoints: this.randomIntFromInterval(1, 100),
        lastmonthPoints: this.randomIntFromInterval(1, 100),
      },
      {
        name: 'Withdrawal',
        color: '#fff',
        // value: '15',
        value: this.randomIntNumber(1, 100),
        // dataPoints: [6, 20, 4, 10, 8, 40],
        dataPoints: this.randomIntFromInterval(1, 100),
        todayPoints: this.randomIntFromInterval(1, 100),
        yesterdayPoints: this.randomIntFromInterval(1, 100),
        lastweekPoints: this.randomIntFromInterval(1, 100),
        lastmonthPoints: this.randomIntFromInterval(1, 100),
      },
      {
        name: 'FTDS',
        color: '#ECF2FF',
        // value: '5',
        value: this.randomIntNumber(1, 100),
        // dataPoints: [180, 20, 25, 10, 50, 9],
        dataPoints: this.randomIntFromInterval(1, 100),
        todayPoints: this.randomIntFromInterval(1, 100),
        yesterdayPoints: this.randomIntFromInterval(1, 100),
        lastweekPoints: this.randomIntFromInterval(1, 100),
        lastmonthPoints: this.randomIntFromInterval(1, 100),
      },
      {
        name: 'Live Players',
        color: '##fff',
        // value: '6',
        value: this.randomIntNumber(1, 100),
        // dataPoints: [10, 20, 30, 10, 50, 40],
        dataPoints: this.randomIntFromInterval(1, 100),
        todayPoints: this.randomIntFromInterval(1, 100),
        yesterdayPoints: this.randomIntFromInterval(1, 100),
        lastweekPoints: this.randomIntFromInterval(1, 100),
        lastmonthPoints: this.randomIntFromInterval(1, 100),
      },
      {
        name: 'New Players',
        color: '#ECF2FF',
        // value: '78',
        value: this.randomIntNumber(1, 100),
        // dataPoints: [10, 20, 30, 10, 50, 40],
        dataPoints: this.randomIntFromInterval(1, 100),
        todayPoints: this.randomIntFromInterval(1, 100),
        yesterdayPoints: this.randomIntFromInterval(1, 100),
        lastweekPoints: this.randomIntFromInterval(1, 100),
        lastmonthPoints: this.randomIntFromInterval(1, 100),
      },
      {
        name: 'Recurring Players',
        color: '#fff',
        // value: '200',
        value: this.randomIntNumber(1, 100),
        // dataPoints: [10, 20, 30, 10, 50, 40],
        dataPoints: this.randomIntFromInterval(1, 100),
        todayPoints: this.randomIntFromInterval(1, 100),
        yesterdayPoints: this.randomIntFromInterval(1, 100),
        lastweekPoints: this.randomIntFromInterval(1, 100),
        lastmonthPoints: this.randomIntFromInterval(1, 100),
      },
      {
        name: 'Affiliate Count',
        color: '#ECF2FF',
        // value: '700',
        value: this.randomIntNumber(1, 100),
        // dataPoints: [10, 20, 30, 10, 50, 40],
        dataPoints: this.randomIntFromInterval(1, 100),
        todayPoints: this.randomIntFromInterval(1, 100),
        yesterdayPoints: this.randomIntFromInterval(1, 100),
        lastweekPoints: this.randomIntFromInterval(1, 100),
        lastmonthPoints: this.randomIntFromInterval(1, 100),
      },
      {
        name: 'Total Players',
        color: '##fff',
        // value: '800',
        value: this.randomIntNumber(1, 100),
        // dataPoints: [10, 20, 30, 10, 50, 40],
        dataPoints: this.randomIntFromInterval(1, 100),
        todayPoints: this.randomIntFromInterval(1, 100),
        yesterdayPoints: this.randomIntFromInterval(1, 100),
        lastweekPoints: this.randomIntFromInterval(1, 100),
        lastmonthPoints: this.randomIntFromInterval(1, 100),
      },
    ];
  }
}
