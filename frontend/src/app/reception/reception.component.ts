import { Component } from '@angular/core';

@Component(
  {
    selector: 'reception',
    styleUrls: ['./reception.style.scss'],
    templateUrl: './reception.template.html'
  }
)
export class Reception {
  showCourseDetails: boolean = false;

  constructor() {
  }

  toggleCourseDetails() {
    this.showCourseDetails = !this.showCourseDetails;
  }

  setCalendarColumnSize() {
    return {
      'col-sm-6': this.showCourseDetails,
      'col-sm-12': !this.showCourseDetails,
    };
  }

}
