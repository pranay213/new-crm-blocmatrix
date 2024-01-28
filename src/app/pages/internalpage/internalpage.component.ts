import { CommonModule, NgFor } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  standalone: true,
  selector: 'app-internalpage',
  templateUrl: './internalpage.component.html',
  styleUrls: ['./internalpage.component.scss'],
  imports: [NgFor, TableModule],
})
export class InternalpageComponent implements AfterViewInit {
  @Input() cols: any;
  @Input() totalUsers: any;
  @Input() livePlayer: any;
  @Input() userDetails: any;

  title: string;

  constructor() {}
  ngAfterViewInit() {
    // ...
  }
}
