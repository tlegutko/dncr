import { Routes } from '@angular/router';
import { AuthGuard } from 'app/_commons/auth';
import { NoContent } from './no-content';
import { Homepage, HomepageGuard } from './homepage';

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Homepage,
    canActivate: [HomepageGuard]
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
