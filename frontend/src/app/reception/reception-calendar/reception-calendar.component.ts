import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarItem, CalendarEvent, CalendarDayClick } from 'app/_commons/calendar';
import { CoursesService, Course } from 'app/course';

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
export class ReceptionCalendarComponent {
  public events: CalendarItem[];

  constructor(private router: Router, private service: CoursesService) {
    this.service.list().subscribe((courses) => this.events = this.mapCoursesToEvents(courses));
  }

  public mapCoursesToEvents(courses: Course[]): CalendarItem[] {
    let events: CalendarItem[] = [];
    courses.forEach((course) => events = events.concat(this.service.courseToCalendarItems(course)));

    return events;
  }

  onEventClick(e: CalendarEvent) {
    this.router.navigate(['/reception/course-details', e.calEvent.id]);
  }

  onDayClick(e: CalendarDayClick) {
    console.log('clicked on day in reception with date: ' + e.date.format());
  }
}
