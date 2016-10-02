import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarItem, CalendarEvent, CalendarDayClick } from 'app/_commons/calendar';
import { CoursesService } from 'app/course';

@Component(
  {
    selector: 'reception-calendar',
    template: `
    <!--suppress JSUnresolvedVariable -->
    <calendar [events]="events" [editable]="false" defaultView="agendaDay"
      (eventClick)="onEventClick($event)" (dayClick)="onDayClick($event)"></calendar>
    `
  }
)
export class ReceptionCalendarComponent implements OnInit {
  public events: CalendarItem[];

  constructor(private router: Router, private service: CoursesService) {
  }

  public ngOnInit(): void {
    this.service.calendarEvents().subscribe((events) => this.events = events);
  }

  onEventClick(e: CalendarEvent) {
    this.router.navigate(['/reception/course-details', e.calEvent.id]);
  }

  onDayClick(e: CalendarDayClick) {
    console.log('clicked on day in reception with date: ' + e.date.format());
  }
}
