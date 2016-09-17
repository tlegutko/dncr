import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReceptionComponent } from './reception.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseDetailsActionButtonComponent } from './course-details/action-button/action-button.component';
import { CourseDetailsTitleComponent } from './course-details/title/title.component';
import { CreateAttendeeComponent } from '../create-attendee/create-attendee.component';
import { ReceptionCalendarComponent } from './reception-calendar/reception-calendar.component';
import { CalendarModule } from '../calendar/index';
import { Field } from '../field/field.component';

// async components must be named routes for WebpackAsyncRoute
export const routes = [
  {
    path: '',
    component: ReceptionComponent,
    children: [
      {
        path: ''
      }, {
        path: 'course-details',
        component: CourseDetailsComponent
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
      CourseDetailsActionButtonComponent,
      CreateAttendeeComponent, ReceptionCalendarComponent, Field
    ],
    imports: [
      BrowserModule, FormsModule, RouterModule.forChild(routes), CalendarModule
    ]
  }
)
export default class ReceptionModule {
  static routes = routes;
}
