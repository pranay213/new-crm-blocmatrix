import { Component, OnInit } from '@angular/core';
import { AppBasicTableComponent } from '../tables/basic-table/basic-table.component';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { BrmService } from 'src/app/services/brm.service';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ButtonModule } from 'primeng/button';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LazyLoadEvent } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  standalone: true,
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss'],
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
export class AllTransactionsComponent implements OnInit {
  isUserTypeFA: boolean = false;
  accountID: any;
  transactionDetails = [];
  withdrawalTransactions = [];
  depositTransactions = [];
  startDate: any;
  endDate: any;
  showDialog: boolean = false;
  datamessage: string = '';
  totalRecords: number;
  loading: boolean;
  datasource: [];
  limit: number;
  currentPage: number;

  cols = [
    { header: 'Id', field: 'id', width: '10%' },
    { header: 'Username', field: 'username', width: '10%' },
    { header: 'Game', field: 'game_name', width: '10%' },
    { header: 'Type', field: 'transaction_type', width: '10%' },
    { header: 'Remark', field: 'type', width: '10%' },
    { header: 'Amount', field: 'amount', width: '10%' },
    { header: 'Closing Balance', field: 'closing_balance', width: '10%' },
    { header: 'Timestamp', field: 'created_at', width: '20%' },
  ];
  wdcols = [
    { header: 'Ledger', field: 'ledger_index', width: '10%' },
    { header: 'Hash', field: 'hash', width: '55%' },
    { header: 'Amount (CSC)', field: 'tx.Amount', width: '15%' },
    { header: 'Timestamp', field: 'date', width: '15%' },
  ];
  dtcols = [
    { header: 'Ledger', field: 'ledger_index', width: '10%' },
    { header: 'Hash', field: 'hash', width: '55%' },
    { header: 'Amount (CSC)', field: 'tx.Amount', width: '15%' },
    { header: 'Timestamp', field: 'date', width: '15%' },
  ];
  fieldsMapping: any = {
    credit: 'Credit',
    debit: 'Debit',
    bet_real: 'Bet Real',
    bet_bonus: 'Bet Bonus',
    win_real: 'Win Real',
    win_bonus: 'Win Bonus',
    credit_bonus: 'Credit Bonus',
    bet_rollback: 'Bet Rollback',
    win_rollback: 'Win Rollback',
    debit_bonus: 'Debit Bonus',
    credit_deposit_bonus_admin: 'Credit Deposit Bonus Admin',
    credit_bonus_admin: 'Credit Bonus Admin',
    cancel_withdraw: 'Cancel Withdraw',
    reject_withdraw: 'Reject Withdraw',
    process_withdraw: 'Process Withdraw',
    credit_real_admin: 'Credit Real Admin',
    wipeout: 'Wipeout',
    deposit_refunded: 'Deposit Refunded',
    deposit_chargeback: 'Deposit Chargeback',
  };
  fields: any = {
    credit: true,
    debit: true,
    bet_real: true,
    bet_bonus: true,
    win_real: true,
    win_bonus: true,
    credit_bonus: true,
    bet_rollback: true,
    win_rollback: true,
    debit_bonus: true,
    credit_deposit_bonus_admin: true,
    credit_bonus_admin: true,
    cancel_withdraw: true,
    reject_withdraw: true,
    process_withdraw: true,
    credit_real_admin: true,
    wipeout: true,
    deposit_refunded: true,
    deposit_chargeback: true,
  };

  //@ViewChild('dt', {static: false}) public dataTable: DataTable;

  constructor(
    private apiService: ApiService,
    private route: Router,
    private datePipe: DatePipe,
    private brmService: BrmService
  ) {}

  ngOnInit(): void {
    //checking which userRole type is loged In
    this.isUserTypeFA = true;
    //
    /*let date = new Date();
    let startDate = this.datePipe.transform(date.setDate(date.getDate()), 'yyyy-MM-dd');
    let endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');*/

    this.loading = true;
    let date = new Date();
    let startDate: any = this.datePipe.transform(
      date.setDate(date.getDate()),
      'yyyy-MM-dd'
    );
    let endDate: any = this.datePipe.transform(
      date.setDate(date.getDate() + 1),
      'yyyy-MM-dd'
    );
    //let startDate = this.datePipe.transform(date.setDate(date.getDate() - 20), 'yyyy-MM-dd');
    //let endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.startDate = new Date(startDate);
    this.endDate = new Date(startDate);
    this.limit = 50;
    this.currentPage = 1;
    //setTimeout(() => {
    /*this.apiService.getBRMTransactions(startDate, endDate, this.currentPage, this.limit).subscribe((data: any) => {
      this.transactionDetails = data.all_transactions;
      this.totalRecords = data.total_records;
      //this.datasource = data;
      //this.transactionDetails = this.datasource.slice(0, 27);
      this.loading = false;
    }, error => {
      this.datamessage = error.error.message;
      console.log(error);
  });*/
    //}, 500);

    //   this.apiService.getAllTransactions().subscribe((data: any) => {
    //       this.transactionDetails = data;
    //   }, error => {
    //     console.log(error);
    // });
  }

  loadCarsLazy(event: any) {
    //console.log("Load Lazy", event);
    // console.log(event.first, this.historicFirstPage, event.first >= this.historicFirstPage)
    this.loading = true;
    //setTimeout(() => {
    /*if (this.datasource) {
            this.transactionDetails = this.datasource.slice(event.first, (event.first + event.rows));
            console.log(
              event.first,
              event.rows,
              event.first + event.rows
          );
            this.loading = false;
        }*/
    /*console.log(
          event.first,
          event.rows,
          event.first + event.rows
      );*/

    let startDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    this.endDate.setDate(this.endDate.getDate() + 1);
    let endDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    this.endDate.setDate(this.endDate.getDate() - 1);
    this.currentPage = event.first / event.rows + 1;
    this.limit = event.rows;

    /*let date = new Date();
          let startDate = this.datePipe.transform(date.setDate(date.getDate()), 'yyyy-MM-dd');
          let endDate = this.datePipe.transform(date.setDate(date.getDate() + 1), 'yyyy-MM-dd');
          this.startDate = new Date(startDate);
          this.endDate  = new Date(startDate);*/

    this.apiService
      .getBRMTransactions(startDate, endDate, this.currentPage, this.limit, '')
      .subscribe(
        (data: any) => {
          this.transactionDetails = data.all_transactions;
          this.totalRecords = data.total_records;
          this.loading = false;
        },
        (error) => {
          this.datamessage = error.error.message;
          console.log(error);
        }
      );
    //}, 1000);
  }

  onRowSelect(transaction: any) {
    this.route.navigate(['/brm/tx/', transaction.hash]);
  }

  showFilter() {
    this.datamessage = '';
    this.showDialog = true;
  }

  cancelFilter() {
    this.showDialog = false;
  }

  applyFilter(event: any, fieldName: any) {
    let queryFields = [];
    for (let key in this.fields) {
      if (key != fieldName) {
        if (this.fields[key] !== undefined && this.fields[key]) {
          queryFields.push(this.fieldsMapping[key]);
        }
      } else if (event.target.checked) {
        queryFields.push(this.fieldsMapping[key]);
      }
    }
    let startDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    this.endDate.setDate(this.endDate.getDate() + 1);
    let endDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    this.endDate.setDate(this.endDate.getDate() - 1);

    this.apiService
      .getBRMTransactions(
        startDate,
        endDate,
        this.currentPage,
        this.limit,
        queryFields.join()
      )
      .subscribe(
        (data: any) => {
          this.transactionDetails = data.all_transactions;
          this.totalRecords = data.total_records;
          this.showDialog = false;
        },
        (error) => {
          this.datamessage = error.error.message;
          this.showDialog = false;
          console.log(error);
        }
      );
  }
}
