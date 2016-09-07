import { Component } from '@angular/core';

@Component(
  {
    selector: 'reception-calendar',
    template: '<calendar [editable]="false" (onEventClick)="onEventClick($event)"></calendar>'
  }
)
export class ReceptionCalendarComponent {
  onEventClick(e) {
    console.log('clicked on calendar event in reception: ' + e.calEvent.title);
    // TODO redirect to clicked course details view
  }
}
