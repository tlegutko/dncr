import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { CalendarItem } from 'app/_commons/calendar/calendar.interface';
import { CalendarModifyEvent, CalendarEvent, CalendarDayClick } from 'app/_commons/calendar/calendar-events.interface';

@Component(
  {
    selector: 'manager-calendar',
    template: `
    <!--suppress JSUnresolvedVariable -->
    <calendar [events]="mockEvents" [editable]="true" defaultView="agendaWeek" 
      (eventClick)="onEventClick($event)" (dayClick)="onDayClick($event)"  
      (eventResize)="onEventResize($event)" (eventDrop)="onEventDrop($event)"> 
    </calendar>
    `
  }
)
export class ManagerCalendarComponent {
  mockEvents: CalendarItem[];

  constructor(private router: Router, private route: ActivatedRoute) {
    let currentDate = new Date().toJSON().slice(0, 10);
    this.mockEvents = [
      {
        'id': 1,
        'title': 'Poranny kurs',
        'start': moment(currentDate + 'T10:00:00'),
        'end': moment(currentDate + 'T11:30:00'),
      }, {
        'id': 2,
        'title': 'Drugi poranny kurs',
        'start': moment(currentDate + 'T11:00:00'),
        'end': moment(currentDate + 'T12:30:00'),
      }, {
        'id': 3,
        'title': 'Popołudniowy kurs',
        'start': moment(currentDate + 'T16:00:00'),
        'end': moment(currentDate + 'T17:30:00'),
      },
    ];
  }

  onEventResize(e: CalendarModifyEvent) {
    console.log(e.event.title + ' resized');
  }

  onEventDrop(e: CalendarModifyEvent) {
    console.log(e.event.title + ' moved');
  }

  onEventClick(e: CalendarEvent) {
    console.log('clicked on event in manager: ' + e.calEvent.title);
    this.router.navigate(['details'], { relativeTo: this.route });
  }

  onDayClick(e: CalendarDayClick) {
    console.log('clicked on day in manager with date: ' + e.date.format());
    this.router.navigate(['/manager/courses']);
  }
}
