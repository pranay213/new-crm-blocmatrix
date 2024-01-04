import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DataTablesComponent } from 'src/app/data-tables/data-tables.component';

import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { TelgramComponent } from 'src/app/icons/telgram/telgram.component';
import { WhatsappComponent } from 'src/app/icons/whatsapp/whatsapp.component';
import { SendComponent } from 'src/app/icons/send/send.component';
import { EmailComponent } from 'src/app/icons/email/email.component';
import { SmsComponent } from 'src/app/icons/sms/sms.component';
import { MaterialModule } from 'src/app/material.module';

export interface PeriodicElement {
  day: string;
  players: number;
  telegram: any;
  whatsapp: boolean;
  email: boolean;
  sms: boolean;
  send: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    day: 'Today',
    players: 100,
    telegram: true,
    whatsapp: false,
    email: false,
    sms: false,
    send: false,
  },
  {
    day: 'Yesterday',
    players: 100,
    telegram: false,
    whatsapp: false,
    email: false,
    sms: false,
    send: false,
  },
  {
    day: 'This week',
    players: 100,
    telegram: false,
    whatsapp: false,
    email: false,
    sms: false,
    send: false,
  },
  {
    day: 'Last week',
    players: 100,
    telegram: false,
    whatsapp: false,
    email: false,
    sms: false,
    send: false,
  },
  {
    day: 'This Month',
    players: 100,
    telegram: false,
    whatsapp: false,
    email: false,
    sms: false,
    send: false,
  },
  {
    day: 'Last Month',
    players: 100,
    telegram: false,
    whatsapp: false,
    email: false,
    sms: false,
    send: false,
  },
];

@Component({
  selector: 'app-marketer-dashboard',
  standalone: true,
  templateUrl: './marketer-dashboard.component.html',
  styleUrls: ['./marketer-dashboard.component.scss'],
  imports: [
    NgFor,
    MatTableModule,
    TelgramComponent,
    NgIf,
    WhatsappComponent,
    SendComponent,
    EmailComponent,
    SmsComponent,
    MaterialModule,
  ],
})
export class MarketerDashboardComponent {
  setCategoryValue(event: any) {
    this.selectedValue = event.value;
  }

  categorypoints: any = {};
  monthsNames: any = [
    { value: '100$', viewValue: '100$' },
    { value: '1000$', viewValue: '1000$' },
    { value: '2500$', viewValue: '2500$' },
    { value: '5000$', viewValue: '5000$' },
    { value: '10000$', viewValue: '10000$' },
    { value: '100000$', viewValue: '100000$' },
  ];

  name: string = '';
  color: string = '';
  selectedValue = '100$';
  period: any = [
    'Today',
    'Yesterday',
    'This Week',
    'Last Week',
    'This Month',
    'Last Month',
  ];
  displayedColumns: string[] = [
    'day',
    'players',
    'telegram',
    'whatsapp',
    'email',
    'sms',
    'send',
  ];
  dataSource = ELEMENT_DATA;
}
