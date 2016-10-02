import { Component, Output, EventEmitter } from '@angular/core';
import { CalendarEvent } from '../../../_commons/calendar/calendar-events.interface';
import { CreateCourseErrors, CreateCourseRequest } from '../../../course/course.model';
import { CoursesService } from '../../../course/courses.service';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private coursesService: CoursesService) {
  }

  handleErrors(error: any) {
    this.isGeneralErrorMessage = (typeof error === 'string');
    this.errors = error;
  }

  createCourse() {
    this.coursesService.create(this.model).subscribe(
      (course) => {
        this.coursesService.broadcastNewCourse(course);
        this.router.navigate(['/manager/courses', course.id]);
      }, (errors) => this.handleErrors(errors)
    );
  }
}
