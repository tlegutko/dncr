import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CalendarEventAction, CalendarDayClick } from '../../calendar/calendar.component';

@Component(
  {
    selector: 'reception-calendar',
    template: `<calendar [events]="mockEvents" [editable]="false" defaultView="agendaDay"
              (eventClick)="onEventClick($event)" (dayClick)="onDayClick($event)"></calendar>
    `
  }
)
export class ReceptionCalendarComponent {
  mockEvents: any[];

  constructor(private router: Router, private route: ActivatedRoute) {
    let currentDate = new Date().toJSON().slice(0, 10);
    this.mockEvents = [
      {
        'id': 1,
        'title': 'Poranny kurs',
        'start': currentDate + 'T10:00:00',
        'end': currentDate + 'T11:30:00',
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

  onEventClick(e: CalendarEventAction) {
    console.log('clicked on event in reception: ' + e.calEvent.title);
    this.router.navigate(['course-details'], { relativeTo: this.route });
  }

  onDayClick(e: CalendarDayClick) {
    console.log('clicked on day in reception with date: ' + e.date.format());
    this.router.navigate(['/reception']);
  }
}
