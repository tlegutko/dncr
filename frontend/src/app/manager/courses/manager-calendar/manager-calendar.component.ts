import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CalendarItem, CalendarModifyEvent, CalendarEvent, CalendarDayClick } from 'app/_commons/calendar';
import { CoursesService } from 'app/course';
import { Course } from '../../../course/course.model';
import { Moment } from 'moment';

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

  @Output() courseClick = new EventEmitter<Course>();
  @Output() dayClick = new EventEmitter<Moment>();
  private events: CalendarItem[];

  constructor(private service: CoursesService) {
  }

  public ngOnInit(): void {
    this.service.calendarEvents().subscribe((events) => this.events = events);
    this.service.calendarItemsCreated.subscribe(
      (events: CalendarItem[]) => {
        let eventsIds = events.map(event => event.id);
        this.events = this.events.filter(elem => eventsIds.indexOf(elem.id) < 0).concat(events);
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
    this.courseClick.emit(new Course({ id: +e.calEvent.id }));
  }

  onDayClick(e: CalendarDayClick) {
    this.service.broadcastCalendarDateClick(e.date);
    this.dayClick.emit(e.date);
  }
}
