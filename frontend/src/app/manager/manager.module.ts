import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager.component';
import { ManagerCoursesComponent } from './courses/courses.component';
import { ManagerInstructorsComponent } from './instructors/instructors.component';
import { ManagerCalendarComponent } from './courses/manager-calendar/manager-calendar.component';
import { InstructorCreateComponent } from './instructors/create/instructor-create.component';
import { CommonsModule } from 'app/_commons/commons.module';
import { AttendeeModule } from 'app/attendee';
import { CourseModule, CourseResolve, CourseErrorsResolve } from 'app/course';
import {
  ManagerCoursesSingleComponent, ManagerCoursesDetailsComponent, ManagerCoursesAttendeesComponent,
  ManagerCoursesActionsComponent, ManagerCourseAttendeesTitleComponent
} from './courses/single';
import { CourseTitleComponent } from './courses/course-title/course-title.component';
import { CourseTimeComponent } from './courses/edit/course-time/course-time.component';
import { CreateCoursePropertiesComponent } from './courses/edit/course-properties/course-properties.component';
import { InstructorsService } from './instructors/instructors.service';
import { LocationsService } from './locations/locations.service';
import { CreateCourseComponent } from './courses/create/create-course.component';
import { EditCourseComponent } from './courses/edit/edit-course.component';

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
              course: CourseResolve,
              courseErrors: CourseErrorsResolve
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
      EditCourseComponent,
      CreateCourseComponent,
      CourseTitleComponent,
      CourseTimeComponent,
      CreateCoursePropertiesComponent
    ],
    imports: [
      CommonModule, FormsModule, RouterModule.forChild(routes), CommonsModule, AttendeeModule, CourseModule
    ],
    providers: [
      InstructorsService, LocationsService
    ]
  }
)
export default class ManagerModule {
  static routes = routes;
}
