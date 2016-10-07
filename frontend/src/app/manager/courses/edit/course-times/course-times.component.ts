import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CreateCourseRequest, CreateCourseErrors } from '../../../../course/course.model';

@Component(
  {
    selector: 'course-times',
    templateUrl: './course-times.component.html',
    styleUrls: ['./course-times.component.scss'],
    encapsulation: ViewEncapsulation.None,
  }
)
export class CourseTimesComponent {

  @Input() model: CreateCourseRequest;
  @Input() errors: CreateCourseErrors;

}
