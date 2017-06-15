import { Component, Input } from '@angular/core';
import { CourseTime, CourseTimeErrors } from 'app/course';
import { CourseLocation } from 'app/manager/locations';

@Component(
  {
    selector: 'course-time',
    templateUrl: 'course-time.component.html',
    styleUrls: ['course-time.component.scss'],
  }
)
export class CourseTimeComponent {

  @Input() model: CourseTime;
  @Input() errors: CourseTimeErrors;
  @Input() locations: CourseLocation[];

}
