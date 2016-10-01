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
  isGeneralErrorMessage: Boolean = false;
  model = new CreateCourseRequest();

  constructor(private coursesService: CoursesService) {
  }

  test() {
    console.log(this.isGeneralErrorMessage);
  }

  handleErrors(error: any) {
    this.isGeneralErrorMessage = (typeof error === 'string');
    this.errors = error;
  }

  createCourse() {
    this.coursesService.create(this.model).subscribe(
      (course) => this.errors = {}, (errors) => this.handleErrors(errors)
    );
  }
}
