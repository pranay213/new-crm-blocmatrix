import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiErrorDialogComponent } from '../api-error-dialog/api-error-dialog.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  errdata: any = '';
  alertType: any = '';
  DialogRef: any;
  constructor(public dialog: MatDialog, private _router: Router) {}

  //   private readonly errorsSubject$ = new Subject<string>();

  //   public errors$() {
  //     return this.errorsSubject$.asObservable();
  //   }

  public showError(error: any, alertType: any = null): void {
    // console.log('=---Mesg', error);
    this.errdata = error || 'Something went wrong';
    this.alertType = alertType || 'Error';

    // this.errorsSubject$.next(message);
    if (error.statusText === 'Unauthorized') {
      this.errdata =
        'Unauthorized login . Please login With correct credentials';

      localStorage.clear();
      setTimeout(() => {
        this._router.navigate(['login']);
      }, 2000);
    }

    this.dialog.open(ApiErrorDialogComponent, {
      data: { title: this.alertType, data: this.errdata },
      disableClose: true,
    });
  }
  public closeDialogBox() {
    // this.dialogRef.close();
    this.dialog.closeAll();
  }

  public logout() {
    localStorage.clear();
    setTimeout(() => {
      this._router.navigate(['login']);
    }, 5000);
  }
}
