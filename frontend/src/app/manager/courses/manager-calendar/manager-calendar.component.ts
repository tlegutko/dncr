import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CalendarItem } from 'app/_commons/calendar/calendar.interface';
import { CalendarModifyEvent, CalendarEvent, CalendarDayClick } from 'app/_commons/calendar/calendar-events.interface';
import { Course, CoursesService } from 'app/manager/courses';
import * as moment from 'moment';

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

  constructor(private router: Router, private route: ActivatedRoute, private service: CoursesService) {
    this.service.list().subscribe((courses) => this.events = this.mapCoursesToEvents(courses));
  }

  public mapCoursesToEvents(courses: Course[]): CalendarItem[] {
    let events: CalendarItem[] = [];
    courses.forEach(
      (course) => course.times.forEach(
        (time) => time.events.forEach(
          (event) => {
            let start = moment(event.date + ' ' + time.startTime, 'YYYY-MM-DD HH:mm:ss');
            let end = moment(event.date + ' ' + time.endTime, 'YYYY-MM-DD HH:mm:ss');
            events.push(
              {
                id: course.id,
                object: course,
                title: course.name,
                start: start,
                end: end
              }
            );
          }
        )
      )
    );
    return events;
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
