import { Routes } from '@angular/router';
import { NoContent } from './no-content';
import { Homepage } from './homepage/homepage.component';
import { AuthGuard } from './auth-guard';

export const ROUTES: Routes = [
  {
    path: '',
    component: Homepage
  },
  {
    path: 'reception',
    loadChildren: () => System.import('./reception'),
  },
  {
    path: 'manager',
    loadChildren: () => System.import('./manager'),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NoContent
  },
];
