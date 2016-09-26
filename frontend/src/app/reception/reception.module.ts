import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReceptionComponent } from './reception.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseDetailsActionButtonComponent } from './course-details/action-button/action-button.component';
import { CourseDetailsTitleComponent } from './course-details/title/title.component';
import { ReceptionCalendarComponent } from './reception-calendar/reception-calendar.component';
import { CommonsModule } from 'app/_commons/commons.module';
import { AttendeeModule } from 'app/attendee';

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
      CourseDetailsActionButtonComponent, ReceptionCalendarComponent
    ],
    imports: [
      BrowserModule, FormsModule, RouterModule.forChild(routes), CommonsModule, AttendeeModule
    ]
  }
)
export default class ReceptionModule {
  static routes = routes;
}
