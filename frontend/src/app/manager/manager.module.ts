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
import { CourseModule, CourseResolve } from 'app/course';
import {
  ManagerCoursesSingleComponent, ManagerCoursesDetailsComponent, ManagerCoursesAttendeesComponent,
  ManagerCoursesActionsComponent, ManagerCourseAttendeesTitleComponent
} from './courses/single';
import { CreateCourseComponent } from './courses/create/create-course.component';
import { CreateCourseTitleComponent } from './courses/create/course-title/course-title.component';
import { CourseTimesComponent } from './courses/create/course-times/course-times.component';
import { CreateCoursePropertiesComponent } from './courses/create/course-properties/course-properties.component';
import { InstructorsService } from './instructors/instructors.service';
import { LocationsService } from './locations/locations.service';

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
            path: 'create-course',
            component: CreateCourseComponent,
          }, {
            path: ':course-id',
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
      ManagerCourseAttendeesTitleComponent,
      ManagerCoursesActionsComponent,
      ManagerCalendarComponent,
      ManagerInstructorsComponent,
      InstructorCreateComponent,
      CreateCourseComponent,
      CreateCourseTitleComponent,
      CourseTimesComponent,
      CreateCoursePropertiesComponent
    ],
    imports: [
      BrowserModule, FormsModule, RouterModule.forChild(routes), CommonsModule, AttendeeModule, CourseModule
    ],
    providers: [
      InstructorsService, LocationsService
    ]
  }
)
export default class ManagerModule {
  static routes = routes;
}
