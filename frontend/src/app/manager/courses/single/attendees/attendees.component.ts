import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'app/manager/courses';

@Component(
  {
    selector: 'manager-courses-single-attendees',
    templateUrl: './attendees.template.html'
  }
)
export class ManagerCoursesAttendeesComponent {
  public course: Course;

  constructor(route: ActivatedRoute) {
    route.parent.data.forEach(
      (data: { course: Course }) => {
        this.course = data.course;
      }
    );
  }
}
