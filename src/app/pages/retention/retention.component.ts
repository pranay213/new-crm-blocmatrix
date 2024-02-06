import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
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
import { ExcelService } from 'src/app/excel.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  standalone: true,
  selector: 'app-retention',
  templateUrl: './retention.component.html',
  styleUrls: ['./retention.component.scss'],
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
  ],
})
export class RetentionComponent implements OnInit {
  showDialog: boolean = false;
  datamessage: string = '';
  smsTiming: string = 'LATER';
  scheduleTime: any;
  todayDate: any;
  /*datasource: [];*/

  users: any = [];
  totalRecords: number;

  loading: boolean;
  limit: number;
  currentPage: number;
  searchBy: any;
  condition: any;
  searchValue: any;
  orderBy: any;
  orderType: any;
  countries: any;
  countryId: any;
  postData: any;

  countryMatch: any;
  countryValue: any;
  countryMatches: any = ['Yes', 'No'];

  totalDepositCondition: any;
  totalDepositValue: any;
  totalDepositConditions: any = [
    { key: 'equal', val: 'Equal (=)' },
    { key: 'greater', val: 'Greater Than (>)' },
    { key: 'less', val: 'Less Than (<)' },
    { key: 'greater_equal', val: 'Greater Than & Equal (>=)' },
    { key: 'less_equal', val: 'Less Than & Equal (<=)' },
  ];

  depositCountCondition: any;
  depositCountValue: any;
  depositCountConditions: any = [
    { key: 'equal', val: 'Equal (=)' },
    { key: 'greater', val: 'Greater Than (>)' },
    { key: 'less', val: 'Less Than (<)' },
    { key: 'greater_equal', val: 'Greater Than & Equal (>=)' },
    { key: 'less_equal', val: 'Less Than & Equal (<=)' },
  ];

  /*lastLoginCondition:any;
    lastLoginValue:any;
    lastLoginConditions:any = [
        {key: "equal", val: "Equal (=)"},
        {key: "greater", val: "Greater Than (>)"},
        {key: "less", val: "Less Than (<)"},
        {key: "greater_equal", val: "Greater Than & Equal (>=)"},
        {key: "less_equal", val: "Less Than & Equal (<=)"}
    ];*/

  fromLoginValue: any;
  toLoginValue: any;

  /*lastDepositCondition:any;
    lastDepositValue:any;
    lastDepositConditions:any = [
        {key: "equal", val: "Equal (=)"},
        {key: "greater", val: "Greater Than (>)"},
        {key: "less", val: "Less Than (<)"},
        {key: "greater_equal", val: "Greater Than & Equal (>=)"},
        {key: "less_equal", val: "Less Than & Equal (<=)"}
    ];*/

  fromDepositValue: any;
  toDepositValue: any;

  fromRegistrationValue: any;
  toRegistrationValue: any;

  accountStatus: any;
  allStatuses: any = [
    { key: '1', val: 'Active' },
    { key: '0', val: 'Inactive' },
    { key: '-1', val: 'Both' },
  ];

  totalWithdrawalCondition: any;
  totalWithdrawalValue: any;
  totalWithdrawalConditions: any = [
    { key: 'equal', val: 'Equal (=)' },
    { key: 'greater', val: 'Greater Than (>)' },
    { key: 'less', val: 'Less Than (<)' },
    { key: 'greater_equal', val: 'Greater Than & Equal (>=)' },
    { key: 'less_equal', val: 'Less Than & Equal (<=)' },
  ];

  pendingWithdrawalCondition: any;
  pendingWithdrawalValue: any;
  pendingWithdrawalConditions: any = [
    { key: 'equal', val: 'Equal (=)' },
    { key: 'greater', val: 'Greater Than (>)' },
    { key: 'less', val: 'Less Than (<)' },
    { key: 'greater_equal', val: 'Greater Than & Equal (>=)' },
    { key: 'less_equal', val: 'Less Than & Equal (<=)' },
  ];

  firstNameMatch: any;
  firstNameValue: any;
  firstNameMatches: any = ['Yes', 'No'];

  lastNameMatch: any;
  lastNameValue: any;
  lastNameMatches: any = ['Yes', 'No'];

  usernameMatch: any;
  usernameValue: any;
  usernameMatches: any = ['Yes', 'No'];

  emailMatch: any;
  emailValue: any;
  emailMatches: any = ['Yes', 'No'];

  mobileMatch: any;
  mobileValue: any;
  mobileMatches: any = ['Yes', 'No'];

  smsSubscribedStatus: any;
  allSmsSubscribedStatuses: any = [
    { key: '1', val: 'Yes' },
    { key: '0', val: 'No' },
  ];

  mailSubscribedStatus: any;
  allMailSubscribedStatuses: any = [
    { key: '1', val: 'Yes' },
    { key: '0', val: 'No' },
  ];

  allSearchOptions: any = [
    { key: 'deposits_count', val: 'Deposits Count' },
    { key: 'total_deposits', val: 'Total Deposits' },
    { key: 'balance', val: 'Balance' },
  ];

  allOrderTypes: any = [
    { key: 1, val: 'Ascending' },
    { key: -1, val: 'Descending' },
  ];

  allOrderBy: any = [];

  cols: any = [
    { header: 'Username', field: 'username' },
    { header: 'First Name', field: 'firstname' },
    { header: 'Last Name', field: 'lastname' },
    { header: 'Email', field: 'email' },
    { header: 'Telephone', field: 'mobile' },
    { header: 'Country', field: 'country_name' },
    { header: 'Balance', field: 'balance' },
    { header: 'Deposits Count', field: 'noof_deposits' },
    { header: 'Total Deposits', field: 'total_deposit' },
    { header: 'Total Withdrawals', field: 'real_chips_withdrawal' },
    { header: 'Last Login', field: 'last_login' },
  ];

  searchFields: any = {
    country_name: false,
    affiliate: false,
    total_deposit: false,
    noof_deposits: false,
    last_login: false,
    last_deposited_at: false,
    created_at: false,
    status: false,
    casino_brand: false,
    real_chips_withdrawal: false,
    on_hold_real_chips_withdrawal: false,
    firstname: false,
    lastname: false,
    username: false,
    email: false,
    mobile: false,
    sms_subscribed: false,
    mail_subscribed: false,
  };

  orderByFields: any = {
    country_name: 'Country',
    affiliate: 'Affiliate',
    total_deposit: 'Total Deposits',
    noof_deposits: 'Deposits Count',
    last_login: 'Last Login Date',
    last_deposited_at: 'Last Deposit Date',
    created_at: 'Registration Date',
    status: 'Account Status',
    casino_brand: 'Casino Brand',
    real_chips_withdrawal: 'Total Withdrawals',
    on_hold_real_chips_withdrawal: 'Pending Withdrawals',
    firstname: 'First Name',
    lastname: 'Last Name',
    username: 'Username',
    email: 'Email',
    mobile: 'Mobile',
    sms_subscribed: 'SMS Subscribed',
    mail_subscribed: 'Mail Subscribed',
  };

  showCountry: any = false;
  showAffiliate: any = false;
  showTotalDeposits: any = false;
  showDepositsCount: any = false;
  showLastLoginDate: any = false;
  showLastDepositDate: any = false;
  showRegistrationDate: any = false;
  showStatus: any = false;
  showCasinoBrand: any = false;
  showTotalWithdrawals: any = false;
  showPendingWithdrawals: any = false;
  showFirstName: any = false;
  showLastName: any = false;
  showUsername: any = false;
  showEmail: any = false;
  showMobile: any = false;
  showSMSSubscribed: any = false;
  showMailSubscribed: any = false;
  showSubmit: any = false;
  showSMS: any = false;

  showSearchBox: boolean = true;
  playerCategories: any = [
    { key: 'newbie', value: 'Newbie' },
    { key: 'active_player', value: 'Active Player' },
    { key: 'recurring_player', value: 'Recurring Player' },
    { key: 'loyal_player', value: 'Loyal Player' },
    { key: 'vip_1', value: 'VIP 1' },
    { key: 'vip_2', value: 'VIP 2' },
    { key: 'super_vip', value: 'Super VIP' },
  ];
  selectedPlayerCategory: any;

  constructor(
    private apiService: ApiService,
    private route: Router,
    private excelService: ExcelService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    let date: any = new Date();
    let dateGMT: any = this.changeTimezone(date, 'Etc/GMT');

    let currentDate: any = this.datePipe.transform(
      dateGMT.setDate(dateGMT.getDate()),
      'yyyy-MM-dd'
    );

    this.todayDate = new Date(currentDate);

    this.limit = 10;
    this.currentPage = 1;

    this.apiService.getAllCountries().subscribe(
      (data: any) => {
        if (data.success) {
          this.countries = data.data;
        } else {
          alert(data.message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadCarsLazy(event: any) {
    //console.log(event);
    this.currentPage = event.first / event.rows + 1;
    this.limit = event.rows;

    /*if(this.searchBy && this.condition && this.searchValue){
            this.loading = true;
            this.apiService.getRetentionReport(this.searchBy, this.condition, this.orderBy, this.searchValue, this.currentPage, this.limit).subscribe((data: any) => {
                if(data.success){
                    this.users = data.report;
                    this.totalRecords = data.total_records;
                }
                else{
                    alert(data.message);
                }
                this.loading = false;
            }, error => {
                console.log(error);
            });
        }*/
    if (this.postData) {
      this.postData['limit'] = this.limit;
      this.postData['page'] = this.currentPage;
      (this.postData['sort_by'] = this.orderBy
        ? Object.keys(this.orderByFields).find(
            (key) => this.orderByFields[key] === this.orderBy
          )
        : 'player_id'),
        (this.postData['sort_order'] = this.orderType ? this.orderType : -1),
        this.apiService.getRetentionReport(this.postData).subscribe(
          (data: any) => {
            if (data.success) {
              if (data.report) {
                data.report.forEach(function (value: any, index: any) {
                  data.report[index]['balance'] = parseFloat(
                    data.report[index]['balance']
                  ).toFixed(2);
                  data.report[index]['total_deposit'] = parseFloat(
                    data.report[index]['total_deposit']
                  ).toFixed(2);
                  data.report[index]['real_chips_withdrawal'] = parseFloat(
                    data.report[index]['real_chips_withdrawal']
                  ).toFixed(2);
                });
              }
              this.users = data.report;
              this.totalRecords = data.total_records;
            } else {
              alert(data.message);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  onRowSelect(user: any) {
    window.open('/users/edit/' + user.player_id, '_blank');
  }

  applyFilter(event: any, searchField: any) {
    let index = this.allOrderBy.indexOf(this.orderByFields[searchField]);
    if (index > -1) {
      this.allOrderBy.splice(index, 1);
    }

    switch (searchField) {
      case 'country_name':
        this.showCountry = false;
        if (event.target.checked) {
          this.showCountry = true;
          this.allOrderBy.push(this.orderByFields[searchField]);
        } else {
          this.countryId = '';
        }
        break;
      case 'affiliate':
        this.showAffiliate = false;
        if (event.target.checked) {
          this.showAffiliate = true;
          this.allOrderBy.push(this.orderByFields[searchField]);
        }
        break;
      case 'total_deposit':
        this.showTotalDeposits = false;
        if (event.target.checked) {
          this.showTotalDeposits = true;
          this.allOrderBy.push(this.orderByFields[searchField]);
        } else {
          this.totalDepositCondition = '';
          this.totalDepositValue = '';
        }
        break;
      case 'noof_deposits':
        this.showDepositsCount = false;
        if (event.target.checked) {
          this.showDepositsCount = true;
          this.allOrderBy.push(this.orderByFields[searchField]);
        } else {
          this.depositCountCondition = '';
          this.depositCountValue = '';
        }
        break;
      case 'last_login':
        this.showLastLoginDate = false;
        if (event.target.checked) {
          this.showLastLoginDate = true;
          this.allOrderBy.push(this.orderByFields[searchField]);
        } else {
          //this.lastLoginCondition = '';
          //this.lastLoginValue = '';
          this.fromLoginValue = '';
          this.toLoginValue = '';
        }
        break;
      case 'last_deposited_at':
        this.showLastDepositDate = false;
        if (event.target.checked) {
          this.showLastDepositDate = true;
          this.allOrderBy.push(this.orderByFields[searchField]);
        } else {
          //this.lastDepositCondition = '';
          //this.lastDepositValue = '';
          this.fromDepositValue = '';
          this.toDepositValue = '';
        }
        break;
      case 'created_at':
        this.showRegistrationDate = false;
        if (event.target.checked) {
          this.showRegistrationDate = true;
          this.allOrderBy.push(this.orderByFields[searchField]);
        } else {
          this.fromRegistrationValue = '';
          this.toRegistrationValue = '';
        }
        break;
      case 'status':
        this.showStatus = false;
        if (event.target.checked) {
          this.showStatus = true;
          this.allOrderBy.push(this.orderByFields[searchField]);
        } else {
          this.accountStatus = '';
        }
        break;
      case 'casino_brand':
        this.showCasinoBrand = false;
        if (event.target.checked) {
          this.showCasinoBrand = true;
          this.allOrderBy.push(this.orderByFields[searchField]);
        }
        break;
      case 'real_chips_withdrawal':
        this.showTotalWithdrawals = false;
        if (event.target.checked) {
          this.showTotalWithdrawals = true;
          this.allOrderBy.push(this.orderByFields[searchField]);
        } else {
          this.totalWithdrawalCondition = '';
          this.totalWithdrawalValue = '';
        }
        break;
      case 'on_hold_real_chips_withdrawal':
        this.showPendingWithdrawals = false;
        if (event.target.checked) {
          this.showPendingWithdrawals = true;
          this.allOrderBy.push(this.orderByFields[searchField]);
        } else {
          this.pendingWithdrawalCondition = '';
          this.pendingWithdrawalValue = '';
        }
        break;
      case 'firstname':
        this.showFirstName = false;
        if (event.target.checked) {
          this.showFirstName = true;
          this.allOrderBy.push(this.orderByFields[searchField]);
        } else {
          this.firstNameMatch = '';
          this.firstNameValue = '';
        }
        break;
      case 'lastname':
        this.showLastName = false;
        if (event.target.checked) {
          this.showLastName = true;
          this.allOrderBy.push(this.orderByFields[searchField]);
        } else {
          this.lastNameMatch = '';
          this.lastNameValue = '';
        }
        break;
      case 'username':
        this.showUsername = false;
        if (event.target.checked) {
          this.showUsername = true;
          this.allOrderBy.push(this.orderByFields[searchField]);
        } else {
          this.usernameMatch = '';
          this.usernameValue = '';
        }
        break;
      case 'email':
        this.showEmail = false;
        if (event.target.checked) {
          this.showEmail = true;
          this.allOrderBy.push(this.orderByFields[searchField]);
        } else {
          this.emailMatch = '';
          this.emailValue = '';
        }
        break;
      case 'mobile':
        this.showMobile = false;
        if (event.target.checked) {
          this.showMobile = true;
          this.allOrderBy.push(this.orderByFields[searchField]);
        } else {
          this.mobileMatch = '';
          this.mobileValue = '';
        }
        break;
      case 'sms_subscribed':
        this.showSMSSubscribed = false;
        if (event.target.checked) {
          this.showSMSSubscribed = true;
          this.allOrderBy.push(this.orderByFields[searchField]);
        } else {
          this.smsSubscribedStatus = '';
        }
        break;
      case 'mail_subscribed':
        this.showMailSubscribed = false;
        if (event.target.checked) {
          this.showMailSubscribed = true;
          this.allOrderBy.push(this.orderByFields[searchField]);
        } else {
          this.mailSubscribedStatus = '';
        }
        break;
    }

    if (
      this.showCountry ||
      this.showAffiliate ||
      this.showTotalDeposits ||
      this.showDepositsCount ||
      this.showLastLoginDate ||
      this.showLastDepositDate ||
      this.showRegistrationDate ||
      this.showStatus ||
      this.showCasinoBrand ||
      this.showTotalWithdrawals ||
      this.showPendingWithdrawals ||
      this.showFirstName ||
      this.showLastName ||
      this.showUsername ||
      this.showEmail ||
      this.showMobile ||
      this.showSMSSubscribed ||
      this.showMailSubscribed
    ) {
      this.showSubmit = true;
    }
  }

  showMessageDialog() {
    this.showDialog = true;
  }

  hideMessageDialog() {
    this.showDialog = false;
  }

  sendMessage(event: any, fieldName: any) {
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    //timezone = 'America/Chicago';
    let scheduledAt = this.datePipe.transform(
      this.scheduleTime,
      'yyyy-MM-dd HH:mm:ss'
    );
    let postData = {
      message: this.datamessage,
      send: this.smsTiming,
      scheduled_at: scheduledAt,
      timezone: timezone,
    };
    this.apiService.sendSms(postData).subscribe(
      (data: any) => {
        this.showDialog = false;
        alert(
          'SMS Queue has been generated successfully. To check status, please go to SMS page'
        );
      },
      (error) => {
        this.showDialog = false;
        console.log(error);
        alert('Some issue occured while generating SMS queue');
      }
    );
  }

  applySearch() {
    if (
      (this.totalDepositCondition && !this.totalDepositValue) ||
      (!this.totalDepositCondition && this.totalDepositValue) ||
      (this.depositCountCondition && !this.depositCountValue) ||
      (!this.depositCountCondition && this.depositCountValue) ||
      (this.fromLoginValue && !this.toLoginValue) ||
      (!this.fromLoginValue && this.toLoginValue) ||
      (this.fromDepositValue && !this.toDepositValue) ||
      (!this.fromDepositValue && this.toDepositValue) ||
      (this.fromRegistrationValue && !this.toRegistrationValue) ||
      (!this.fromRegistrationValue && this.toRegistrationValue) ||
      (this.totalWithdrawalCondition && !this.totalWithdrawalValue) ||
      (!this.totalWithdrawalCondition && this.totalWithdrawalValue) ||
      (this.pendingWithdrawalCondition && !this.pendingWithdrawalValue) ||
      (!this.pendingWithdrawalCondition && this.pendingWithdrawalValue) ||
      (this.firstNameMatch && !this.firstNameValue) ||
      (!this.firstNameMatch && this.firstNameValue) ||
      (this.lastNameMatch && !this.lastNameValue) ||
      (!this.lastNameMatch && this.lastNameValue) ||
      (this.usernameMatch && !this.usernameValue) ||
      (!this.usernameMatch && this.usernameValue) ||
      (this.emailMatch && !this.emailValue) ||
      (!this.emailMatch && this.emailValue) ||
      (this.mobileMatch && !this.mobileValue) ||
      (!this.mobileMatch && this.mobileValue)
    ) {
      alert('Please select both, condition / match and value');
      return;
    }
    let postArray: any = [];
    if (this.countryId) {
      let postObj: any = {};
      postObj['field_name'] = 'country_id';
      postObj['condition'] = '';
      postObj['value'] = this.countryId;

      postArray.push(postObj);
    }
    if (this.totalDepositCondition && this.totalDepositValue) {
      let postObj: any = {};
      postObj['field_name'] = 'total_deposit';
      postObj['condition'] = this.totalDepositCondition;
      postObj['value'] = this.totalDepositValue;

      postArray.push(postObj);
    }
    if (this.depositCountCondition && this.depositCountValue) {
      let postObj: any = {};
      postObj['field_name'] = 'noof_deposits';
      postObj['condition'] = this.depositCountCondition;
      postObj['value'] = this.depositCountValue;

      postArray.push(postObj);
    }
    if (this.fromLoginValue && this.toLoginValue) {
      let fromLoginDate = new Date(
        Date.UTC(
          this.fromLoginValue.getFullYear(),
          this.fromLoginValue.getMonth(),
          this.fromLoginValue.getDate()
        )
      ).toISOString();
      let toLoginDate = new Date(
        Date.UTC(
          this.toLoginValue.getFullYear(),
          this.toLoginValue.getMonth(),
          this.toLoginValue.getDate()
        )
      ).toISOString();
      let postObj: any = {};
      postObj['field_name'] = 'last_login';
      postObj['condition'] = 'between';
      postObj['value'] = fromLoginDate + '|' + toLoginDate;

      postArray.push(postObj);
    }
    if (this.fromDepositValue && this.toDepositValue) {
      let fromDepositDate = new Date(
        Date.UTC(
          this.fromDepositValue.getFullYear(),
          this.fromDepositValue.getMonth(),
          this.fromDepositValue.getDate()
        )
      ).toISOString();
      let toDepositDate = new Date(
        Date.UTC(
          this.toDepositValue.getFullYear(),
          this.toDepositValue.getMonth(),
          this.toDepositValue.getDate()
        )
      ).toISOString();
      let postObj: any = {};
      postObj['field_name'] = 'last_deposited_at';
      postObj['condition'] = 'between';
      postObj['value'] = fromDepositDate + '|' + toDepositDate;

      postArray.push(postObj);
    }
    if (this.fromRegistrationValue && this.toRegistrationValue) {
      let fromRegistrationDate = new Date(
        Date.UTC(
          this.fromRegistrationValue.getFullYear(),
          this.fromRegistrationValue.getMonth(),
          this.fromRegistrationValue.getDate()
        )
      ).toISOString();
      let toRegistrationDate = new Date(
        Date.UTC(
          this.toRegistrationValue.getFullYear(),
          this.toRegistrationValue.getMonth(),
          this.toRegistrationValue.getDate()
        )
      ).toISOString();
      let postObj: any = {};
      postObj['field_name'] = 'created_at';
      postObj['condition'] = 'between';
      postObj['value'] = fromRegistrationDate + '|' + toRegistrationDate;

      postArray.push(postObj);
    }
    if (this.accountStatus) {
      let postObj: any = {};
      postObj['field_name'] = 'status';
      postObj['condition'] = '';
      postObj['value'] = this.accountStatus;

      postArray.push(postObj);
    }
    if (this.totalWithdrawalCondition && this.totalWithdrawalValue) {
      let postObj: any = {};
      postObj['field_name'] = 'real_chips_withdrawal';
      postObj['condition'] = this.totalWithdrawalCondition;
      postObj['value'] = this.totalWithdrawalValue;

      postArray.push(postObj);
    }
    if (this.pendingWithdrawalCondition && this.pendingWithdrawalValue) {
      let postObj: any = {};
      postObj['field_name'] = 'on_hold_real_chips_withdrawal';
      postObj['condition'] = this.pendingWithdrawalCondition;
      postObj['value'] = this.pendingWithdrawalValue;

      postArray.push(postObj);
    }
    if (this.firstNameMatch && this.firstNameValue) {
      let postObj: any = {};
      postObj['field_name'] = 'firstname';
      postObj['condition'] = this.firstNameMatch;
      postObj['value'] = this.firstNameValue;

      postArray.push(postObj);
    }
    if (this.lastNameMatch && this.lastNameValue) {
      let postObj: any = {};
      postObj['field_name'] = 'lastname';
      postObj['condition'] = this.lastNameMatch;
      postObj['value'] = this.lastNameValue;

      postArray.push(postObj);
    }
    if (this.usernameMatch && this.usernameValue) {
      let postObj: any = {};
      postObj['field_name'] = 'username';
      postObj['condition'] = this.usernameMatch;
      postObj['value'] = this.usernameValue;

      postArray.push(postObj);
    }
    if (this.emailMatch && this.emailValue) {
      let postObj: any = {};
      postObj['field_name'] = 'email';
      postObj['condition'] = this.emailMatch;
      postObj['value'] = this.emailValue;

      postArray.push(postObj);
    }
    if (this.mobileMatch && this.mobileValue) {
      let postObj: any = {};
      postObj['field_name'] = 'mobile';
      postObj['condition'] = this.mobileMatch;
      postObj['value'] = this.mobileValue;

      postArray.push(postObj);
    }
    if (this.smsSubscribedStatus) {
      let postObj: any = {};
      postObj['field_name'] = 'sms_subscriptions';
      postObj['condition'] = '';
      postObj['value'] = this.smsSubscribedStatus;

      postArray.push(postObj);
    }
    if (this.mailSubscribedStatus) {
      let postObj: any = {};
      postObj['field_name'] = 'newsletter_subscriptions';
      postObj['condition'] = '';
      postObj['value'] = this.mailSubscribedStatus;

      postArray.push(postObj);
    }
    this.postData = {
      sort_by: this.orderBy
        ? Object.keys(this.orderByFields).find(
            (key) => this.orderByFields[key] === this.orderBy
          )
        : 'player_id',
      sort_order: this.orderType ? this.orderType : -1,
      query_fields: postArray,
      limit: this.limit,
      page: this.currentPage,
    };
    /*console.log("Country - ", this.countryId);
        console.log("Total Deposit - ", this.totalDepositCondition, this.totalDepositValue);
        console.log("Deposit Count - ", this.depositCountCondition, this.depositCountValue);
        console.log("Last Login - ", this.lastLoginCondition, this.lastLoginValue);
        console.log("Last Deposit - ", this.lastDepositCondition, this.lastDepositValue);
        console.log("Account Status - ", this.accountStatus);
        console.log("Total Withdrawals - ", this.totalWithdrawalCondition, this.totalWithdrawalValue);
        console.log("Pending Withdrawals - ", this.pendingWithdrawalCondition, this.pendingWithdrawalValue);
        console.log("First Name - ", this.firstNameMatch, this.firstNameValue);
        console.log("Last Name - ", this.lastNameMatch, this.lastNameValue);
        console.log("Username - ", this.usernameMatch, this.usernameValue);
        console.log("Email - ", this.emailMatch, this.emailValue);
        console.log("Mobile - ", this.mobileMatch, this.mobileValue);*/
    //console.log(postData);
    this.apiService.getRetentionReport(this.postData).subscribe(
      (data: any) => {
        if (data.success) {
          if (data.report) {
            data.report.forEach(function (value: any, index: any) {
              data.report[index]['balance'] = parseFloat(
                data.report[index]['balance']
              ).toFixed(2);
              data.report[index]['total_deposit'] = parseFloat(
                data.report[index]['total_deposit']
              ).toFixed(2);
              data.report[index]['real_chips_withdrawal'] = parseFloat(
                data.report[index]['real_chips_withdrawal']
              ).toFixed(2);
            });
          }
          this.users = data.report;
          this.totalRecords = data.total_records;
          this.showSMS = true;
        } else {
          alert(data.message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    /*if(this.searchBy && this.condition && this.searchValue){
            this.loading = true;
            this.apiService.getRetentionReport(this.searchBy, this.condition, this.orderBy, this.searchValue, this.currentPage, this.limit).subscribe((data: any) => {
                if(data.success){
                    this.users = data.report;
                    this.totalRecords = data.total_records;
                }
                else{
                    alert(data.message);
                }
                this.loading = false;
            }, error => {
                console.log(error);
            });
        }
        else{
            alert("Please select all inputs");
        }*/
  }

  changeTimezone(date: any, ianatz: any) {
    // suppose the date is 12:00 UTC
    var invdate = new Date(date.toLocaleString('en-US', { timeZone: ianatz }));

    // then invdate will be 07:00 in Toronto
    // and the diff is 5 hours
    var diff = date.getTime() - invdate.getTime();

    // so 12:00 in Toronto is 17:00 UTC
    return new Date(date.getTime() - diff);
  }

  exportReport(): void {
    if (this.postData) {
      this.postData['limit'] = -1;
      this.postData['page'] = -1;
      this.apiService.getRetentionReport(this.postData).subscribe(
        (data: any) => {
          if (data.success) {
            if (data.report) {
              let downloadableReport: any = [];
              let allColumns: any = this.cols;
              data.report.forEach(function (value: any, index: any) {
                value['balance'] = parseFloat(value['balance']).toFixed(2);
                value['total_deposit'] = parseFloat(
                  value['total_deposit']
                ).toFixed(2);
                value['real_chips_withdrawal'] = parseFloat(
                  value['real_chips_withdrawal']
                ).toFixed(2);
                let report: any = {};
                allColumns.forEach(function (colValue: any) {
                  report[colValue['header']] = value[colValue['field']];
                });
                report['Mobile With Phonecode'] = value['phonecode_mobile'];
                downloadableReport.push(report);
              });
              this.excelService.exportAsExcelFile(
                downloadableReport,
                'Retention Tool'
              );
            }
          } else {
            alert(data.message);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      alert('You have to select at least one search criteria');
    }
  }

  onChangeSearchCriteria(type: any) {
    if (type == 'category') {
      this.showSearchBox = false;
    } else {
      this.showSearchBox = true;
    }
  }

  onSelectCategory() {
    let postArray: any = [];
    let postObj: any = {};

    switch (this.selectedPlayerCategory) {
      case 'newbie':
        postObj['field_name'] = 'noof_deposits';
        postObj['condition'] = 'equal';
        postObj['value'] = 0;
        this.orderBy = 'Deposits Count';
        break;
      case 'active_player':
        postObj['field_name'] = 'noof_deposits';
        postObj['condition'] = 'between';
        postObj['min_value'] = 1;
        postObj['max_value'] = 3;
        this.orderBy = 'Deposits Count';
        break;
      case 'recurring_player':
        postObj['field_name'] = 'noof_deposits';
        postObj['condition'] = 'between';
        postObj['min_value'] = 3;
        postObj['max_value'] = 10;
        this.orderBy = 'Deposits Count';
        break;
      case 'loyal_player':
        postObj['field_name'] = 'noof_deposits';
        postObj['condition'] = 'greater';
        postObj['value'] = 10;
        this.orderBy = 'Deposits Count';
        break;
      case 'vip_1':
        postObj['field_name'] = 'total_deposit';
        postObj['condition'] = 'greater';
        postObj['value'] = 5000;
        this.orderBy = 'Total Deposits';
        break;
      case 'vip_2':
        postObj['field_name'] = 'total_deposit';
        postObj['condition'] = 'greater';
        postObj['value'] = 10000;
        this.orderBy = 'Total Deposits';
        break;
      case 'super_vip':
        postObj['field_name'] = 'total_deposit';
        postObj['condition'] = 'greater';
        postObj['value'] = 50000;
        this.orderBy = 'Total Deposits';
        break;
    }

    postArray.push(postObj);
    this.orderType = 1;
    this.limit = 10;
    this.currentPage = 1;

    this.postData = {
      sort_by: this.orderBy
        ? Object.keys(this.orderByFields).find(
            (key) => this.orderByFields[key] === this.orderBy
          )
        : 'player_id',
      sort_order: this.orderType ? this.orderType : -1,
      query_fields: postArray,
      limit: this.limit,
      page: this.currentPage,
    };
    this.apiService.getRetentionReport(this.postData).subscribe(
      (data: any) => {
        if (data.success) {
          if (data.report) {
            data.report.forEach(function (value: any, index: any) {
              data.report[index]['balance'] = parseFloat(
                data.report[index]['balance']
              ).toFixed(2);
              data.report[index]['total_deposit'] = parseFloat(
                data.report[index]['total_deposit']
              ).toFixed(2);
              data.report[index]['real_chips_withdrawal'] = parseFloat(
                data.report[index]['real_chips_withdrawal']
              ).toFixed(2);
            });
          }
          this.users = data.report;
          this.totalRecords = data.total_records;
          this.showSMS = true;
        } else {
          alert(data.message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
