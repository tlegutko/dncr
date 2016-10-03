import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'app/course';
import { CreateCourseErrors } from '../../../../course/course.model';

@Component(
  {
    selector: 'manager-courses-single-details',
    template: '<edit-course [model]="model" [errors]="errors"></edit-course>'
  }
)
export class ManagerCoursesDetailsComponent implements OnInit {
  model: Course;
  errors: CreateCourseErrors = {};

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.parent.data.forEach(
      (data: { course: Course }) => {
        this.model = data.course;
        console.log(this.model);
      }
    );
  }
}
