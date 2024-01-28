import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { TableModule } from 'primeng/table';
import { NgFor } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';

@Component({
  standalone: true,
  selector: 'app-live-report',
  templateUrl: './live-report.component.html',
  styleUrls: ['./live-report.component.scss'],
  imports: [TableModule, NgFor, TabViewModule, CardModule],
})
export class LiveReportComponent implements OnInit {
  userDetails: any = [];
  totalUsers: any;
  livePlayer: any;
  displayDialog: boolean = false;
  test: any = 'hello';
  cols: any = [
    { header: 'Username', field: 'AccountID' },
    { header: 'Name', field: 'Fullname' },
    { header: 'Email', field: 'Emailaddress' },
    { header: 'Mobile', field: 'Telephonenumber' },
    { header: 'DOB', field: 'DateOfBirth' },
    { header: 'Total Deposits', field: 'TotalDeposits' },
    { header: 'Total Balance', field: 'TotalBalance' },
    { header: 'Loyalty Points', field: 'LoyaltyPoints' },
    { header: 'Registration Date', field: 'CreationDate' },
    { header: 'Last Login', field: 'LastLogin' },
    { header: 'Country', field: 'Country' },
  ];
  constructor(private apiService: ApiService, private route: Router) {}
  ngOnInit(): void {
    this.apiService.getLivePlayers().subscribe((data: any) => {
      this.userDetails = data;
      this.totalUsers = this.userDetails.length;
      this.startGettingLive();
    });
  }

  startGettingLive() {
    this.livePlayer = setInterval(() => {
      this.apiService.getLivePlayers().subscribe((data: any) => {
        this.userDetails = data;
        this.totalUsers = this.userDetails.length;
      });
    }, 60000);
  }

  ngOnDestroy() {
    if (this.livePlayer) {
      clearInterval(this.livePlayer);
    }
  }

  onAction(rowData: any) {
    rowData.isEditable = true;
  }

  changeStatus(rowData: any) {
    let updatedData = {
      id: rowData.id,
      active: rowData.active,
    };
    this.apiService.updateGameStatus(updatedData).subscribe(
      (games: any) => {
        rowData.isEditable = false;
        alert('The request has been processed successfully');
      },
      (error) => {
        this.route.navigate(['/games']);
      }
    );
    rowData.isEditable = false;
  }

  showDialogToAdd() {
    this.displayDialog = true;
  }

  close() {
    this.displayDialog = false;
  }

  onRowSelect(user: any) {
    window.open('/users/edit/' + user.id, '_blank');
  }
}
