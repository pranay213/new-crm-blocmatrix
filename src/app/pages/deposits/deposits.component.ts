import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from 'src/app/excel.service';
import { ApiService } from 'src/app/services/api.service';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ButtonModule } from 'primeng/button';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.scss'],
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
    MatIconModule,
  ],
})
export class DepositsComponent implements OnInit {
  selectedBtnFn = (param: any) => {
    this.selectedBtn = param;
  };
  selectedBtn: any = 'all';
  transaction: any;
  sucessfulTransaction: any;
  failedTransaction: any;
  pendingTransaction: any;
  initiatedTransaction: any;
  refundedTransaction: any;
  chargebackTransaction: any;
  reportData: any;
  startDate: any;
  endDate: any;
  showDialog: boolean = false;
  datamessage: string = '';
  currentSelectedTab: string = '';
  depositeApiData: any;
  depositeStatus: any = {
    all: '',
    success: '',
    failed: '',
    pending: '',
    initiated: '',
    refunded: '',
    chargeback: '',
  };

  cols: any = [
    { header: 'Tx Id', field: 'transaction_id', width: '12%' },
    { header: 'Username', field: 'username', width: '7%' },
    { header: 'Amount', field: 'credits_count', width: '6%' },
    { header: 'Currency', field: 'currency', width: '7%' },
    { header: 'Status', field: 'transaction_status', width: '6%' },
    { header: 'Processor', field: 'payment_gateway', width: '9%' },
    { header: 'Country', field: 'country_name', width: '6%' },
    { header: 'Declined Reason', field: 'failed_reason', width: '15%' },
    { header: 'Descriptor', field: 'descriptor', width: '8%' },
    { header: 'Payment Type', field: 'payment_type', width: '10%' },
    { header: 'Card', field: 'card_type', width: '6%' },
    { header: 'Time', field: 'created_at', width: '8%' },
  ];

  deposite_success_cols: any = [
    { header: 'Tx Id', field: 'transaction_id', width: '11%' },
    { header: 'Username', field: 'username', width: '6%' },
    { header: 'Amount', field: 'credits_count', width: '5%' },
    { header: 'Currency', field: 'currency', width: '6%' },
    { header: 'Status', field: 'transaction_status', width: '5%' },
    { header: 'Processor', field: 'payment_gateway', width: '8%' },
    { header: 'Country', field: 'country_name', width: '5%' },
    { header: 'Declined Reason', field: 'failed_reason', width: '14%' },
    { header: 'Descriptor', field: 'descriptor', width: '7%' },
    { header: 'Payment Type', field: 'payment_type', width: '9%' },
    { header: 'Card', field: 'card_type', width: '5%' },
    { header: 'Time', field: 'created_at', width: '7%' },
    { header: 'Action', field: 'request_status', width: '10%' },
  ];

  sucessfulTransactionAmount: any = 0;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private excelService: ExcelService,
    private datePipe: DatePipe,
    private route: Router
  ) {}

  ngOnInit() {
    let date = new Date();
    let dateGMT = this.changeTimezone(date, 'Etc/GMT');

    let startDate: any = this.datePipe.transform(
      dateGMT.setDate(dateGMT.getDate()),
      'yyyy-MM-dd'
    );
    let endDate: any = this.datePipe.transform(dateGMT, 'yyyy-MM-dd');

    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);

    this.activatedRoute.params.subscribe((params) => {
      //let date = new Date();
      let startDate = this.datePipe.transform(
        dateGMT.setDate(dateGMT.getDate()),
        'yyyy-MM-dd'
      );
      let endDate = this.datePipe.transform(
        dateGMT.setDate(dateGMT.getDate() + 1),
        'yyyy-MM-dd'
      );

      this.apiService.getDepositsByRange(startDate, endDate).subscribe(
        (tx: any) => {
          this.depositeApiData = tx;
          this.transaction = tx.all;
          this.sucessfulTransaction = tx.success;
          this.failedTransaction = tx.failed;
          this.pendingTransaction = tx.pending;
          this.initiatedTransaction = tx.initiated;
          this.refundedTransaction = tx.refunded;
          this.chargebackTransaction = tx.chargeback;
          this.reportData = this.transaction;

          this.transaction.forEach((value: any, index: any) => {
            this.transaction[index]['isEditable'] = false;
          });

          this.sucessfulTransaction.forEach((value: any, index: any) => {
            this.sucessfulTransaction[index]['isEditable'] = false;
            this.sucessfulTransactionAmount += value.converted_amount;
          });

          console.log('df', this.transaction);
        },
        (error) => {
          console.log(error);
          this.route.navigate(['/crm/transactions']);
        }
      );
    });
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

  onAction(rowData: any) {
    rowData.isEditable = true;
  }
  processSuccessDeposit(rowData: any) {
    //console.log(rowData);
    let updatedData = {
      id: rowData.id,
      action: rowData.transaction_status,
    };
    this.apiService.updateDepositAction(updatedData).subscribe(
      (tx: any) => {
        this.applyFilter();
      },
      (error) => {
        this.route.navigate(['/crm/transactions']);
      }
    );
    rowData.isEditable = false;
  }

  sentAmountWithFee() {
    return (
      (parseInt(this.transaction.tx.Amount) +
        parseInt(this.transaction.tx.Fee)) /
      100000000
    ).toFixed(8);
  }

  exportReport(): void {
    this.excelService.exportAsExcelFile(this.reportData, 'Deposits');
  }

  changeExcel(type: any) {
    this.currentSelectedTab = type;
    switch (type) {
      case 'All':
        this.reportData = this.transaction;
        break;
      case 'Success':
        this.reportData = this.sucessfulTransaction;
        break;
      case 'Failed':
        this.reportData = this.failedTransaction;
        break;
      case 'Pending':
        this.reportData = this.pendingTransaction;
        break;
      case 'Initiated':
        this.reportData = this.initiatedTransaction;
        break;
    }
    this.transaction.forEach((value: any, index: any) => {
      this.transaction[index]['isEditable'] = false;
    });

    this.sucessfulTransactionAmount = 0;

    this.sucessfulTransaction.forEach((value: any, index: any) => {
      this.sucessfulTransaction[index]['isEditable'] = false;
      this.sucessfulTransactionAmount += value.converted_amount;
    });
  }

  onRowSelect(user: any) {
    window.open('/users/edit/' + user.player_id, '_blank');
  }

  showFilter() {
    this.datamessage = '';
    this.showDialog = true;
  }

  cancelFilter() {
    this.showDialog = false;
  }

  applyFilter() {
    let startDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    this.endDate.setDate(this.endDate.getDate() + 1);
    let endDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    this.endDate.setDate(this.endDate.getDate() - 1);
    this.apiService.getDepositsByRange(startDate, endDate).subscribe(
      (tx: any) => {
        this.depositeApiData = tx;
        this.transaction = tx.all;
        this.sucessfulTransaction = tx.success;
        this.failedTransaction = tx.failed;
        this.pendingTransaction = tx.pending;
        this.initiatedTransaction = tx.initiated;
        this.refundedTransaction = tx.refunded;
        this.chargebackTransaction = tx.chargeback;
        this.showDialog = false;

        switch (this.currentSelectedTab) {
          case 'Success':
            this.reportData = this.sucessfulTransaction;
            break;
          case 'Failed':
            this.reportData = this.failedTransaction;
            break;
          case 'Pending':
            this.reportData = this.pendingTransaction;
            break;
          case 'Initiated':
            this.reportData = this.initiatedTransaction;
            break;
          case 'Refunded':
            this.reportData = this.refundedTransaction;
            break;
          case 'Chargeback':
            this.reportData = this.chargebackTransaction;
            break;
          default:
            this.reportData = this.transaction;
            break;
        }
        this.transaction.forEach((value: any, index: any) => {
          this.transaction[index]['isEditable'] = false;
        });

        this.sucessfulTransactionAmount = 0;

        this.sucessfulTransaction.forEach((value: any, index: any) => {
          this.sucessfulTransaction[index]['isEditable'] = false;
          this.sucessfulTransactionAmount += value.converted_amount;
        });
      },
      (error) => {
        this.datamessage = error.error.message;
        this.showDialog = false;
        console.log(error);
      }
    );
  }

  search(tab: any) {
    switch (tab) {
      case 'ALL':
        this.transaction = this.getSearchData(tab);
        break;
      case 'SUCCESS':
        this.sucessfulTransaction = this.getSearchData(tab);
        break;
      case 'FAILED':
        this.failedTransaction = this.getSearchData(tab);
        break;
      case 'PENDING':
        this.pendingTransaction = this.getSearchData(tab);
        break;
      case 'INITIATED':
        this.initiatedTransaction = this.getSearchData(tab);
        break;
      case 'REFUNDED':
        this.refundedTransaction = this.getSearchData(tab);
        break;
      case 'CHARGEBACK':
        this.chargebackTransaction = this.getSearchData(tab);
        break;
      default:
        this.transaction = this.getSearchData(tab);
        break;
    }
  }

  getSearchData(tab: any) {
    console.log(this.depositeApiData[tab.toLowerCase()]);
    let temp = [];
    for (let data of this.depositeApiData[tab.toLowerCase()]) {
      for (let key in data) {
        //console.log(key, user);
        if (
          data[key] &&
          data[key]
            .toString()
            .toLowerCase()
            .includes(this.depositeStatus[tab.toLowerCase()].toLowerCase())
        ) {
          temp.push(data);
          break;
        }
      }
    }
    return temp;
  }
}
