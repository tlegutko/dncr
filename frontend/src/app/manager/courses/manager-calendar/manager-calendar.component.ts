import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarItem, CalendarModifyEvent, CalendarEvent, CalendarDayClick } from 'app/_commons/calendar';
import { Course, CoursesService } from 'app/course';

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
export class ManagerCalendarComponent {
  public events: CalendarItem[];

  constructor(private router: Router, private service: CoursesService) {
    console.log('constr');
    this.service.list().subscribe((courses) => this.events = this.mapCoursesToEvents(courses));
  }

  public mapCoursesToEvents(courses: Course[]): CalendarItem[] {
    let events: CalendarItem[] = [];
    courses.forEach((course) => events = events.concat(this.service.courseToCalendarItems(course)));

    return events;
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
    this.router.navigate(['/manager/courses/create-course']);
  }
}
