import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { NumberCounterModule } from 'ng-number-counter';
import { CountUpModule } from 'ngx-countup';
import { NotificationService } from 'src/app/services/notification.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/pages/ui-components/dialog/dialog.component';
import { ApiErrorDialogComponent } from 'src/app/api-error-dialog/api-error-dialog.component';

@Component({
  selector: 'app-cards-new',
  standalone: true,
  imports: [CommonModule, NumberCounterModule, CountUpModule],
  templateUrl: './cards-new.component.html',
  styleUrls: ['./cards-new.component.scss'],
})
export class CardsNewComponent {
  UsersTotalCount: number;
  DepositTotalCount: number;
  WithdrawalTotalCount: number;
  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {
    this.apiService.getCounter().subscribe(
      (data: any) => {
        // console.log('Data----', data);
        if (data) {
          this.UsersTotalCount = data.Users.totalCount;
          this.DepositTotalCount = data.Deposits.totalCount;
          this.WithdrawalTotalCount = data.Withdrawals.totalCount;
        }
      },
      (error) => {
        // if (error.statusText === 'Unauthorized') {
        //   // alert('Error');
        //   // this.dialog.open(ApiErrorDialogComponent, {
        //   //   data: error,
        //   // });
        //   // localStorage.clear();
        //   this.notificationService.showError(error);
        // }
        this.notificationService.showError(error);
      }
    );
  }
}

export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
