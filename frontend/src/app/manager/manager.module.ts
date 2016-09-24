import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ManagerComponent } from './manager.component';
import { ManagerCoursesComponent } from './courses/courses.component';
import { ManagerInstructorsComponent } from './instructors/instructors.component';
import { ManagerCalendarComponent } from './courses/manager-calendar/manager-calendar.component';
import { InstructorCreateComponent } from './instructors/create/instructor-create.component';
import { CommonsModule } from 'app/_commons/commons.module';
import { AttendeeModule } from 'app/attendee';
import {
  ManagerCoursesSingleComponent, ManagerCoursesDetailsComponent, ManagerCoursesAttendeesComponent,
  ManagerCoursesActionsComponent, CourseResolve
} from './courses/single';
import { CoursesService } from './courses';

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
            path: ':id',
            component: ManagerCoursesSingleComponent,
            children: [
              {
                path: '',
                component: ManagerCoursesDetailsComponent
              }, {
                path: 'actions',
                component: ManagerCoursesActionsComponent
              }, {
                path: 'attendees',
                component: ManagerCoursesAttendeesComponent
              }
            ],
            resolve: {
              course: CourseResolve
            }
          }
        ]
      }, {
        path: 'instructors',
        component: ManagerInstructorsComponent
      }
    ]
  }
];

@NgModule(
  {
    declarations: [
      // Components / Directives/ Pipes
      ManagerComponent,
      ManagerCoursesComponent,
      ManagerCoursesSingleComponent,
      ManagerCoursesDetailsComponent,
      ManagerCoursesAttendeesComponent,
      ManagerCoursesActionsComponent,
      ManagerCalendarComponent,
      ManagerInstructorsComponent,
      InstructorCreateComponent,
    ],
    imports: [
      BrowserModule, FormsModule, RouterModule.forChild(routes), CommonsModule, AttendeeModule
    ],
    providers: [
      CourseResolve, CoursesService
    ]
  }
)
export default class ManagerModule {
  static routes = routes;
}
