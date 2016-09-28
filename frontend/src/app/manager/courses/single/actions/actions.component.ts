import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'app/course';

@Component(
  {
    selector: 'manager-courses-single-actions',
    templateUrl: './actions.component.html'
  }
)
export class ManagerCoursesActionsComponent {
  public course: Course;

  constructor(route: ActivatedRoute) {
    route.parent.data.forEach(
      (data: { course: Course }) => {
        this.course = data.course;
      }
    );
  }
}
