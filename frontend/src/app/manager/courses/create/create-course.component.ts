import { Component, OnInit } from '@angular/core';
import { StoreCourseErrors, CreateCourseTime, Course } from '../../../course/course.model';
import { CoursesService } from '../../../course/courses.service';
import { Router } from '@angular/router';
@Component(
  {
    selector: 'create-course',
    template: `
      <course-title [model]="model" [errors]="errors" [isEditing]="true" (save)="onSave()"></course-title>
      <edit-course [model]="model" [errors]="errors"></edit-course>
    `,
    styles: [':host { display: block }'],
  }
)
export class CreateCourseComponent implements OnInit {
  model = new Course();
  errors: StoreCourseErrors = new StoreCourseErrors();

  constructor(private router: Router, private coursesService: CoursesService) {
    this.model = Course.mock(); // TODO remove and handle undefined
  }

  public ngOnInit() {
    this.model.setDefaultRepeatWeeksCount();
    this.coursesService.recentlyClickedTime.subscribe(
      (courseTime) => {
        this.model.setTime(courseTime);
      }
    );
  }

  onSave() {
    this.coursesService.create(this.model).subscribe(
      (course) => {
        this.router.navigate(['/manager/courses', course.id]);
      }, (errors) => this.errors = errors
    );
  }

}
