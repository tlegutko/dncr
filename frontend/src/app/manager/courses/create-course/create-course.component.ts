import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { CreateCourseService } from './create-course.service';
import { CreateCourseRequest } from './create-course-request';
import { CreateCourseTitleComponent } from './course-title/course-title.component';
import { CreateCoursePropertiesComponent } from './course-properties/course-properties.component';
import { CourseTimesComponent } from './course-times/course-times.component';
import { CalendarEvent } from '../../../_commons/calendar/calendar-events.interface';

interface CreateCourseErrors {
  name?: string[];
  price?: string[];
  classes_count?: string[];
  seats_count?: string[];
  description?: string[];
  start_date?: string[];
  start_time?: string[];
  end_time?: string[];
  repeat_weeks_count?: string[];
}

@Component(
  {
    selector: 'create-course',
    templateUrl: './create-course.template.html',
    styleUrls: ['./create-course.style.scss'],
    providers: [CreateCourseService],
  }
)
export class CreateCourseComponent {

  @ViewChild(CreateCourseTitleComponent) titleComponent: CreateCourseTitleComponent;
  @ViewChild(CourseTimesComponent) courseTimesComponent: CourseTimesComponent;
  @ViewChild(CreateCoursePropertiesComponent) propertiesComponent: CreateCoursePropertiesComponent;

  @Output() save = new EventEmitter<CalendarEvent>();
  model = CreateCourseRequest.mock();
  errors: CreateCourseErrors = {};

  constructor(private createCourseService: CreateCourseService) {
  }

  createCourse(courseTitle: string) {
    console.log(courseTitle);
    console.log(this.courseTimesComponent.getModel());
    console.log(this.propertiesComponent.getModel());
    this.createCourseService.createCourse(this.model.toJson())
      .then(
        (response) => {
          if (response.ok) {
            let events = response.json();
            this.errors = {};
            console.log(events);
            this.save.emit(events);
          }
        }
      )
      .catch(
        (response) => {
          let error = response.json();
          console.error('Error during course creation', error);
          this.errors = error;
        }
      );
  }
}
