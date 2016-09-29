import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { CreateCourseRequest } from './create-course.model';
import { CreateCourseTitleComponent } from './course-title/course-title.component';
import { CreateCoursePropertiesComponent } from './course-properties/course-properties.component';
import { CourseTimesComponent } from './course-times/course-times.component';
import { CalendarEvent } from '../../../_commons/calendar/calendar-events.interface';
import { CoursesService } from '../courses.service';

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
    templateUrl: './create-course.component.html',
    styleUrls: ['./create-course.component.scss'],
  }
)
export class CreateCourseComponent {

  @ViewChild(CreateCourseTitleComponent) titleComponent: CreateCourseTitleComponent;
  @ViewChild(CourseTimesComponent) courseTimesComponent: CourseTimesComponent;
  @ViewChild(CreateCoursePropertiesComponent) propertiesComponent: CreateCoursePropertiesComponent;

  @Output() save = new EventEmitter<CalendarEvent>();
  errors: CreateCourseErrors = {};

  constructor(private createCourseService: CoursesService) {
  }

  createCourse(courseTitle: string) {
    let times = this.courseTimesComponent.getModel();
    let properties = this.propertiesComponent.getModel();
    // let request: CreateCourseRequest = {
    //   name: courseTitle,
    //   startDate: times.startTime,
    //   startTime: times.startTime,
    //   endTime: times.endTime,
    //   repeatWeeksCount: times.repeatWeeksCount,
    //   classesCount: properties.classesCount,
    //   seatsCount: properties.seatsCount,
    //   instructorId: properties.instructorId,
    //   locationId: properties.locationId,
    //   price: properties.price,
    //   description: properties.description,
    // };
    let request = CreateCourseRequest.mock();
    this.createCourseService.createCourse(request)
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
