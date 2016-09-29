import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'app/manager/courses';

@Component(
  {
    selector: 'manager-courses-single',
    styleUrls: ['./single.component.scss'],
    templateUrl: './single.component.html'
  }
)
export class ManagerCoursesSingleComponent {
  public course: Course;

  constructor(private router: Router, route: ActivatedRoute) {
    route.data.forEach(
      (data: { course: Course }) => {
        this.course = data.course;
      }
    );
  }

  public close() {
    this.router.navigate(['/manager/courses']);
  }
}
