import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

/**
 * CalendarComponent is a wrapper for reception-calendar and manager-calendar.
 * If functionality is shared (i.e. polish language or header layout) code goes here.
 * If functionality differs (i.e. onEventClick), it should be passed to this component.
 * For further documentation see http://www.primefaces.org/primeng/#/schedule.
 * Parameters:
 * @Input() defaultView default view to display on calendar. can be `month`, `agendaWeek`, `agendaDay`. default: `month`
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
    <p-schedule [events]="events" [header]="header" [height]="'parent'" [nowIndicator]="true"
    [locale]="locale" [defaultView]="defaultView" scrollTime="9:00:00" minTime="7:00:00" [editable]="editable"
    (onEventClick)="onEventClick.emit($event)" (onDayClick) = "onDayClick.emit($event)"
    (onEventResize)="onEventResize.emit($event)" (onEventDrop) = "onEventDrop.emit($event)">
    </p-schedule>
`,
    encapsulation: ViewEncapsulation.None,
  }
)
export class CalendarComponent {
  header: any;
  locale: any;
  @Input() events: any[];
  @Input() defaultView: string;
  @Input() editable: boolean;
  @Output() onEventClick = new EventEmitter();
  @Output() onDayClick = new EventEmitter();
  @Output() onEventResize = new EventEmitter();
  @Output() onEventDrop = new EventEmitter();

  constructor() {
    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };
    this.locale = {
      locale: 'pl',
      buttonText: {
        today: 'dzisiaj',
        month: 'miesiąc',
        week: 'tydzień',
        day: 'dzień'
      },
    };
  }
}
