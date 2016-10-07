import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'app/course';
import { CreateCourseErrors, CreateCourseRequest } from '../../../../course/course.model';
import { EditCourseComponent } from '../../edit/edit-course.component';

@Component(
  {
    selector: 'manager-courses-single-details',
    template: '<edit-course [model]="model" [errors]="errors"></edit-course>'
  }
)
export class ManagerCoursesDetailsComponent implements OnInit {
  model: CreateCourseRequest;
  errors: CreateCourseErrors = {};

  @ViewChild(EditCourseComponent) private editCourse: EditCourseComponent;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.parent.data.forEach(
      (data: { course: Course }) => {
        this.model = CreateCourseRequest.fromCourse(data.course);
      }
    );
  }

}
