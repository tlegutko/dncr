import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

/**
 * CalendarComponent is a wrapper for reception-calendar and manager-calendar.
 * If functionality is shared (i.e. polish language or header layout) code goes here.
 * If functionality differs (i.e. onEventClick), it should be passed to this component.
 * For further documentation see http://www.primefaces.org/primeng/#/schedule.
 * Parameters:
 * @Input() events events to display. Event format: https://fullcalendar.io/docs/event_data/Event_Source_Object/.
 * @Input() editable whether events can be modified (dragged and resized).
 * @Output($event) onEventClick action to take when event is clicked
 * @Output($event) onDayClick action to take when area of the day is clicked
 * @Output($event) onEventResize action to take when event resizing is finished
 * @Output($event) onEventDrop action to take when event dragging is finished
 */
@Component(
  {
    selector: 'calendar',
    styleUrls: ['./calendar.style.scss'],
    template: `
    <p-schedule class="test" [events]="events" [header]="header" [height]="'parent'" [nowIndicator]="true"
    [locale]="pl" [defaultView]="'agendaDay'" [scrollTime]="'10:00:00'" [minTime]="'6:00:00'" [editable]="editable"
    (onEventClick)="onEventClick.emit($event)" (onDayClick) = "onDayClick.emit($event)"
    (onEventResize)="onEventResize.emit($event)" (onEventDrop) = "onEventDrop.emit($event)">
    </p-schedule>
`,
    encapsulation: ViewEncapsulation.None,
  }
)
export class CalendarComponent implements OnInit {
  header: any;
  pl: any;
  currentDate: string;
  @Input() events: any[];
  @Input() editable: boolean;
  @Output() onEventClick = new EventEmitter();
  @Output() onDayClick = new EventEmitter();
  @Output() onEventResize = new EventEmitter();
  @Output() onEventDrop = new EventEmitter();

  ngOnInit() {
    this.currentDate = new Date().toJSON().slice(0, 10);
    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };
    this.pl = {
      lang: 'pl',
      buttonText: {
        today: 'dzisiaj',
        month: 'miesiąc',
        week: 'tydzień',
        day: 'dzień'
      },
    };
    if (this.events == null) { // TODO delete once real events arrive
      this.events = [
        {
          'id': 1,
          'title': 'Poranny kurs',
          'start': this.currentDate + 'T10:00:00',
          'end': this.currentDate + 'T11:30:00'
        }, {
          'id': 2,
          'title': 'Drugi poranny kurs',
          'start': this.currentDate + 'T11:00:00',
          'end': this.currentDate + 'T12:30:00'
        }, {
          'id': 3,
          'title': 'Popołudniowy kurs',
          'start': this.currentDate + 'T16:00:00',
          'end': this.currentDate + 'T17:30:00'
        },
      ];
    }
  }

}
