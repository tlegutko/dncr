import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component(
  {
    selector: 'manager-calendar',
    template: `<calendar [events]="mockEvents" [editable]="true" defaultView="agendaWeek" 
              (onEventClick)="onEventClick($event)" (onDayClick)="onDayClick($event)"  
              (onEventResize)="onEventResize($event)" (onEventDrop)="onEventDrop($event)"> 
              </calendar>
    `
  }
)
export class ManagerCalendarComponent {
  mockEvents: any[];

  constructor(private router: Router, private route: ActivatedRoute) {
    let currentDate = new Date().toJSON().slice(0, 10);
    this.mockEvents = [
      {
        'id': 1,
        'title': 'Poranny kurs',
        'start': currentDate + 'T10:00:00',
        'end': currentDate + 'T11:30:00',
        'timezone': ''
      }, {
        'id': 2,
        'title': 'Drugi poranny kurs',
        'start': currentDate + 'T11:00:00',
        'end': currentDate + 'T12:30:00'
      }, {
        'id': 3,
        'title': 'Popołudniowy kurs',
        'start': currentDate + 'T16:00:00',
        'end': currentDate + 'T17:30:00'
      },
    ];
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
