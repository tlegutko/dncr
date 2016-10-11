import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Course } from '../../course/course.model';
import { Moment } from 'moment';

@Component(
  {
    selector: 'manager-courses',
    styleUrls: ['./courses.component.scss'],
    templateUrl: './courses.component.html'
  }
)
export class ManagerCoursesComponent {
  public showAdditionalPane = false;

  constructor(private router: Router) {
    let route = '/manager/courses';
    router.events.subscribe(
      (e) => {
        if (e instanceof NavigationEnd) {
          this.showAdditionalPane = router.url.indexOf(route) === 0 && router.url !== route;
        }
      }
    );
  }

  onCourseClick(course: Course) {
    this.router.navigate(['/manager/courses', course.id]);
  }

  onDayClick(moment: Moment) {
    this.router.navigate(['/manager/courses/create-course']);
  }

}
