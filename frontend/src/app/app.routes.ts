import { RouterConfig } from '@angular/router';
import { NoContent } from './no-content';
import { Reception } from './reception/reception.component';
import { AuthGuard } from './auth-guard';

export const asyncRoutes: AsyncRoutes = {
  'Login': require('es6-promise-loader!./login'),
};


// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
export const prefetchRouteCallbacks: Array<IdleCallbacks> = [];

export const routes: RouterConfig = [
  {
    path: '', redirectTo: '/reception', pathMatch: 'full'
  },
  {
    path: 'login', component: 'Login'
  },
  {
    path: 'reception', component: Reception, canActivate: [AuthGuard]
  },
  {
    path: '**', component: NoContent
  },
];
