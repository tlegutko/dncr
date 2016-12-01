import { Component, Input } from '@angular/core';
import { CourseErrors, Course } from 'app/course';

@Component(
  {
    selector: 'edit-course',
    template: `
      <course-times [model]="model.times" [errors]="errors.times"></course-times>
      <hr/>
      <course-properties [model]="model" [errors]="errors"></course-properties>
    `,
    styleUrls: ['./edit-course.component.scss'],
  }
)
export class EditCourseComponent {
  @Input() model: Course;
  @Input() errors: CourseErrors;
}

