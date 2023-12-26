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
import { CommonModule, NgIf } from '@angular/common';
import { PlayerscompareComponent } from 'src/app/components/playerscompare/playerscompare.component';
import { CardsNewComponent } from 'src/app/components/cards-new/cards-new.component';
import { DataTablesComponent } from 'src/app/data-tables/data-tables.component';
import { AppDynamicTableComponent } from '../../tables/dynamic-table/dynamic-table.component';
import { MatTableDataSource } from '@angular/material/table';
import { AppBasicTableComponent } from '../../tables/basic-table/basic-table.component';

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
  ],
  templateUrl: './dashboard1.component.html',
})
export class AppDashboard1Component implements OnInit {
  displayedColumns: string[] = [
    'Game Name',
    'Game Type',
    'Total Wagered',
    'Total Winnings',
    'Count of Players',
  ];
  displayedColumns2: string[] = [
    'Player Name',
    'Total Deposits',
    'Total Withdraw',
    'Avg Data',
    'Reg Data',
  ];
  displayedColumns3: string[] = [
    'Name',
    'Success Count',
    'Declined Count',
    'Total Success',
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
  topGamesData = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  topDepositorData = new MatTableDataSource<DepositElement>(ELEMENT_DATA2);
  paymentGateways = new MatTableDataSource<PaymentGateElement>(ELEMENT_DATA3);
  piePoints = ELEMENT_DATA3;
  elementGameData = ELEMENT_DATA;
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
  constructor() {}
  ngOnInit() {
    this.cardslist = [
      {
        name: 'Profit',
        color: '#ECF2FF',
        value: this.randomIntNumber(1, 100),
        dataPoints: this.randomIntFromInterval(1, 100),
        todayPoints: [...Array(24)].map((_, i) => this.randomIntNumber(1, 100)),
        yesterdayPoints: [...Array(24)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        thisweekPoints: [...Array(7)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        lastweekPoints: [...Array(7)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        thismonthPoints: [...Array(30)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        lastmonthPoints: [...Array(30)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
      },
      {
        name: 'GGR',
        color: '#fff',
        // value: '20',
        value: this.randomIntNumber(1, 100),
        // dataPoints: [2, 5, 6, 10, 50, 40],
        dataPoints: this.randomIntFromInterval(1, 100),
        todayPoints: [...Array(24)].map((_, i) => this.randomIntNumber(1, 100)),
        yesterdayPoints: [...Array(24)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        thisweekPoints: [...Array(7)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        lastweekPoints: [...Array(7)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        thismonthPoints: [...Array(30)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        lastmonthPoints: [...Array(30)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
      },
      {
        name: 'Live Players',
        color: '#ECF2FF',
        // value: '25',
        value: this.randomIntNumber(1, 100),
        // dataPoints: [1, 20, 3, 10, 50, 40],
        dataPoints: this.randomIntFromInterval(1, 100),
        todayPoints: [...Array(24)].map((_, i) => this.randomIntNumber(1, 100)),
        yesterdayPoints: [...Array(24)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        thisweekPoints: [...Array(7)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        lastweekPoints: [...Array(7)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        thismonthPoints: [...Array(30)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        lastmonthPoints: [...Array(30)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
      },
      {
        name: 'Deposits',
        color: '#fff',
        // value: '15',
        value: this.randomIntNumber(1, 100),
        // dataPoints: [6, 20, 4, 10, 8, 40],
        dataPoints: this.randomIntFromInterval(1, 100),
        todayPoints: [...Array(24)].map((_, i) => this.randomIntNumber(1, 100)),
        yesterdayPoints: [...Array(24)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        thisweekPoints: [...Array(7)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        lastweekPoints: [...Array(7)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        thismonthPoints: [...Array(30)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        lastmonthPoints: [...Array(30)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
      },
      {
        name: 'FTDS',
        color: '#ECF2FF',
        // value: '5',
        value: this.randomIntNumber(1, 100),
        // dataPoints: [180, 20, 25, 10, 50, 9],
        dataPoints: this.randomIntFromInterval(1, 100),
        todayPoints: [...Array(24)].map((_, i) => this.randomIntNumber(1, 100)),
        yesterdayPoints: [...Array(24)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        thisweekPoints: [...Array(7)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        lastweekPoints: [...Array(7)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        thismonthPoints: [...Array(30)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
        lastmonthPoints: [...Array(30)].map((_, i) =>
          this.randomIntNumber(1, 100)
        ),
      },
      // {
      //   name: 'Withdrawals',
      //   color: '#ECF2FF',
      //   // value: '5',
      //   value: this.randomIntNumber(1, 100),
      //   // dataPoints: [180, 20, 25, 10, 50, 9],
      //   dataPoints: this.randomIntFromInterval(1, 100),
      //   todayPoints: [...Array(24)].map((_, i) => this.randomIntNumber(1, 100)),
      //   yesterdayPoints: [...Array(24)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   thisweekPoints: [...Array(7)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   lastweekPoints: [...Array(7)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   thismonthPoints: [...Array(30)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   lastmonthPoints: [...Array(30)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      // },
      // },
      // {
      //   name: 'Live Players',
      //   color: '##fff',
      //   // value: '6',
      //   value: this.randomIntNumber(1, 100),
      //   // dataPoints: [10, 20, 30, 10, 50, 40],
      //   dataPoints: this.randomIntFromInterval(1, 100),
      //   todayPoints: [...Array(24)].map((_, i) => this.randomIntNumber(1, 100)),
      //   yesterdayPoints: [...Array(24)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   thisweekPoints: [...Array(7)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   lastweekPoints: [...Array(7)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   thismonthPoints: [...Array(30)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   lastmonthPoints: [...Array(30)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      // },
      // {
      //   name: 'New Players',
      //   color: '#ECF2FF',
      //   // value: '78',
      //   value: this.randomIntNumber(1, 100),
      //   // dataPoints: [10, 20, 30, 10, 50, 40],
      //   dataPoints: this.randomIntFromInterval(1, 100),
      //   todayPoints: [...Array(24)].map((_, i) => this.randomIntNumber(1, 100)),
      //   yesterdayPoints: [...Array(24)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   thisweekPoints: [...Array(7)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   lastweekPoints: [...Array(7)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   thismonthPoints: [...Array(30)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   lastmonthPoints: [...Array(30)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      // },
      // {
      //   name: 'Recurring Players',
      //   color: '#fff',
      //   // value: '200',
      //   value: this.randomIntNumber(1, 100),
      //   // dataPoints: [10, 20, 30, 10, 50, 40],
      //   dataPoints: this.randomIntFromInterval(1, 100),
      //   todayPoints: [...Array(24)].map((_, i) => this.randomIntNumber(1, 100)),
      //   yesterdayPoints: [...Array(24)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   thisweekPoints: [...Array(7)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   lastweekPoints: [...Array(7)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   thismonthPoints: [...Array(30)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   lastmonthPoints: [...Array(30)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      // },
      // {
      //   name: 'Affiliate Count',
      //   color: '#ECF2FF',
      //   // value: '700',
      //   value: this.randomIntNumber(1, 100),
      //   // dataPoints: [10, 20, 30, 10, 50, 40],
      //   dataPoints: this.randomIntFromInterval(1, 100),
      //   todayPoints: [...Array(24)].map((_, i) => this.randomIntNumber(1, 100)),
      //   yesterdayPoints: [...Array(24)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   thisweekPoints: [...Array(7)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   lastweekPoints: [...Array(7)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   thismonthPoints: [...Array(30)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   lastmonthPoints: [...Array(30)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      // },
      // {
      //   name: 'Total Players',
      //   color: '##fff',
      //   // value: '800',
      //   value: this.randomIntNumber(1, 100),
      //   // dataPoints: [10, 20, 30, 10, 50, 40],
      //   dataPoints: this.randomIntFromInterval(1, 100),
      //   todayPoints: [...Array(24)].map((_, i) => this.randomIntNumber(1, 100)),
      //   yesterdayPoints: [...Array(24)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   thisweekPoints: [...Array(7)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   lastweekPoints: [...Array(7)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   thismonthPoints: [...Array(30)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      //   lastmonthPoints: [...Array(30)].map((_, i) =>
      //     this.randomIntNumber(1, 100)
      //   ),
      // },
    ];
  }
}
export interface PeriodicElement {
  'Game Name': string;
  'Game Type': number;
  'Total Wagered': number;
  'Total Winnings': number;
  'Count of Players': number;
}
export interface DepositElement {
  'Total Deposits': number;
  'Player Name': string;
  'Total Withdraw': number;
  'Avg Data': number;
  'Reg Data': number;
}
export interface PaymentGateElement {
  'Success Count': number;
  Name: string;
  'Declined Count': number;
  'Total Success': number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    'Game Type': 1,
    'Game Name': 'Hydrogen',
    'Total Wagered': 1.0079,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
  {
    'Game Type': 2,
    'Game Name': 'Helium',
    'Total Wagered': 4.0026,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
  {
    'Game Type': 3,
    'Game Name': 'Lithium',
    'Total Wagered': 6.941,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
  {
    'Game Type': 4,
    'Game Name': 'Beryllium',
    'Total Wagered': 9.0122,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
  {
    'Game Type': 5,
    'Game Name': 'Boron',
    'Total Wagered': 10.811,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
  {
    'Game Type': 6,
    'Game Name': 'Carbon',
    'Total Wagered': 12.0107,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
  {
    'Game Type': 7,
    'Game Name': 'Nitrogen',
    'Total Wagered': 14.0067,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
  {
    'Game Type': 8,
    'Game Name': 'Oxygen',
    'Total Wagered': 15.9994,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
  {
    'Game Type': 9,
    'Game Name': 'Fluorine',
    'Total Wagered': 18.9984,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
  {
    'Game Type': 10,
    'Game Name': 'Neon',
    'Total Wagered': 20.1797,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
  {
    'Game Type': 11,
    'Game Name': 'Sodium',
    'Total Wagered': 22.9897,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
  {
    'Game Type': 12,
    'Game Name': 'Magnesium',
    'Total Wagered': 24.305,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
  {
    'Game Type': 13,
    'Game Name': 'Aluminum',
    'Total Wagered': 26.9815,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
  {
    'Game Type': 14,
    'Game Name': 'Silicon',
    'Total Wagered': 28.0855,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
  {
    'Game Type': 15,
    'Game Name': 'Phosphorus',
    'Total Wagered': 30.9738,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
  {
    'Game Type': 16,
    'Game Name': 'Sulfur',
    'Total Wagered': 32.065,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
  {
    'Game Type': 17,
    'Game Name': 'Chlorine',
    'Total Wagered': 35.453,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
  {
    'Game Type': 18,
    'Game Name': 'Argon',
    'Total Wagered': 39.948,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
  {
    'Game Type': 19,
    'Game Name': 'Potassium',
    'Total Wagered': 39.0983,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
  {
    'Game Type': 20,
    'Game Name': 'Calcium',
    'Total Wagered': 40.078,
    'Total Winnings': 5,
    'Count of Players': 10,
  },
];
const ELEMENT_DATA2: DepositElement[] = [
  {
    'Total Deposits': 1,
    'Player Name': 'Hydrogen',
    'Total Withdraw': 1.0079,
    'Avg Data': 5,
    'Reg Data': 10,
  },
  {
    'Total Deposits': 2,
    'Player Name': 'Helium',
    'Total Withdraw': 4.0026,
    'Avg Data': 5,
    'Reg Data': 10,
  },
  {
    'Total Deposits': 3,
    'Player Name': 'Lithium',
    'Total Withdraw': 6.941,
    'Avg Data': 5,
    'Reg Data': 10,
  },
  {
    'Total Deposits': 4,
    'Player Name': 'Beryllium',
    'Total Withdraw': 9.0122,
    'Avg Data': 5,
    'Reg Data': 10,
  },
  {
    'Total Deposits': 5,
    'Player Name': 'Boron',
    'Total Withdraw': 10.811,
    'Avg Data': 5,
    'Reg Data': 10,
  },
  {
    'Total Deposits': 6,
    'Player Name': 'Carbon',
    'Total Withdraw': 12.0107,
    'Avg Data': 5,
    'Reg Data': 10,
  },
  {
    'Total Deposits': 7,
    'Player Name': 'Nitrogen',
    'Total Withdraw': 14.0067,
    'Avg Data': 5,
    'Reg Data': 10,
  },
  {
    'Total Deposits': 8,
    'Player Name': 'Oxygen',
    'Total Withdraw': 15.9994,
    'Avg Data': 5,
    'Reg Data': 10,
  },
  {
    'Total Deposits': 9,
    'Player Name': 'Fluorine',
    'Total Withdraw': 18.9984,
    'Avg Data': 5,
    'Reg Data': 10,
  },
  {
    'Total Deposits': 10,
    'Player Name': 'Neon',
    'Total Withdraw': 20.1797,
    'Avg Data': 5,
    'Reg Data': 10,
  },
  {
    'Total Deposits': 11,
    'Player Name': 'Sodium',
    'Total Withdraw': 22.9897,
    'Avg Data': 5,
    'Reg Data': 10,
  },
  {
    'Total Deposits': 12,
    'Player Name': 'Magnesium',
    'Total Withdraw': 24.305,
    'Avg Data': 5,
    'Reg Data': 10,
  },
  {
    'Total Deposits': 13,
    'Player Name': 'Aluminum',
    'Total Withdraw': 26.9815,
    'Avg Data': 5,
    'Reg Data': 10,
  },
  {
    'Total Deposits': 14,
    'Player Name': 'Silicon',
    'Total Withdraw': 28.0855,
    'Avg Data': 5,
    'Reg Data': 10,
  },
  {
    'Total Deposits': 15,
    'Player Name': 'Phosphorus',
    'Total Withdraw': 30.9738,
    'Avg Data': 5,
    'Reg Data': 10,
  },
  {
    'Total Deposits': 16,
    'Player Name': 'Sulfur',
    'Total Withdraw': 32.065,
    'Avg Data': 5,
    'Reg Data': 10,
  },
  {
    'Total Deposits': 17,
    'Player Name': 'Chlorine',
    'Total Withdraw': 35.453,
    'Avg Data': 5,
    'Reg Data': 10,
  },
  {
    'Total Deposits': 18,
    'Player Name': 'Argon',
    'Total Withdraw': 39.948,
    'Avg Data': 5,
    'Reg Data': 10,
  },
  {
    'Total Deposits': 19,
    'Player Name': 'Potassium',
    'Total Withdraw': 39.0983,
    'Avg Data': 5,
    'Reg Data': 10,
  },
  {
    'Total Deposits': 20,
    'Player Name': 'Calcium',
    'Total Withdraw': 40.078,
    'Avg Data': 5,
    'Reg Data': 10,
  },
];
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
