import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarItem, CalendarModifyEvent, CalendarEvent, CalendarDayClick } from 'app/_commons/calendar';
import { CoursesService } from 'app/course';

@Component(
  {
    selector: 'manager-calendar',
    template: `
    <!--suppress JSUnresolvedVariable -->
    <calendar [events]="events" [editable]="true" defaultView="agendaWeek" 
      (eventClick)="onEventClick($event)" (dayClick)="onDayClick($event)"  
      (eventResize)="onEventResize($event)" (eventDrop)="onEventDrop($event)"> 
    </calendar>
    `
  }
)
export class ManagerCalendarComponent implements OnInit {
  public events: CalendarItem[];

  constructor(private router: Router, private service: CoursesService) {
  }

  public ngOnInit(): void {
    this.service.calendarEvents().subscribe((events) => this.events = events);
    this.service.courseUpdates.subscribe(
      (events) => {
        this.events = this.events.concat(events);
      }
    );
  }

  onEventResize(e: CalendarModifyEvent) {
    console.log(e.event.title + ' resized');
  }

  onEventDrop(e: CalendarModifyEvent) {
    console.log(e.event.title + ' moved');
  }

  onEventClick(e: CalendarEvent) {
    this.router.navigate(['/manager/courses', e.calEvent.id]);
  }

  onDayClick(e: CalendarDayClick) {
    console.log('clicked on day in manager with date: ' + e.date.format());
    this.service.broadcastCalendarDateClick(e.date);
    this.router.navigate(['/manager/courses/create-course']);
  }
}
