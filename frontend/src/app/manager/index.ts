import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ManagerComponent } from './manager.component';
import { ManagerCoursesComponent } from './courses/courses.component';
import { ManagerCoursesDetailsComponent } from './courses/details/details.component';
import { ManagerCalendarComponent } from './courses/manager-calendar/manager-calendar.component';
import { CalendarModule } from '../calendar/index';

// async components must be named routes for WebpackAsyncRoute
export const routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      {
        path: '',
        redirectTo: '/manager/courses',
        pathMatch: 'full'
      }, {
        path: 'courses',
        component: ManagerCoursesComponent,
        children: [
          {
            path: ''
          }, {
            path: 'details',
            component: ManagerCoursesDetailsComponent
          }
        ]
      }
    ]
  }
];

@NgModule(
  {
    declarations: [
      // Components / Directives/ Pipes
      ManagerComponent, ManagerCoursesComponent, ManagerCoursesDetailsComponent, ManagerCalendarComponent
    ],
    imports: [
      BrowserModule, FormsModule, RouterModule.forChild(routes), CalendarModule
    ]
  }
)
export default class ManagerModule {
  static routes = routes;
}
