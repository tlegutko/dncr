import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CoursesService } from './courses.service';

@Component(
  {
    selector: 'manager-courses',
    styleUrls: ['./courses.style.scss'],
    templateUrl: './courses.template.html',
    providers: [CoursesService]
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
}
