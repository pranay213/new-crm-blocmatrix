import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { MarketerDashboardComponent } from './pages/marketer-dashboard/marketer-dashboard.component';
import { AppBasicTableComponent } from './pages/tables/basic-table/basic-table.component';
import { InternalpageComponent } from './pages/internalpage/internalpage.component';
import { AppSideLoginComponent } from './pages/authentication/side-login/side-login.component';
import { authGuard } from './auth.guard';
import { LiveReportComponent } from './pages/live-report/live-report.component';
import { LiveDepositsComponent } from './pages/live-deposits/live-deposits.component';
import { PlayersComponent } from './pages/players/players.component';
import { GeneralReportComponent } from './pages/general-report/general-report.component';
import { GameReportComponent } from './pages/game-report/game-report.component';
import { AllTransactionsComponent } from './pages/all-transactions/all-transactions.component';
import { DepositsComponent } from './pages/deposits/deposits.component';
import { WithdrawsComponent } from './pages/withdraws/withdraws.component';
import { GamesComponent } from './pages/games/games.component';
import { CouponsComponent } from './pages/coupons/coupons.component';
import { RetentionComponent } from './pages/retention/retention.component';
import { SmsReportComponent } from './pages/sms-report/sms-report.component';
import { SendComponent } from './icons/send/send.component';
import { AffiliatesComponent } from './pages/affiliates/affiliates.component';
import { CreativesComponent } from './pages/creatives/creatives.component';
import { SendSmsComponent } from './pages/send-sms/send-sms.component';

const routes: Routes = [
  {
    path: 'login',
    component: AppSideLoginComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [authGuard],

    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'starter',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboards/dashboards.module').then(
            (m) => m.DashboardsModule
          ),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./pages/forms/forms.module').then((m) => m.FormModule),
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./pages/charts/charts.module').then((m) => m.ChartsModule),
      },
      {
        path: 'apps',
        loadChildren: () =>
          import('./pages/apps/apps.module').then((m) => m.AppsModule),
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./pages/widgets/widgets.module').then((m) => m.WidgetsModule),
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./pages/tables/tables.module').then((m) => m.TablesModule),
      },
      {
        path: 'theme-pages',
        loadChildren: () =>
          import('./pages/theme-pages/theme-pages.module').then(
            (m) => m.ThemePagesModule
          ),
      },
    ],
  },
  {
    path: 'marketer-dashboard',
    title: 'Marketer Dashboard',
    component: FullComponent,
    children: [
      {
        path: '',
        component: MarketerDashboardComponent,
      },
    ],
    data: {
      title: 'Marketer Dashboard ',
    },
  },
  {
    path: 'internal-page',
    title: 'Internal Page',
    component: FullComponent,
    data: {
      title: 'Internal Page',
    },
    children: [
      {
        path: '',
        component: InternalpageComponent,
      },
    ],
  },

  {
    path: 'live-report',
    title: 'live-report',
    component: FullComponent,

    children: [
      {
        path: 'players',
        component: LiveReportComponent,
        data: {
          title: 'All Transactions',
        },
      },
      {
        path: 'deposits',
        component: LiveDepositsComponent,
        data: {
          title: 'Deposits',
        },
      },
    ],
  },

  // {
  //   path: 'live-report',
  //   title: 'live-report',
  //   component: FullComponent,
  //   children: [
  //     {
  //       path: 'players',
  //       component: LiveReportComponent,
  //       data: {
  //         title: 'Live Players',
  //       },
  //     },
  //     {
  //       path: 'deposits',
  //       component: LiveDepositsComponent,
  //       data: {
  //         title: 'Live Deposits',
  //       },
  //     },
  //   ],
  // },
  {
    path: 'players',
    component: FullComponent,
    children: [
      {
        path: '',
        component: PlayersComponent,
        data: {
          title: ' Players',
        },
      },
    ],
  },
  {
    path: 'report',
    component: FullComponent,
    children: [
      {
        path: 'general',
        component: GeneralReportComponent,
        data: {
          title: ' General Report',
        },
      },
      {
        path: 'games',
        component: GameReportComponent,
        data: {
          title: ' Game Report',
        },
      },
    ],
  },
  {
    path: 'transactions',
    title: 'transactions',
    component: FullComponent,

    children: [
      {
        path: 'all',
        component: AllTransactionsComponent,
        data: {
          title: 'All Transactions',
        },
      },
      {
        path: 'deposits',
        component: DepositsComponent,
        data: {
          title: 'Deposits',
        },
      },
      {
        path: 'withdraws',
        component: WithdrawsComponent,
        data: {
          title: 'Withdraw Requests',
        },
      },
    ],
  },
  {
    path: 'games',
    title: 'Games',

    component: FullComponent,
    children: [
      {
        path: '',
        component: GamesComponent,
        data: {
          title: 'Games',
        },
      },
    ],
  },
  {
    path: 'coupons',
    title: 'Coupons',
    data: {
      title: 'Coupons',
    },
    component: FullComponent,
    children: [
      {
        path: '',
        component: CouponsComponent,
        data: {
          title: 'coupons',
        },
      },
    ],
  },
  {
    path: 'retention',
    title: 'Retention',
    data: {
      title: 'retention',
    },
    component: FullComponent,
    children: [
      {
        path: '',
        component: RetentionComponent,
        data: {
          title: 'retention',
        },
      },
    ],
  },
  {
    path: 'sms',
    title: 'SMS Report',
    data: {
      title: 'SMS Report',
    },
    component: FullComponent,
    children: [
      {
        path: 'report',
        component: SmsReportComponent,
        data: {
          title: 'SMS Report',
        },
      },
      {
        path: 'send',
        component: SendSmsComponent,
        data: {
          title: 'SEND SMS',
        },
      },
    ],
  },

  {
    path: 'market',
    title: 'Market',
    data: {
      title: 'Market',
    },
    component: FullComponent,
    children: [
      {
        path: 'affiliates',
        component: AffiliatesComponent,
        data: {
          title: 'Affiliates',
        },
      },
      {
        path: 'creatives',
        component: CreativesComponent,
        data: {
          title: 'Creatives',
        },
      },
    ],
  },
  {
    path: 'report',
    title: 'Report',

    component: FullComponent,
    children: [
      {
        path: 'general',
        component: GeneralReportComponent,
        data: {
          title: 'General Report',
        },
      },
      {
        path: 'games',
        component: GameReportComponent,
        data: {
          title: ' Game Report',
        },
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
      {
        path: 'landingpage',
        loadChildren: () =>
          import('./pages/theme-pages/landingpage/landingpage.module').then(
            (m) => m.LandingPageModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
