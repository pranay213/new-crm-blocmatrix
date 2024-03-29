import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../services/notification.service';

@Component({
  standalone: true,
  selector: 'app-api-error-dialog',
  templateUrl: './api-error-dialog.component.html',
  styleUrls: ['./api-error-dialog.component.scss'],
  imports: [CommonModule],
})
export class ApiErrorDialogComponent {
  title = '';
  message = '';
  logoutParam: boolean = false;
  loading: boolean = false;

  closeDialog = () => {
    this.dialog.closeAll();
  };

  LogoutFn = () => {
    this.loading = true;
    this.message = 'Signing Out, See you soon!';

    this.notificationService.logout();
    setTimeout(() => {
      this.dialog.closeAll();
      this.logoutParam = false;
      this.loading = false;
    }, 5000);
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public error: any,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.title = error.title;
    if (this.title === 'logout') {
      this.logoutParam = true;
    }

    this.message = error?.data || JSON.stringify(error);
  }
}
