import { Component, Input, OnInit } from '@angular/core';
import { StoreCourseErrors, Course } from '../../../course/course.model';
import { CoursesService } from '../../../course/courses.service';
import { Router } from '@angular/router';

@Component(
  {
    selector: 'edit-course',
    template: `
      <hr/>
      <course-times [model]="model.times" [errors]="errors"></course-times>
      <hr/>
      <course-properties [model]="model" [errors]="errors"></course-properties>
    `,
    styleUrls: ['./edit-course.component.scss'],
  }
)
export class EditCourseComponent implements OnInit {

  @Input() model: Course;
  @Input() errors: StoreCourseErrors;

  constructor(private router: Router, private coursesService: CoursesService) {
  }

  ngOnInit() {
    this.coursesService.courseSaveRequested.subscribe(
      (courseName) => {
        this.model.name = courseName;
        this.coursesService.create(this.model)
          .subscribe(
            () => {
            }, (errors) => this.errors = errors
          );
      }
    );
  }

  save() {
    this.coursesService.create(this.model).subscribe(
      (course) => {
        this.router.navigate(['/manager/courses', course.id]);
      }, (errors) => this.errors = errors
    );
  }
}
