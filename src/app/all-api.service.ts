import { Injectable } from '@angular/core';
import axios from 'axios';
import config from 'config';
import { NotificationService } from './services/notification.service';
@Injectable({
  providedIn: 'root',
})
export class AllApiService {
  constructor(private notificationService: NotificationService) {
    this.Apiurl.interceptors.request.use(
      function (config: any) {
        // Do something before request is sent
        return config;
      },
      function (error: any) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
  }
  Apiurl = axios.create({
    baseURL: config.ADMIN_URL,
    timeout: 10000,
  });

  getDashboardData() {
    // let res = await this.Apiurl.get(
    //   '/admin/dashboard/egamesplay?p=TODAY&r=ALL'
    // );
    return axios
      .get('/admin/dashboard/egamesplay?p=TODAY&r=ALL')
      .then((res) => res.data)
      .catch((err) => this.notificationService.showError(err));
  }

  getData(param1: any, param2: any) {
    // let res = await this.Apiurl.get(
    //   '/admin/dashboard/egamesplay?p=TODAY&r=ALL'
    // );
    return axios
      .get(`/admin/dashboard/egamesplay?p=${param1}&r=${param2}`)
      .then((res) => res.data)
      .catch((err) => this.notificationService.showError(err));
  }
}
