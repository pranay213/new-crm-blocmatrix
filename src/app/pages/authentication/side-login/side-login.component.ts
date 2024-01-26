import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
// import { LocalStorageService } from 'ngx-store';
import { AppConstants } from 'src/app-constants';
import { BrmService } from 'src/app/services/brm.service';
import * as CryptoJS from 'crypto-js';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  options = this.settings.getOptions();
  Username: string = '';
  Password: string = '';
  QRCode: string = '';
  Token: string = '';
  returnUrl: string;
  message: string;
  AdminID: string;
  ErrorMessage: string;
  firstLogin: boolean = false;
  showChangePassword: boolean = false;
  confirmPassWord: any = '';
  newPassWord: any = '';
  SecretKey: string = '';
  loader: boolean = false;

  constructor(
    private settings: CoreService,
    private router: Router,
    private apiService: ApiService, // public localStorageService: LocalStorageService
    private brmService: BrmService,
    private notificationService: NotificationService
  ) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  async submit() {
    this.message = '';
    console.log(this.form.value);
    this.loader = true;

    let result = await this.loginUser(
      this.form.value.uname,
      this.form.value.password
    );

    // this.router.navigate(['/dashboards/dashboard1']);
  }

  async loginUser(Username: any, Password: any) {
    await this.apiService.loginUser(Username, Password).subscribe(
      (data: any) => {
        if (data.Success) {
          this.verifyToken(data);
          // this.verifyToken(data);
          this.Token = data.token;
          // localStorage.setItem('name',this.)
          this.Username = Username;
          localStorage.setItem(AppConstants.BRM_USER_NAME, Username);
        }
      },
      (error) => {
        this.message = 'Username or Password Invalid';
        this.loader = false;
      }
    );
  }

  verifyToken(data: any) {
    this.AdminID = data.ID;
    this.Token = 'abc';
    this.postToken();
    /*if (data.QRCodeURL) {
      this.SecretKey = data.SecretKey;
      this.QRCode = data.QRCodeURL;
      this.firstLogin = true;
  }*/
  }
  postToken() {
    this.apiService.verifyToken(this.Token, this.AdminID).subscribe(
      (data: any) => {
        // this.localStorageService.set(AppConstants.BRM_TOKEN, data.Token);
        localStorage.setItem(AppConstants.BRM_TOKEN, data.Token);
        this.apiService.setToken(data.Token);
        if (data.Success) {
          if (this.firstLogin) {
            this.showChangePassword = true;
          } else {
            this.getPermissionsAndLogin(data.Type);
          }
        }
      },
      (error) => {
        this.ErrorMessage = error.error.status;
      }
    );
  }

  getPermissionsAndLogin(userType: string) {
    this.apiService.getPermissions(userType).subscribe((permissions: any) => {
      this.brmService.permissions = permissions;
      let permissionsString = JSON.stringify(permissions);
      // let secret = this.localStorageService.get(AppConstants.BRM_USER_NAME);
      let secret: any = localStorage.getItem(AppConstants.BRM_USER_NAME);
      // console.log('secret', secret);

      let permissionCipherText = CryptoJS.AES.encrypt(
        permissionsString,
        secret
      ).toString();
      localStorage.setItem(AppConstants.BRM_PERMISSIONS, permissionCipherText);

      this.notificationService.showError(
        `<h1>Hello <span class="text-green-400 uppercase">${this.Username}</span> ! Welcome to Dice and Reels CRM Dashboard </h1>`,
        'login'
      );
      this.router.navigateByUrl('/dashboard');
      this.loader = false;
    });
  }
}
