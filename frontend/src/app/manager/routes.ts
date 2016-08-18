import { ManagerComponent } from './manager.component';
import { ManagerCoursesComponent } from './courses/courses.component';
import { ManagerCoursesDetailsComponent } from './courses/details/details.component';

export const routes = {
  path: 'manager', component: ManagerComponent,
  children: [
    { path: '', redirectTo: '/manager/courses', pathMatch: 'full' },
    {
      path: 'courses', component: ManagerCoursesComponent, children: [
        { path: '' },
        { path: 'details', component: ManagerCoursesDetailsComponent }
      ]
    }
  ]
};
