import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  standalone: true,
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  imports: [NgIf],
})
export class ToastComponent {
  // error$ = this.notificationService.errors$();
  error: String;
  constructor(private readonly notificationService: NotificationService) {
    // console.log('error', this.error$);
  }
}
