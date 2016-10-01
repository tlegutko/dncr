import { Component, Output, EventEmitter } from '@angular/core';
import { CreateCourseRequest, CreateCourseErrors } from './create-course.model';
import { CalendarEvent } from '../../../_commons/calendar/calendar-events.interface';
import { CoursesService } from '../courses.service';

@Component(
  {
    selector: 'create-course',
    templateUrl: './create-course.component.html',
    styleUrls: ['./create-course.component.scss'],
  }
)
export class CreateCourseComponent {

  @Output() save = new EventEmitter<CalendarEvent>();
  errors: CreateCourseErrors = {};
  isErrorMessage: boolean;
  model = new CreateCourseRequest();

  constructor(private coursesService: CoursesService) {
  }

  test(form: any) {
    console.log(form);
  }

  createCourse() {
    this.coursesService.create(this.model).subscribe(
      (course) => this.errors = {}, (failedResponse) => {
        this.isErrorMessage = (typeof failedResponse === 'string');
        this.errors = failedResponse;
      }
    );
  }
}
