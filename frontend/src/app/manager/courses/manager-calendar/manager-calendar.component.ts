import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component(
  {
    selector: 'manager-calendar',
    template: `<calendar [editable]="true" (onEventClick)="onEventClick($event)" (onDayClick)="onDayClick($event)"
               (onEventResize)="onEventResize($event)" (onEventDrop)="onEventDrop($event)"></calendar>'
    `
  }
)
export class ManagerCalendarComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  onEventClick(e) {
    console.log('clicked on event in manager: ' + e.calEvent.title);
    this.router.navigate(['details'], { relativeTo: this.route });
  }

  onDayClick(e) {
    console.log('clicked on day in manager with date: ' + e.date._d);
    this.router.navigate(['/manager/courses']);
  }

  onEventResize(e) {
    console.log(e.event.title + ' resized');
  }

  onEventDrop(e) {
    console.log(e.event.title + ' moved');
  }
}
