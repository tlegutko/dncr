import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReceptionComponent } from './reception.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseDetailsTitleComponent } from './course-details/title/title.component';
import { ReceptionCalendarComponent } from './reception-calendar/reception-calendar.component';
import { CommonsModule } from 'app/_commons/commons.module';
import { AttendeeModule } from 'app/attendee';
import { CourseModule, CourseResolve } from 'app/course';
import { AttendeeDetailsComponent } from './attendee-details/attendee-details.component';
import { AttendeeDetailsTitleComponent } from './attendee-details/title/title.component';

// async components must be named routes for WebpackAsyncRoute
export const routes = [
  {
    path: '',
    component: ReceptionComponent,
    children: [
      {
        path: ''
      }, {
        path: 'course-details/:id',
        component: CourseDetailsComponent,
        resolve: {
          course: CourseResolve
        }
      }, {
        path: 'course-details/:course-id/attendee-details/:attendee-id',
        component: AttendeeDetailsComponent
      }
    ]
  }
];

@NgModule(
  {
    declarations: [
      // Components / Directives/ Pipes
      ReceptionComponent,
      CourseDetailsComponent,
      CourseDetailsTitleComponent,
      ReceptionCalendarComponent,
      AttendeeDetailsComponent,
      AttendeeDetailsTitleComponent
    ],
    imports: [
      BrowserModule, FormsModule, RouterModule.forChild(routes), CommonsModule, AttendeeModule, CourseModule
    ]
  }
)
export default class ReceptionModule {
  static routes = routes;
}
