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
  ],
})
export class MarketerDashboardComponent {
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
