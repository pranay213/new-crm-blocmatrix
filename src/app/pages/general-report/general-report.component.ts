import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarModule } from 'angular-calendar';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ExcelService } from 'src/app/excel.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  standalone: true,
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrls: ['./general-report.component.scss'],
  imports: [
    TableModule,
    NgFor,
    TabViewModule,
    CardModule,
    NgIf,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule,
    CommonModule,
    ButtonModule,
    TablerIconsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    CalendarModule,
    DialogModule,
    MatCheckboxModule,
    ProgressSpinnerModule,
  ],
})
export class GeneralReportComponent implements OnInit {
  reportData: any;
  startDate: any;
  endDate: any;
  period: any;
  showDialog: boolean = false;
  datamessage: string = '';
  radioModel: string = 'Day';
  currency: string = 'EUR';
  totalProfit: any;
  totalBets: any;
  totalWins: any;
  totalProcessing: any;
  totalRoyalties: any;
  totalBonus: any;
  totalDeposits: any;
  totalWithdrawRequest: any;
  totalWithdrawComplete: any;
  totalBalance: any;
  totalRefunds: any;
  totalChargeback: any;
  totalNetGamingRevenue: any;
  totalGrossGamingRevenue: any;
  totalSignups: any;
  totalFirstTimeDepositos: any;
  onRowSelect = (transaction: any) => {
    this.route.navigate(['/brm/tx/', transaction.hash]);
  };

  cols: any = [
    { header: 'Period', field: 'date' },
    { header: 'Deposits', field: 'deposits' },
    { header: 'WD Request', field: 'withdraw_request' },
    { header: 'WD Complete', field: 'withdraw_complete' },
    { header: 'Refunds', field: 'refunds' },
    { header: 'CHB', field: 'chargeback' },
    { header: 'Bets', field: 'bets' },
    { header: 'Wins', field: 'wins' },
    { header: 'Bonus', field: 'bonus' },
    { header: 'NGR', field: 'net_gaming_revenue' },
    { header: 'GGR', field: 'gross_gaming_revenue' },
    { header: 'Royalties', field: 'royalties' },
    { header: 'Signups', field: 'signups' },
    { header: 'FTD', field: 'first_time_depositors' },
    { header: 'Processing', field: 'processing_fee' },
    { header: 'Profit', field: 'profit' },
  ];

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private excelService: ExcelService,
    private route: Router
  ) {}

  ngOnInit() {
    // Timezone List URL : https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
    let startTempDate = new Date();
    let startTempDateGMT = this.changeTimezone(startTempDate, 'Etc/GMT');

    let endTempDate = new Date();
    let endTempDateGMT = this.changeTimezone(endTempDate, 'Etc/GMT');

    let endDate = (this.endDate = this.datePipe.transform(
      endTempDateGMT.setDate(endTempDateGMT.getDate()),
      'yyyy-MM-dd'
    ));

    this.startDate = this.datePipe.transform(
      startTempDateGMT.setDate(startTempDateGMT.getDate() - 1),
      'yyyy-MM-dd'
    );
    this.endDate = this.datePipe.transform(
      endTempDateGMT.setDate(endTempDateGMT.getDate() - 1),
      'yyyy-MM-dd'
    );
    this.period = 'DAILY';

    this.callReportApi(this.startDate, endDate, this.period);
  }

  changeTimezone(date: any, ianatz: any) {
    // suppose the date is 12:00 UTC
    var invdate = new Date(date.toLocaleString('en-US', { timeZone: ianatz }));

    // then invdate will be 07:00 in Toronto
    // and the diff is 5 hours
    var diff = date.getTime() - invdate.getTime();

    // so 12:00 in Toronto is 17:00 UTC
    return new Date(date.getTime() - diff);
  }

  showFilter() {
    this.datamessage = '';
    this.showDialog = true;
  }

  applyFilter() {
    if (typeof this.startDate == 'object') {
      this.startDate = this.datePipe.transform(
        this.startDate.setDate(this.startDate.getDate()),
        'yyyy-MM-dd'
      );
    }
    if (typeof this.endDate == 'object') {
      this.endDate = this.datePipe.transform(
        this.endDate.setDate(this.endDate.getDate()),
        'yyyy-MM-dd'
      );
    }
    this.callReportApi(this.startDate, this.endDate, this.period);
    this.showDialog = false;
  }

  dayRange(period: any) {
    if (typeof this.startDate == 'object') {
      this.startDate = this.datePipe.transform(
        this.startDate.setDate(this.startDate.getDate()),
        'yyyy-MM-dd'
      );
    }
    if (typeof this.endDate == 'object') {
      this.endDate = this.datePipe.transform(
        this.endDate.setDate(this.endDate.getDate()),
        'yyyy-MM-dd'
      );
    }
    this.period = period;
    this.callReportApi(this.startDate, this.endDate, this.period);
  }

  cancelFilter() {
    this.showDialog = false;
  }

  callReportApi(startDate: any, endDate: any, period: any) {
    this.apiService.getGeneralReport(startDate, endDate, period).subscribe(
      (report: any) => {
        this.reportData = report.data;
        if (this.reportData) {
          this.totalProfit = 0;
          this.totalBets = 0;
          this.totalWins = 0;
          this.totalProcessing = 0;
          this.totalRoyalties = 0;
          this.totalBonus = 0;
          this.totalDeposits = 0;
          this.totalWithdrawRequest = 0;
          this.totalWithdrawComplete = 0;
          this.totalBalance = '';
          this.totalRefunds = 0;
          this.totalChargeback = 0;
          this.totalNetGamingRevenue = 0;
          this.totalGrossGamingRevenue = 0;
          this.totalSignups = 0;
          this.totalFirstTimeDepositos = 0;

          this.reportData.forEach((value: any) => {
            this.totalProfit += parseFloat(value.Profit);
            this.totalBets += parseFloat(value.Bets);
            this.totalWins += parseFloat(value.Wins);
            this.totalProcessing += parseFloat(value.Processing);
            this.totalRoyalties += parseFloat(value.Royalties);
            this.totalBonus += parseFloat(value.Bonus);
            this.totalDeposits += parseFloat(value.Deposits);
            this.totalWithdrawRequest += parseFloat(value['WD Request']);
            this.totalWithdrawComplete += parseFloat(value['WD Complete']);
            //this.totalBalance += parseFloat(value.Balance);
            this.totalRefunds += parseFloat(value.Refunds);
            this.totalChargeback += parseFloat(value.CHB);
            this.totalNetGamingRevenue += parseFloat(value.NGR);
            this.totalGrossGamingRevenue += parseFloat(value.GGR);
            this.totalSignups += parseFloat(value.Signups);
            this.totalFirstTimeDepositos += parseFloat(value.FTD);
          });

          this.totalProfit = this.totalProfit.toFixed(2);
          this.totalBets = this.totalBets.toFixed(2);
          this.totalWins = this.totalWins.toFixed(2);
          this.totalProcessing = this.totalProcessing.toFixed(2);
          this.totalRoyalties = this.totalRoyalties.toFixed(2);
          this.totalBonus = this.totalBonus.toFixed(2);
          this.totalDeposits = this.totalDeposits.toFixed(2);
          this.totalWithdrawRequest = this.totalWithdrawRequest.toFixed(2);
          this.totalWithdrawComplete = this.totalWithdrawComplete.toFixed(2);
          //this.totalBalance = this.totalBalance.toFixed(2);
          this.totalRefunds = this.totalRefunds.toFixed(2);
          this.totalChargeback = this.totalChargeback.toFixed(2);
          this.totalNetGamingRevenue = this.totalNetGamingRevenue.toFixed(2);
          this.totalGrossGamingRevenue =
            this.totalGrossGamingRevenue.toFixed(2);
          this.totalSignups = this.totalSignups.toFixed(2);
          this.totalFirstTimeDepositos =
            this.totalFirstTimeDepositos.toFixed(2);

          let totalRecords: any = {};
          totalRecords['Period'] = 'Total';
          totalRecords['Profit'] = this.totalProfit;
          totalRecords['Bets'] = this.totalBets;
          totalRecords['Wins'] = this.totalWins;
          totalRecords['Processing'] = this.totalProcessing;
          totalRecords['Royalties'] = this.totalRoyalties;
          totalRecords['Bonus'] = this.totalBonus;
          totalRecords['Deposits'] = this.totalDeposits;
          totalRecords['WD Request'] = this.totalWithdrawRequest;
          totalRecords['WD Complete'] = this.totalWithdrawComplete;
          totalRecords['Balance'] = this.totalBalance;
          totalRecords['Refunds'] = this.totalRefunds;
          totalRecords['CHB'] = this.totalChargeback;
          totalRecords['NGR'] = this.totalNetGamingRevenue;
          totalRecords['GGR'] = this.totalGrossGamingRevenue;
          totalRecords['Signups'] = this.totalSignups;
          totalRecords['FTD'] = this.totalFirstTimeDepositos;

          this.reportData.push(totalRecords);
        }
      },
      (error) => {
        console.log(error);
        //this.route.navigate(['/crm/transactions']);
      }
    );
  }

  exportReport(): void {
    this.excelService.exportAsExcelFile(this.reportData, 'General Report');
  }
}
