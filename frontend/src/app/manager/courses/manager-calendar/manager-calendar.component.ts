import { Component } from '@angular/core';

@Component(
  {
    selector: 'manager-calendar',
    template: '<calendar [editable]="true" (onEventClick)="onEventClick($event)"></calendar>'
  }
)
export class ManagerCalendarComponent {
  onEventClick(e) {
    console.log('clicked on calendar event in manager: ' + e.calEvent.title);
    // TODO redirect to clicked course details view
  }
}
