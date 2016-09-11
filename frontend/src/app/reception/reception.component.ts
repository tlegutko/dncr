import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CourseDetailsComponent } from './course-details/course-details.component';

@Component(
  {
    selector: 'reception',
    styleUrls: ['./reception.style.scss'],
    templateUrl: './reception.template.html',
    directives: [ CourseDetailsComponent ]
  }
)
export class ReceptionComponent {
  showAdditionalPane = false;

  constructor(router: Router) {
    let receptionRoute = '/reception';
    router.events.subscribe(
      (e) => {
        if (e instanceof NavigationEnd) {
          this.showAdditionalPane = router.url.indexOf(receptionRoute) === 0 && router.url !== receptionRoute;
        }
      }
    );
  }
}
