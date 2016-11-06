import { Component, Input } from '@angular/core';
import { CourseErrors, Course } from '../../../../course/course.model';
@Component(
  {
    selector: 'course-properties',
    templateUrl: './course-properties.component.html',
    styleUrls: ['./course-properties.component.scss']
  }
)
export class CreateCoursePropertiesComponent {

  @Input() model: Course;
  @Input() errors: CourseErrors;

}
