import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';

@Component(
  {
    selector: 'reception',
    styleUrls: ['./reception.style.scss'],
    templateUrl: './reception.template.html',
    directives: [RouterOutlet]
  }
)
export class ReceptionComponent {
  showAdditionalPane = false;
  receptionUrl = '/reception';
  courseDetailsUrl = '/reception/course-details';
  routerLinkUrl = this.courseDetailsUrl;

  constructor(router: Router) {
    router.events.subscribe(
      (e) => {
        if (e instanceof NavigationEnd) {
          this.showAdditionalPane = router.url.indexOf(this.receptionUrl) === 0 && router.url !== this.receptionUrl;
        }
      }
    );
  }

  toggleRouterLinkUrl() {
    if (this.routerLinkUrl === this.courseDetailsUrl) {
      this.routerLinkUrl = this.receptionUrl;
    } else {
      this.routerLinkUrl = this.courseDetailsUrl;
    }
  }

  setCalendarColumnWidth() {
    return {
      'col-sm-6': this.showAdditionalPane,
      'col-sm-12': !this.showAdditionalPane,
    };
  }

}
