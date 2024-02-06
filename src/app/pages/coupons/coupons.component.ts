import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { CalendarModule } from 'angular-calendar';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ApiService } from 'src/app/services/api.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  standalone: true,
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss'],
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
    CommonModule,
    ButtonModule,
    TablerIconsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    CalendarModule,
    DialogModule,
    MatCheckboxModule,
    ProgressSpinnerModule,
  ],
})
export class CouponsComponent implements OnInit {
  selectedBtnFn = (params: any) => {};
  selectedBtn: any = 'all';
  theSpinner: boolean;
  allCoupons: any;
  activeCoupons: any;
  inactiveCoupons: any;
  expiredCoupons: any;
  totalCoupons: any;
  totalActiveCoupons: any;
  totalInactiveCoupons: any;
  totalExpiredCoupons: any;

  cols: any = [
    { header: 'Code', field: 'code' },
    { header: 'Type', field: 'type' },
    { header: 'Redeem Value', field: 'reward' },
    { header: 'Wagering Requirement', field: 'wagering_requirement' },
    { header: 'Max Cashout', field: 'max_withdraw' },
    { header: 'Expiry Time', field: 'expiry_time' },
    { header: 'Status', field: 'status' },
    { header: 'Action', field: 'action' },
  ];

  constructor(public apiService: ApiService, private route: Router) {}

  ngOnInit() {
    this.theSpinner = true;
    this.apiService.getAllCoupons().subscribe((coupons: any) => {
      this.allCoupons = coupons.all;
      this.activeCoupons = coupons.active;
      this.inactiveCoupons = coupons.inactive;
      this.expiredCoupons = coupons.expired;

      if (this.allCoupons.length) {
        this.allCoupons.forEach((value: any, index: any) => {
          this.allCoupons[index]['isEditable'] = false;
        });
      }
      if (this.activeCoupons.length) {
        this.activeCoupons.forEach((value: any, index: any) => {
          this.activeCoupons[index]['isEditable'] = false;
        });
      }
      if (this.inactiveCoupons.length) {
        this.inactiveCoupons.forEach((value: any, index: any) => {
          this.inactiveCoupons[index]['isEditable'] = false;
        });
      }

      this.totalCoupons = this.allCoupons.length;
      this.totalActiveCoupons = this.activeCoupons.length;
      this.totalInactiveCoupons = this.inactiveCoupons.length;
      this.totalExpiredCoupons = this.expiredCoupons.length;

      this.theSpinner = false;
    });
  }

  addCoupon() {
    this.route.navigateByUrl('/coupons/add');
  }

  onAction(rowData: any) {
    rowData.isEditable = true;
  }

  updateStatus(rowData: any) {
    if (rowData == '') return;
    let updatedData = {
      id: rowData.id,
      status: rowData.status,
    };
    this.apiService.updateCoupon(updatedData).subscribe((data: any) => {
      rowData.isEditable = false;
      if (data.success) {
        alert('Status updated successfully');
        this.apiService.getAllCoupons().subscribe((coupons: any) => {
          this.allCoupons = coupons.all;
          this.activeCoupons = coupons.active;
          this.inactiveCoupons = coupons.inactive;
          this.expiredCoupons = coupons.expired;

          if (this.allCoupons.length) {
            this.allCoupons.forEach((value: any, index: any) => {
              this.allCoupons[index]['isEditable'] = false;
            });
          }
          if (this.activeCoupons.length) {
            this.activeCoupons.forEach((value: any, index: any) => {
              this.activeCoupons[index]['isEditable'] = false;
            });
          }
          if (this.inactiveCoupons.length) {
            this.inactiveCoupons.forEach((value: any, index: any) => {
              this.inactiveCoupons[index]['isEditable'] = false;
            });
          }

          this.totalCoupons = this.allCoupons.length;
          this.totalActiveCoupons = this.activeCoupons.length;
          this.totalInactiveCoupons = this.inactiveCoupons.length;
          this.totalExpiredCoupons = this.expiredCoupons.length;

          this.theSpinner = false;
        });
      } else {
        alert(data.message);
      }
    });
  }
}
