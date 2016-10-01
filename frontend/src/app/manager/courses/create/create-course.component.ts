import { Component, Output, EventEmitter } from '@angular/core';
import { CalendarEvent } from '../../../_commons/calendar/calendar-events.interface';
import { CreateCourseErrors, CreateCourseRequest } from '../../../course/course.model';
import { CoursesService } from '../../../course/courses.service';

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
  // model = new CreateCourseRequest();
  model = CreateCourseRequest.mock();

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
