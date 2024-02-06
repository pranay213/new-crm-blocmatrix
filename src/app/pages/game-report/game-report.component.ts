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
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ExcelService } from 'src/app/excel.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  standalone: true,
  selector: 'app-game-report',
  templateUrl: './game-report.component.html',
  styleUrls: ['./game-report.component.scss'],
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
  ],
})
export class GameReportComponent implements OnInit {
  reportData: any;
  startDate: any;
  endDate: any;
  period: any;
  showDialog: boolean = false;
  datamessage: string = '';
  //radioModel:string ="Day";
  currency: string = 'EUR';
  totalWagered: any;
  totalWinning: any;
  yearRange: any = [];
  allMonths: any = [
    { key: 0, val: 'JAN' },
    { key: 1, val: 'FEB' },
    { key: 2, val: 'MAR' },
    { key: 3, val: 'APR' },
    { key: 4, val: 'MAY' },
    { key: 5, val: 'JUN' },
    { key: 6, val: 'JUL' },
    { key: 7, val: 'AUG' },
    { key: 8, val: 'SEP' },
    { key: 9, val: 'OCT' },
    { key: 10, val: 'NOV' },
    { key: 11, val: 'DEC' },
  ];
  reportYear: any;
  reportMonth: any;

  cols: any = [
    { header: 'Game Name', field: 'Game Name' },
    { header: 'Player Username', field: 'Player Username' },
    { header: 'Total Wagered', field: 'Total Wagered' },
    { header: 'Total Winning', field: 'Total Winning' },
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

    let currentYear = startTempDateGMT.getFullYear();
    let startYear = 2020;
    this.reportYear = currentYear;
    this.reportMonth = startTempDateGMT.getMonth();
    for (let i = startYear; i <= currentYear; i++) {
      this.yearRange.push(i);
    }

    // This code is used with filter option
    /*
      this.startDate = this.datePipe.transform(startTempDateGMT.setDate(startTempDateGMT.getDate()-1), 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(endTempDateGMT.setDate(endTempDateGMT.getDate()-1), 'yyyy-MM-dd');
      this.period = "DAILY";
      */

    // This code is used to get monthly report
    let firstDay = new Date(
      startTempDateGMT.getFullYear(),
      startTempDateGMT.getMonth(),
      1
    );
    let lastDay = new Date(
      startTempDateGMT.getFullYear(),
      startTempDateGMT.getMonth() + 1,
      0
    );

    this.startDate = this.datePipe.transform(firstDay, 'yyyy-MM-dd');
    this.period = 'MONTHLY';

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

  applyMonthFilter() {
    let firstDay = new Date(this.reportYear, this.reportMonth, 1);
    let lastDay = new Date(this.reportYear, parseInt(this.reportMonth) + 1, 0);

    let startDate = this.datePipe.transform(firstDay, 'yyyy-MM-dd');
    let endDate = this.datePipe.transform(lastDay, 'yyyy-MM-dd');

    this.callReportApi(startDate, endDate, this.period);
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
    this.apiService.getGamesReport(startDate, endDate, period).subscribe(
      (report: any) => {
        this.reportData = report.data;
        if (this.reportData) {
          this.totalWagered = 0;
          this.totalWinning = 0;

          this.reportData.forEach((value: any) => {
            this.totalWagered += parseFloat(value['Total Wagered']);
            this.totalWinning += parseFloat(value['Total Winning']);
          });

          this.totalWagered = this.totalWagered.toFixed(2);
          this.totalWinning = this.totalWinning.toFixed(2);

          let totalRecords: any = {};
          totalRecords['Game Name'] = '';
          totalRecords['Player Username'] = '';
          totalRecords['Total Wagered'] = this.totalWagered;
          totalRecords['Total Winning'] = this.totalWinning;

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
    let downloadableReport: any = [];
    this.reportData.forEach(function (data: any) {
      let temp: any = {};
      temp['Game Name'] = data['Game Name'];
      temp['Player Username'] = data['Player Username'];
      temp['Total Wagered'] = data['Total Wagered'];
      temp['Total Winning'] = data['Total Winning'];

      downloadableReport.push(temp);
    });
    this.excelService.exportAsExcelFile(downloadableReport, 'Games Report');
  }
  onRowSelect(user: any) {
    window.open('/users/edit/' + user.player_id, '_blank');
  }
}
