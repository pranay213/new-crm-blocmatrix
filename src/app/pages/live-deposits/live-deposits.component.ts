import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TablerIconsModule } from 'angular-tabler-icons';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
@Component({
  standalone: true,
  selector: 'app-live-deposits',
  templateUrl: './live-deposits.component.html',
  styleUrls: ['./live-deposits.component.scss'],

  imports: [
    TableModule,
    NgFor,
    TabViewModule,
    CardModule,
    NgIf,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule,
    CommonModule,
  ],
})
export class LiveDepositsComponent implements OnInit {
  transaction: any;
  sucessfulTransaction: any;
  failedTransaction: any;
  pendingTransaction: any;
  initiatedTransaction: any;
  reportData: any;
  liveDeposit: any;
  displayDialog: boolean = false;
  selectedBtn: string = 'all';
  selectedBtnFn = (param: any) => {
    this.selectedBtn = param;
  };
  cols = [
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

  sucessfulTransactionAmount: any = 0;
  constructor(private apiService: ApiService, private route: Router) {}

  ngOnInit() {
    this.apiService.getLiveDeposits().subscribe((tx: any) => {
      this.transaction = tx.all;
      this.sucessfulTransaction = tx.success;
      this.failedTransaction = tx.failed;
      this.pendingTransaction = tx.pending;
      this.initiatedTransaction = tx.initiated;
      this.reportData = this.transaction;
      this.sucessfulTransaction.forEach((value: any, index: any) => {
        this.sucessfulTransactionAmount += value.converted_amount;
      });
      this.startGettingLive();
    });
  }

  startGettingLive() {
    this.liveDeposit = setInterval(() => {
      this.apiService.getLiveDeposits().subscribe((tx: any) => {
        this.transaction = tx.all;
        this.sucessfulTransaction = tx.success;
        this.failedTransaction = tx.failed;
        this.pendingTransaction = tx.pending;
        this.initiatedTransaction = tx.initiated;
        this.reportData = this.transaction;
        this.sucessfulTransactionAmount = 0;
        this.sucessfulTransaction.forEach((value: any, index: any) => {
          this.sucessfulTransactionAmount += value.converted_amount;
        });
      });
    }, 60000);
  }

  ngOnDestroy() {
    if (this.liveDeposit) {
      clearInterval(this.liveDeposit);
    }
  }

  onAction(rowData: any) {
    rowData.isEditable = true;
  }

  changeStatus(rowData: any) {
    let updatedData = {
      id: rowData.id,
      active: rowData.active,
    };
    this.apiService.updateGameStatus(updatedData).subscribe(
      (games: any) => {
        rowData.isEditable = false;
        alert('The request has been processed successfully');
      },
      (error) => {
        this.route.navigate(['/games']);
      }
    );
    rowData.isEditable = false;
  }

  showDialogToAdd() {
    this.displayDialog = true;
  }

  close() {
    this.displayDialog = false;
  }

  onRowSelect(user: any) {
    window.open('/users/edit/' + user.player_id, '_blank');
  }
}
