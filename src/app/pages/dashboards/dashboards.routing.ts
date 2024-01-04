import { Routes } from '@angular/router';

// dashboards
import { AppDashboard1Component } from './dashboard1/dashboard1.component';
import { AppDashboard2Component } from './dashboard2/dashboard2.component';

export const DashboardsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AppDashboard1Component,
        data: {
          title: 'Analytical',
          urls: [
            // { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Analytical' },
          ],
        },
      },
      {
        path: 'dashboard2',
        component: AppDashboard2Component,
        data: {
          title: 'Marketer',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'eCommerce' },
          ],
        },
      },
    ],
  },
];
