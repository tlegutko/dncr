import { RouterConfig } from '@angular/router';
import { NoContent } from './no-content';
import { Reception } from './reception/reception.component';
import { AuthGuard } from './auth-guard';
import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit/dist/index';
import { Homepage } from './homepage/homepage.component';

export const asyncRoutes: AsyncRoutes = {
  'ManagerComponent': require('es6-promise-loader!./manager'),
  'ManagerCoursesComponent': require('es6-promise-loader!./manager'),
  'ManagerCoursesDetailsComponent': require('es6-promise-loader!./manager'),
  // 'Login': require('es6-promise-loader!./login'),
};

// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
export const prefetchRouteCallbacks: Array<IdleCallbacks> = [
  asyncRoutes['Login'], asyncRoutes['ManagerComponent'],
];

export const routes: RouterConfig = [
  {
    path: '', component: Homepage
  }, {
    path: 'login',
    component: 'Login'
  }, {
    path: 'reception',
    component: Reception,
    canActivate: [AuthGuard]
  }, {
    path: 'manager',
    component: 'ManagerComponent',
    canActivate: [AuthGuard, WebpackAsyncRoute],
    children: [
      {
        path: '',
        redirectTo: '/manager/courses',
        pathMatch: 'full'
      }, {
        path: 'courses',
        component: 'ManagerCoursesComponent',
        canActivate: [WebpackAsyncRoute],
        children: [
          { path: '' }, {
            path: 'details',
            component: 'ManagerCoursesDetailsComponent'
          }
        ]
      }
    ]
  }, {
    path: '**',
    component: NoContent
  },
];
