import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReceptionComponent } from './reception.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseDetailsTitleComponent } from './course-details/title/title.component';
import { ReceptionCalendarComponent } from './reception-calendar/reception-calendar.component';
import { CommonsModule } from 'app/_commons/commons.module';
import { AttendeeModule, AttendeeResolve } from 'app/attendee';
import { CourseModule, CourseResolve, PaymentMethodsResolve } from 'app/course';
import { AttendeeDetailsComponent } from './attendee-details/attendee-details.component';
import { AttendeeDetailsTitleComponent } from './attendee-details/title/title.component';
import { AttendeeActionButtonComponent } from './attendee-details/action-button';

// async components must be named routes for WebpackAsyncRoute
export const routes = [
  {
    path: '',
    component: ReceptionComponent,
    children: [
      {
        path: ''
      }, {
        path: 'course-details/:course-id',
        component: CourseDetailsComponent,
        resolve: {
          course: CourseResolve,
          methods: PaymentMethodsResolve
        }
      }, {
        path: 'course-details/:course-id/attendee/:attendee-id',
        component: AttendeeDetailsComponent,
        resolve: {
          course: CourseResolve,
          attendee: AttendeeResolve
        }
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
      AttendeeDetailsTitleComponent,
      AttendeeActionButtonComponent
    ],
    imports: [
      CommonModule, FormsModule, RouterModule.forChild(routes), CommonsModule, AttendeeModule, CourseModule, NgbModule
    ]
  }
)
export default class ReceptionModule {
  static routes = routes;
}
