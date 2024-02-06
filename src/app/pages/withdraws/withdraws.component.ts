import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-withdraws',
  templateUrl: './withdraws.component.html',
  styleUrls: ['./withdraws.component.scss'],
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
export class WithdrawsComponent {
  selectedBtn: any = 'all';
  selectedBtnFn = (params: any) => {
    this.selectedBtn = params;
  };
  transaction: any;
  completedTransaction: any;
  cancelledTransaction: any;
  pendingTransaction: any;
  rejectedTransaction: any;
  isConfirmed: any = false;
  selectedRow: any;

  cols: any = [
    { header: 'Username', field: 'username', width: '10%' },
    { header: 'Mobile', field: 'mobile', width: '20%' },
    { header: 'Email', field: 'email', width: '20%' },
    { header: 'Amount', field: 'request_amount', width: '5%' },
    { header: 'Requested Time', field: 'created_at', width: '20%' },
    {
      header: 'Payment Processor',
      field: 'payment_processor_id',
      width: '15%',
    },
    { header: 'Status', field: 'request_status', width: '10%' },
  ];

  withdraw_pending_cols: any = [
    { header: 'Username', field: 'username', width: '10%' },
    { header: 'Mobile', field: 'mobile', width: '15%' },
    { header: 'Email', field: 'email', width: '15%' },
    { header: 'Amount', field: 'request_amount', width: '10%' },
    { header: 'Requested Time', field: 'created_at', width: '15%' },
    {
      header: 'Payment Processor',
      field: 'payment_processor_id',
      width: '15%',
    },
    { header: 'Status', field: 'request_status', width: '10%' },
    { header: 'Action', field: 'request_status', width: '10%' },
  ];

  paymentProcessors: any = [];

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.apiService.getWithdrawalsRequests().subscribe(
        (tx: any) => {
          this.apiService.getAllPaymentProcessors().subscribe((pp: any) => {
            this.paymentProcessors = pp.data;
          });
          this.transaction = tx.All;
          this.completedTransaction = tx.Completed;
          this.cancelledTransaction = tx.Cancelled;
          this.pendingTransaction = tx.Pending;
          this.rejectedTransaction = tx.Rejected;
          //console.log("aaaaaaaaa",this.transaction)

          this.transaction.forEach((value: any, index: any) => {
            this.transaction[index]['isEditable'] = false;
          });

          this.pendingTransaction.forEach((value: any, index: any) => {
            this.pendingTransaction[index]['isEditable'] = false;
          });
        },
        (error) => {
          this.route.navigate(['/crm/transactions']);
        }
      );
    });
  }

  onAction(rowData: any) {
    rowData.isEditable = true;
  }

  processWithdraw(rowData: any) {
    this.isConfirmed = false;
    if (rowData == '') return;
    let updatedData = {
      id: rowData.id,
      wallet_account_id: rowData.wallet_account_id,
      request_status: rowData.request_status,
      payment_processor_id: rowData.payment_processor_id,
    };
    this.apiService.updateWithdrawalsRequests(updatedData).subscribe(
      (tx: any) => {
        this.apiService.getWithdrawalsRequests().subscribe(
          (tx: any) => {
            this.transaction = tx.All;
            this.completedTransaction = tx.Completed;
            this.cancelledTransaction = tx.Cancelled;
            this.pendingTransaction = tx.Pending;
            this.rejectedTransaction = tx.Rejected;
            //console.log("aaaaaaaaa",this.transaction)

            this.transaction.forEach((value: any, index: any) => {
              this.transaction[index]['isEditable'] = false;
            });

            this.pendingTransaction.forEach((value: any, index: any) => {
              this.pendingTransaction[index]['isEditable'] = false;
            });
          },
          (error) => {
            this.route.navigate(['/crm/transactions']);
          }
        );
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

  showFilter() {
    console.log('show filter');
  }

  onRowSelect(user: any) {
    window.open('/users/edit/' + user.player_id, '_blank');
  }

  showingConfirmationDialog(rowData: any) {
    console.log(rowData);
    this.selectedRow = rowData;
    this.isConfirmed = true;
    console.log(this.isConfirmed);
  }
}
