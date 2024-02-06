import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { TablerIconsModule } from 'angular-tabler-icons';
import { LazyLoadEvent } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ApiService } from 'src/app/services/api.service';
import { ButtonModule } from 'primeng/button';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from 'src/app/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from 'src/app/excel.service';
import { ICountry } from 'ngx-country-picker/country.interface';
import { CountryPickerService } from 'ngx-country-picker';

@Component({
  standalone: true,
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
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
  ],
})
export class PlayersComponent implements OnInit {
  selectedBtn: any = 'active';
  selectedBtnFn = (params: any) => {
    this.selectedBtn = params;
    if (this.selectedBtn === 'active') {
      this.getActiveUsers();
    }
    if (this.selectedBtn === 'inactive') this.getInactiveUsers();
    if (this.selectedBtn === 'pending') this.getUnconfirmedUsers();
  };
  theSpinner: boolean;

  userDetails: any = [];
  unconfirmedUserDetails = [];
  inActiveUserDetails: any = [];

  // countries: ICountry[] = [];
  searchKeywords: any = [];

  totalUsers: any;
  totalInactiveUsers: any;
  totalUnconfirmedUsers: any;

  loading: boolean;
  inactiveLoading: boolean;
  unconfirmedLoading: boolean;

  currentPage: number;
  limit: number;
  sortField: any;
  sortOrder: any;

  searchActivePlayerIds: any = [];
  searchInactivePlayerIds: any = [];
  searchUnconfirmedPlayerIds: any = [];
  searchBy: any;
  exactMatch: string;
  orderBy: any;
  countries: ICountry[] = [];

  allSearchOptions: any = [
    { key: 'username', val: 'Username' },
    { key: 'firstname', val: 'First Name' },
    { key: 'lastname', val: 'Last Name' },
    { key: 'email', val: 'Emailaddress' },
    { key: 'city', val: 'City' },
    { key: 'country', val: 'Country' },
    { key: 'last_ip_address', val: 'IP' },
    { key: 'mobile', val: 'Telephonenumber' },
    //{key: "affiliate_username", val: "Affiliate Username"}
  ];

  allMatches: any = ['Yes', 'No'];

  allOrders: any = [
    { key: 1, val: 'Ascending' },
    { key: -1, val: 'Descending' },
  ];

  allLimits: any = [10, 20, 50, 100, 150, 200];

  fieldsMapping: any = {
    Username: 'players.username',
    AccountID: 'players.username',
    'First Name': 'players.firstname',
    'Last Name': 'players.lastname',
    Fullname: 'players.firstname, players.lastname',
    Emailaddress: 'players.email',
    Telephonenumber: 'players.mobile',
    DateOfBirth: 'players.date_of_birth',
    TotalDeposits: 'wallet_account.total_deposit',
    TotalBalance: 'total_balance',
    LoyaltyPoints: 'wallet_account.loyalty_points',
    CreationDate: 'creation_date',
    LastLogin: 'players.last_login',
    Country: 'country_name',
    City: 'players.city',
    IP: 'players.last_ip_address',
    'Affiliate ID': 'players.campaign_id',
  };

  cols: any = [
    { header: 'Username', field: 'AccountID' },
    { header: 'Name', field: 'Fullname' },
    { header: 'Email', field: 'Emailaddress' },
    { header: 'Mobile', field: 'Telephonenumber' },
    { header: 'DOB', field: 'DateOfBirth' },
    { header: 'Total Deposits', field: 'TotalDeposits' },
    { header: 'Total Balance', field: 'TotalBalance' },
    //{ header: "Loyalty Points", field: "LoyaltyPoints" },
    { header: 'Registration Date', field: 'CreationDate' },
    { header: 'Last Login', field: 'LastLogin' },
    { header: 'Country', field: 'Country' },
    { header: 'IP', field: 'IP' },
    { header: 'Deposits Count', field: 'DepositsCount' },
    { header: 'Affiliate', field: 'Affiliate' },
  ];

  constructor(
    public apiService: ApiService,
    private route: Router,
    private countryPicker: CountryPickerService,
    private excelService: ExcelService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.queryParams.subscribe((params) => {});
  }

  ngOnInit() {
    this.theSpinner = true;
    this.loading = true;
    this.inactiveLoading = true;
    this.unconfirmedLoading = true;
    this.limit = 10;
    this.currentPage = 1;
    this.sortField = 'players.id';
    this.sortOrder = -1;
    this.getActiveUsers();

    this.countryPicker.getCountries().subscribe((countries: ICountry[]) => {
      this.countries = countries;

      this.apiService.getSearchKeywords().subscribe((keywordsData: any) => {
        this.searchKeywords = keywordsData;
      });
    });

    this.theSpinner = false;
  }

  /*getActiveAndUnconfirmedUsers(){
        this.apiService.viewUser(this.currentPage, this.limit).subscribe((data: any) => {
            this.totalUsers = data.total_records;
            this.userDetails = data.players;
            this.loading = false;

            this.apiService.userSearchData = "";

            let unconfirmedUserDetailsTemp = [];
            if(this.userDetails.length){
                this.userDetails.forEach(function(player){
                    if(player.EmailVerified == '0'){
                        unconfirmedUserDetailsTemp.push(player);
                    }
                });
            }
            this.unconfirmedUserDetails = unconfirmedUserDetailsTemp;
            this.totalUnconfirmedUsers = this.unconfirmedUserDetails.length;
            this.apiService.unconfirmedUserSearchData = "";
        },
        error => {
            if (error.status == 401) {
                this.localStorageService.clear();
                this.route.navigateByUrl('/login');
            }
        });
    }

    getInactiveUsers(){
        this.apiService.viewInactiveUser(this.currentPage, this.limit).subscribe((inactiveData: any) => {
            this.totalInactiveUsers = inactiveData.total_records;
            this.inActiveUserDetails = inactiveData.players;
            this.inactiveLoading = false;

            this.apiService.inactiveUserSearchData = "";
        },
        error => {
            if (error.status == 401) {
                this.localStorageService.clear();
                this.route.navigateByUrl('/login');
            }
        });
    }*/

  getActiveUsers() {
    let params: any = {
      page: this.currentPage,
      limit: this.limit,
      pid: this.searchActivePlayerIds,
      sort_field: this.sortField,
      sort_order: this.sortOrder,
    };
    this.apiService.viewActiveUser(params).subscribe(
      (data: any) => {
        this.totalUsers = data.total_records;
        this.userDetails = data.players;
        this.loading = false;
      },
      (error) => {
        if (error.status == 401) {
          localStorage.clear();
          this.route.navigateByUrl('/login');
        }
      }
    );
  }

  getInactiveUsers() {
    let params: any = {
      page: this.currentPage,
      limit: this.limit,
      pid: this.searchInactivePlayerIds,
      sort_field: this.sortField,
      sort_order: this.sortOrder,
    };
    this.apiService.viewInactiveUser(params).subscribe(
      (data: any) => {
        this.totalInactiveUsers = data.total_records;
        this.inActiveUserDetails = data.players;
        this.inactiveLoading = false;
      },
      (error) => {
        if (error.status == 401) {
          localStorage.clear();
          this.route.navigateByUrl('/login');
        }
      }
    );
  }

  getUnconfirmedUsers() {
    let params: any = {
      page: this.currentPage,
      limit: this.limit,
      pid: this.searchUnconfirmedPlayerIds,
      sort_field: this.sortField,
      sort_order: this.sortOrder,
    };
    this.apiService.viewUnconfirmedUser(params).subscribe(
      (data: any) => {
        this.totalUnconfirmedUsers = data.total_records;
        this.unconfirmedUserDetails = data.players;
        this.unconfirmedLoading = false;
      },
      (error) => {
        if (error.status == 401) {
          localStorage.clear();
          this.route.navigateByUrl('/login');
        }
      }
    );
  }

  loadActivePlayers(event: any) {
    //console.log(event);
    if (event.sortField) {
      return;
      this.sortField = this.fieldsMapping[event.sortField];
      this.sortOrder = event.sortOrder;
    }
    this.loading = true;
    this.currentPage = event.first / event.rows + 1;
    this.limit = event.rows;

    this.getActiveUsers();
  }

  loadInactivePlayers(event: any) {
    if (event.sortField) {
      this.sortField = this.fieldsMapping[event.sortField];
      this.sortOrder = event.sortOrder;
    }
    this.inactiveLoading = true;
    this.currentPage = event.first / event.rows + 1;
    this.limit = event.rows;

    setTimeout(() => {
      this.getInactiveUsers();
    }, 3000);
  }

  loadUnconfirmedPlayers(event: any) {
    if (event.sortField) {
      this.sortField = this.fieldsMapping[event.sortField];
      this.sortOrder = event.sortOrder;
    }
    this.unconfirmedLoading = true;
    this.currentPage = event.first / event.rows + 1;
    this.limit = event.rows;

    setTimeout(() => {
      this.getUnconfirmedUsers();
    }, 5000);
  }

  applyManualSearch() {
    if (
      this.apiService.userSearchData &&
      this.exactMatch &&
      this.searchBy &&
      this.limit &&
      this.orderBy
    ) {
      this.loading = true;
      let searchValue = this.apiService.userSearchData.toLowerCase();

      this.searchActivePlayerIds = [];
      if (searchValue) {
        this.searchActivePlayerIds.push(-1);
      }

      this.sortOrder = this.orderBy;

      if (this.exactMatch == 'Yes') {
        this.searchKeywords.forEach((keywordsObj: any) => {
          if (
            keywordsObj[this.searchBy] &&
            keywordsObj[this.searchBy].toString().toLowerCase() == searchValue
          ) {
            this.searchActivePlayerIds.push(keywordsObj.player_id);
          }
        });
      } else {
        this.searchKeywords.forEach((keywordsObj: any) => {
          if (
            keywordsObj[this.searchBy] &&
            keywordsObj[this.searchBy]
              .toString()
              .toLowerCase()
              .includes(searchValue)
          ) {
            this.searchActivePlayerIds.push(keywordsObj.player_id);
          }
        });
      }

      this.getActiveUsers();
    } else {
      alert('Please select all inputs');
    }
  }

  search() {
    this.loading = true;
    //console.log(this.apiService.userSearchData);
    this.apiService.userSearchData =
      this.apiService.userSearchData.toLowerCase();

    this.searchActivePlayerIds = [];
    if (this.apiService.userSearchData) {
      this.searchActivePlayerIds.push(-1);
    }

    this.searchKeywords.forEach((keywordsObj: any) => {
      if (
        keywordsObj.keywords
          .toString()
          .toLowerCase()
          .includes(this.apiService.userSearchData)
      ) {
        this.searchActivePlayerIds.push(keywordsObj.player_id);
      }
    });

    this.getActiveUsers();
  }

  inactiveSearch() {
    //console.log(this.apiService.userSearchData);
    this.apiService.inactiveUserSearchData =
      this.apiService.inactiveUserSearchData.toLowerCase();

    this.searchInactivePlayerIds = [];
    if (this.apiService.inactiveUserSearchData) {
      this.searchInactivePlayerIds.push(-1);
    }

    this.searchKeywords.forEach((keywordsObj: any) => {
      if (
        keywordsObj.keywords
          .toString()
          .toLowerCase()
          .includes(this.apiService.inactiveUserSearchData)
      ) {
        this.searchInactivePlayerIds.push(keywordsObj.player_id);
      }
    });

    this.getInactiveUsers();
  }

  unconfirmedSearch() {
    //console.log(this.apiService.userSearchData);
    this.apiService.unconfirmedUserSearchData =
      this.apiService.unconfirmedUserSearchData.toLowerCase();

    this.searchUnconfirmedPlayerIds = [];
    if (this.apiService.unconfirmedUserSearchData) {
      this.searchUnconfirmedPlayerIds.push(-1);
    }

    this.searchKeywords.forEach((keywordsObj: any) => {
      if (
        keywordsObj.keywords
          .toString()
          .toLowerCase()
          .includes(this.apiService.unconfirmedUserSearchData)
      ) {
        this.searchUnconfirmedPlayerIds.push(keywordsObj.player_id);
      }
    });

    this.getUnconfirmedUsers();
  }

  onRowSelect(user: any) {
    window.open('/users/edit/' + user.id, '_blank');
  }

  exportActivePlayers(): void {
    let activePlayerIds = this.searchActivePlayerIds;
    activePlayerIds = activePlayerIds.join();
    this.apiService.getAllActiveUsers(activePlayerIds).subscribe(
      (data: any) => {
        this.excelService.exportAsExcelFile(data.players, 'Active Players');
      },
      (error) => {
        if (error.status == 401) {
          localStorage.clear();
          this.route.navigateByUrl('/login');
        }
      }
    );
  }
  exportInactivePlayers(): void {
    this.apiService.getAllInactiveUsers().subscribe(
      (data: any) => {
        this.excelService.exportAsExcelFile(data.players, 'Inactive Players');
      },
      (error) => {
        if (error.status == 401) {
          localStorage.clear();
          this.route.navigateByUrl('/login');
        }
      }
    );
  }
  exportUnconfirmedPlayers(): void {
    this.apiService.getAllUnconfirmedUsers().subscribe(
      (data: any) => {
        this.excelService.exportAsExcelFile(
          data.players,
          'Unconfirmed Players'
        );
      },
      (error) => {
        if (error.status == 401) {
          localStorage.clear();
          this.route.navigateByUrl('/login');
        }
      }
    );
  }
}
