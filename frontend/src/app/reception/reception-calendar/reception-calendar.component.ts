import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component(
  {
    selector: 'reception-calendar',
    template: `<calendar [editable]="false" (onEventClick)="onEventClick($event)"
               (onDayClick)="onDayClick($event)"></calendar>'
    `
  }
)
export class ReceptionCalendarComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  onEventClick(e) {
    console.log('clicked on event in reception: ' + e.calEvent.title);
    this.router.navigate(['course-details'], { relativeTo: this.route });
  }

  onDayClick(e) {
    console.log('clicked on day in reception with date: ' + e.date._d);
    this.router.navigate(['/reception']);
  }
}
