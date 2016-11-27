import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CourseTime, CourseTimeErrors } from '../../../../course/course.model';
import { CourseLocation } from '../../../locations/locations.model';
import { Instructor } from '../../../instructors/instructors.model';

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
  @Input() instructors: Instructor[];
}
