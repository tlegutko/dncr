import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReceptionComponent } from './reception.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseDetailsTitleComponent } from './course-details/title/title.component';
import { ReceptionCalendarComponent } from './reception-calendar/reception-calendar.component';
import { CommonsModule } from 'app/_commons/commons.module';
import { AttendeeModule } from 'app/attendee';
import { CourseModule, CourseResolve } from 'app/course';

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
      CourseDetailsTitleComponent, ReceptionCalendarComponent
    ],
    imports: [
      CommonModule, FormsModule, RouterModule.forChild(routes), CommonsModule, AttendeeModule, CourseModule
    ]
  }
)
export default class ReceptionModule {
  static routes = routes;
}
