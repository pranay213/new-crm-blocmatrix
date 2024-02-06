import { Component, Inject, Input, OnInit, OnChanges } from '@angular/core';
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
export class CardsNewComponent implements OnChanges {
  @Input() totalData: any;
  UsersTotalCount: number;
  DepositTotalCount: number;
  WithdrawalTotalCount: number;
  ngOnChanges(): void {
    this.UsersTotalCount = this.totalData?.total_signups;
    this.DepositTotalCount = this.totalData?.total_deposits;
    this.WithdrawalTotalCount = this.totalData?.total_withdrawals;
  }
  ngAfterViewInit(): void {}
}

export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
