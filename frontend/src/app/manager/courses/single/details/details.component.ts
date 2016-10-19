import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'app/course';
import { StoreCourseErrors } from '../../../../course/course.model';

@Component(
  {
    selector: 'manager-courses-single-details',
    template: '<edit-course [model]="model" [errors]="errors"></edit-course>'
  }
)
export class ManagerCoursesDetailsComponent implements OnInit {
  model: Course;
  errors: StoreCourseErrors = new StoreCourseErrors();

  constructor(private route: ActivatedRoute) {
    console.log('00');
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
