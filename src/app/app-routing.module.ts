import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { MarketerDashboardComponent } from './pages/marketer-dashboard/marketer-dashboard.component';
import { AppBasicTableComponent } from './pages/tables/basic-table/basic-table.component';
import { InternalpageComponent } from './pages/internalpage/internalpage.component';
import { AppSideLoginComponent } from './pages/authentication/side-login/side-login.component';
import { authGuard } from './auth.guard';

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
    title: 'Live Report',
    component: FullComponent,
    data: {
      title: 'Live Report',
    },
    children: [
      {
        path: '',
        component: InternalpageComponent,
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
