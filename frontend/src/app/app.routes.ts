import { Routes } from '@angular/router';
import { NoContent } from './no-content';
import { Homepage } from './homepage/homepage.component';
import { AuthGuard } from 'app/_commons/auth';

export const ROUTES: Routes = [
  {
    path: '',
    component: Homepage
  },
  {
    path: 'reception',
    loadChildren: () => System.import('./reception/reception.module'),
    canActivate: [AuthGuard]
  },
  {
    path: 'manager',
    loadChildren: () => System.import('./manager/manager.module'),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NoContent
  },
];
