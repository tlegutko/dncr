import { Component } from '@angular/core';
import { Course, CreateCourseErrors } from '../../../course/course.model';
@Component(
  {
    selector: 'create-course',
    template: `
      <course-title [model]="model" [errors]="errors" (save)="editCourse.save()"></course-title>
      <edit-course #editCourse [model]="model" [errors]="errors"></edit-course>
`
  }
)
export class CreateCourseComponent {
  model = new Course();
  errors: CreateCourseErrors = {};
}
