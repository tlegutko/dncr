import { RouterConfig } from '@angular/router';
import { NoContent } from './no-content';
import { ReceptionComponent, CourseDetailsComponent } from './reception';
import { AuthGuard } from './auth-guard';
import { Homepage } from './homepage/homepage.component';

export const asyncRoutes: AsyncRoutes = {
  // 'Login': require('es6-promise-loader!./login'),
};

// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
export const prefetchRouteCallbacks: Array<IdleCallbacks> = [];

export const routes: RouterConfig = [
  {
    path: '',
    component: Homepage
  }, {
    path: 'login',
    component: 'Login'
  }, {
    path: 'reception',
    component: ReceptionComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ''
      },
      {
        path: 'course-details',
        component: CourseDetailsComponent
      }
    ]
  }, {
    path: '**',
    component: NoContent
  },
];
