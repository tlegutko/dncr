import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component(
  {
    selector: 'manager-courses',
    styleUrls: ['./courses.style.scss'],
    templateUrl: './courses.template.html'
  }
)
export class ManagerCoursesComponent {
  public currentDate = new Date();
  public showAdditionalPane = false;

  constructor(router: Router) {
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
