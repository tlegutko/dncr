import { Component, ViewEncapsulation, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Schedule } from 'primeng/components/schedule/schedule';
import { CalendarItem, CalendarHeader, CalendarViewOption, CalendarViewRender } from './calendar.interface';
import { CalendarEvent, CalendarDayClick, CalendarModifyEvent } from './calendar-events.interface';

@Component(
  {
    selector: 'calendar',
    styleUrls: ['./calendar.style.scss'],
    template: `
    <!--suppress JSUnresolvedVariable -->
    <p-schedule [events]="events" [header]="header" height="parent" [nowIndicator]="true"
    [locale]="locale" [defaultView]="defaultView" scrolltime="9:00:00" minTime="7:00:00" [editable]="editable"
    (onEventClick)="eventClick.emit($event)" (onDayClick) = "dayClick.emit($event)"
    (onEventResize)="eventResize.emit($event)" (onEventDrop) = "eventDrop.emit($event)"
    (onEventMouseover)="eventMouseover.emit($event)" (onEventMouseOut)="eventMouseout.emit($event)"
    (onEventDragStart)="eventDragStart.emit($event)" (onEventDragStop)="eventDragStop.emit($event)"
    (onEventResizeStart)="eventResizeStart.emit($event)" (onEventResizeStop)="eventResizeStop.emit($event)"
    (viewRend)="viewRender.emit($event)">
    </p-schedule>
`,
    encapsulation: ViewEncapsulation.None,
  }
)

/**
 * CalendarComponent is a base for reception-calendar and manager-calendar.
 * If functionality is shared (i.e. polish language or header layout) code goes here.
 * If functionality differs (i.e. onEventClick), it should be passed to particular component.
 *
 * For further documentation see http://www.primefaces.org/primeng/#/schedule.
 * All events have their typed interfaces in this file. For calendar attributes see #Attributes section in docs above.
 * Some attributes have their types defined in underlying {@link Schedule}.
 */

export class CalendarComponent {

  @ViewChild(Schedule) calendar;

  /**
   * Defines the buttons and title at the top of the calendar.
   * Setting the header options to false will display no header.
   * Setting the header options to true will result in undefined behaviour.
   */
  header: CalendarHeader | boolean;

  /**
   * Text/Time customization. Can contain any of the options listed in https://fullcalendar.io/docs/text/.
   */
  locale: any;

  @Input() events: CalendarItem[];

  /**
   * The initial view when the calendar loads. Default value is 'month'.
   */
  @Input() defaultView: CalendarViewOption;

  /**
   * Determines whether the events on the calendar can be modified. Default: false.
   * This determines if the events can be dragged and resized. Enables/disables both at the same time. If you don't
   * want both, use the more specific eventStartEditable and eventDurationEditable instead. This option can be
   * overridden on a per-event basis with the Event Object editable property.
   */
  @Input() editable: boolean;

  /**
   * Triggered when the user clicks on a day.
   * @type {EventEmitter<CalendarEvent>}
   */
  @Output() eventClick = new EventEmitter<CalendarEvent>();

  /**
   * Triggered when the user clicks an event.
   * @type {EventEmitter<CalendarDayClick>}
   */
  @Output() dayClick = new EventEmitter<CalendarDayClick>();

  /**
   * Triggered when dragging stops and the event has moved to a different day/time. EventDrop does not get called when
   * an external event lands on the calendar. eventReceive is called instead.
   * @type {EventEmitter<CalendarModifyEvent>}
   */
  @Output() eventDrop = new EventEmitter<CalendarModifyEvent>();

  /**
   * Triggered when resizing stops and the event has changed in duration.
   * @type {EventEmitter<CalendarModifyEvent>}
   */
  @Output() eventResize = new EventEmitter<CalendarModifyEvent>();

  /**
   * Triggered when the user mouses over an event.
   * @type {EventEmitter<CalendarEvent>}
   */
  @Output() eventMouseover = new EventEmitter<CalendarEvent>();

  /**
   * Triggered when the user mouses out of an event.
   * @type {EventEmitter<CalendarEvent>}
   */
  @Output() eventMouseout = new EventEmitter<CalendarEvent>();

  /**
   * Triggered when event resizing begins.
   * @type {EventEmitter<CalendarEvent>}
   */
  @Output() eventResizeStart = new EventEmitter<CalendarEvent>();

  /**
   * Triggered when event resizing stops.
   * This callback is guaranteed to be triggered after the user resizes an event, even if the event doesn't change in
   * duration. It is triggered before the event's information has been modified (if changed in duration) and before the
   * eventResize callback is triggered.
   * @type {EventEmitter<CalendarEvent>}
   */
  @Output() eventResizeStop = new EventEmitter<CalendarEvent>();

  /**
   * Triggered when event dragging begins.
   * @type {EventEmitter<CalendarEvent>}
   */
  @Output() eventDragStart = new EventEmitter<CalendarEvent>();

  /**
   * Triggered when event dragging stops.
   * This callback is guaranteed to be triggered after the user drags an event, even if the event doesn't change
   * date/time. It is triggered before the event's information has been modified (if moved to a new date/time) and
   * before the eventDrop callback is triggered.
   * @type {EventEmitter<CalendarEvent>}
   */
  @Output() eventDragStop = new EventEmitter<CalendarEvent>();

  /**
   * Triggered when a new date-range is rendered, or when the view type switches.
   *
   * This callback will get triggered when the user changes the view, or when any of the date navigation methods are
   * called. This callback will trigger after the view has been fully rendered, but before events have been rendered
   * @type {EventEmitter<CalendarViewRender>}
   */
  @Output() viewRender = new EventEmitter<CalendarViewRender>();

  constructor() {
    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay',
    };
    this.locale = {
      locale: 'pl',
      buttonText: {
        today: 'dzisiaj',
        month: 'miesiąc',
        week: 'tydzień',
        day: 'dzień'
      },
      timeFormat: 'H:mm',
      slotLabelFormat: 'H:mm'
    };
  }
}

