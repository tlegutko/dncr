import { Component, Input } from '@angular/core';
import { StoreCourseErrors, Course } from '../../../course/course.model';

@Component(
  {
    selector: 'edit-course',
    template: `
      <hr/>
      <course-times [model]="model.times" [errors]="errors.times"></course-times>
      <hr/>
      <course-properties [model]="model" [errors]="errors"></course-properties>
    `,
    styleUrls: ['./edit-course.component.scss'],
  }
)
export class EditCourseComponent {

  @Input() model: Course;
  @Input() errors: StoreCourseErrors;

}

