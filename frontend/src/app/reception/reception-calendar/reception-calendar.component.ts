import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CalendarItem, CalendarEvent, CalendarDayClick } from 'app/_commons/calendar';
import { CoursesService } from 'app/course';
import { Course } from '../../course/course.model';
import { Moment } from 'moment';

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

  @Output() courseClick = new EventEmitter<Course>();
  @Output() dayClick = new EventEmitter<Moment>();
  private events: CalendarItem[];

  constructor(private service: CoursesService) {
  }

  public ngOnInit(): void {
    this.service.calendarEvents().subscribe((events) => this.events = events);
  }

  onEventClick(e: CalendarEvent) {
    this.courseClick.emit(new Course({ id: +e.calEvent.id }));
  }

  onDayClick(e: CalendarDayClick) {
    this.dayClick.emit(e.date);
  }
}
