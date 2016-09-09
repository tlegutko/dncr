import { Component, ViewEncapsulation, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Moment } from 'moment';
import { Duration } from 'moment';
import { Schedule } from 'primeng/components/schedule/schedule';

@Component(
  {
    selector: 'calendar',
    styleUrls: ['./calendar.style.scss'],
    template: `
    <p-schedule [events]="events" [header]="header" [height]="'parent'" [nowIndicator]="true"
    [locale]="locale" [defaultView]="defaultView" scrollTime="9:00:00" minTime="7:00:00" [editable]="editable"
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

  @Input() events: CalendarEvent[];

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
   * @type {EventEmitter<CalendarEventAction>}
   */
  @Output() eventClick = new EventEmitter<CalendarEventAction>();

  /**
   * Triggered when the user clicks an event.
   * @type {EventEmitter<CalendarDayClick>}
   */
  @Output() dayClick = new EventEmitter<CalendarDayClick>();

  /**
   * Triggered when dragging stops and the event has moved to a different day/time. EventDrop does not get called when
   * an external event lands on the calendar. eventReceive is called instead.
   * @type {EventEmitter<CalendarEventModifyAction>}
   */
  @Output() eventDrop = new EventEmitter<CalendarEventModifyAction>();

  /**
   * Triggered when resizing stops and the event has changed in duration.
   * @type {EventEmitter<CalendarEventModifyAction>}
   */
  @Output() eventResize = new EventEmitter<CalendarEventModifyAction>();

  /**
   * Triggered when the user mouses over an event.
   * @type {EventEmitter<CalendarEventAction>}
   */
  @Output() eventMouseover = new EventEmitter<CalendarEventAction>();

  /**
   * Triggered when the user mouses out of an event.
   * @type {EventEmitter<CalendarEventAction>}
   */
  @Output() eventMouseout = new EventEmitter<CalendarEventAction>();

  /**
   * Triggered when event resizing begins.
   * @type {EventEmitter<CalendarEventAction>}
   */
  @Output() eventResizeStart = new EventEmitter<CalendarEventAction>();

  /**
   * Triggered when event resizing stops.
   * This callback is guaranteed to be triggered after the user resizes an event, even if the event doesn't change in
   * duration. It is triggered before the event's information has been modified (if changed in duration) and before the
   * eventResize callback is triggered.
   * @type {EventEmitter<CalendarEventAction>}
   */
  @Output() eventResizeStop = new EventEmitter<CalendarEventAction>();

  /**
   * Triggered when event dragging begins.
   * @type {EventEmitter<CalendarEventAction>}
   */
  @Output() eventDragStart = new EventEmitter<CalendarEventAction>();

  /**
   * Triggered when event dragging stops.
   * This callback is guaranteed to be triggered after the user drags an event, even if the event doesn't change
   * date/time. It is triggered before the event's information has been modified (if moved to a new date/time) and
   * before the eventDrop callback is triggered.
   * @type {EventEmitter<CalendarEventAction>}
   */
  @Output() eventDragStop = new EventEmitter<CalendarEventAction>();

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

  /**
   * Moves the calendar one step back (either by a month, week, or day).
   *
   * If the calendar is in month view, will move the calendar back one month. If the calendar is in basicWeek or
   * agendaWeek, will move the calendar back one week. If the calendar is in basicDay or agendaDay, will move the
   * calendar back one day.
   */
  prev() {
    this.calendar.prev();
  }

  /**
   * Moves the calendar one step forward (either by a month, week, or day).
   *
   * If the calendar is in month view, will move the calendar forward one month. If the calendar is in basicWeek or
   * agendaWeek, will move the calendar forward one week. If the calendar is in basicDay or agendaDay, will move the
   * calendar forward one day.
   */
  next() {
    this.calendar.next();
  }

  /**
   * Moves the calendar back one year.
   */
  prevYear() {
    this.calendar.prevYear();
  }

  /**
   * Moves the calendar forward one year.
   */
  nextYear() {
    this.calendar.nextYear();
  }

  /**
   * Moves the calendar to the current date.
   */
  today() {
    this.calendar.today();
  }

  /**
   * Moves the calendar to an arbitrary date.
   * @param date can be a Moment object, or anything the Moment constructor accepts.
   */
  gotoDate(date: Moment) {
    this.calendar.gotoDate(date);
  }

  /**
   * Moves the calendar forward/backward an arbitrary amount of time.
   * @param duration can be a Duration object or anything the Duration constructor accepts.
   */
  incrementDate(duration: Duration) {
    this.calendar.incrementDate(duration);
  }

  /**
   * For month view, it will always be sometime between the first and last day of the month. For week views, it will
   * always be sometime between the first and last day of the week.
   *
   * Returns a Moment for the current date of the calendar.
   * @returns {Moment|any|number}
   */
  getDate(): Moment {
    return this.calendar.getDate();
  }

}

/**
 *
 */
export interface CalendarEventModifyAction {
  event: CalendarEvent;

  /**
   * Amount of time the event was extended by / moved by.
   */
  delta: Duration;

  /**
   * RevertFunc is a function that, if called, reverts the event's end date to the value before the drag. This is
   * useful if an ajax call should fail.
   */
  revertFunc: void;

  /**
   * JsEvent holds the native javascript event with low-level information such as mouse coordinates.
   */
  jsEvent;

  view: CalendarView;
}

/**
 * Triggered when a new date-range is rendered, or when the view type switches.
 *
 * This callback will get triggered when the user changes the view, or when any of the date navigation methods are
 * called. This callback will trigger after the view has been fully rendered, but before events have been rendered (see
 * also: eventAfterAllRender).
 */
export interface CalendarViewRender {
  view: CalendarView;

  /**
   * Element is a jQuery element for the container of the new view.
   */
  element: any;
}

/**
 * Defines the buttons and title at the top of the calendar.
 *
 * Setting the header options to false will display no header. An object can be supplied with properties left, center,
 * and right. These properties contain strings with comma/space separated values. Values separated by a comma will be
 * displayed adjacently. Values separated by a space will be displayed with a small gap in between.
 * Strings can contain any of the following values:
 * title - text containing the current month/week/day
 * prev - button for moving the calendar back one month/week/day
 * next - button for moving the calendar forward one month/week/day
 * prevYear - button for moving the calendar back on year
 * nextYear - button for moving the calendar forward one year
 * today - button for moving the calendar to the current month/week/day
 * CalendarViewOption - button that will switch the calendar to any of the Available Views
 *
 * Specifying an empty string for a property will cause it display no text/buttons.
 */
export interface CalendarHeader {
  left: string | CalendarViewOption;
  center: string | CalendarViewOption;
  right: string | CalendarViewOption;
}

/**
 * FullCalendar has a number of different "views", or ways of displaying days and events. The following 9 views are
 * all built in to FullCalendar. You can define header buttons to allow the user to switch between them. You can set
 * the initial view of the calendar with the defaultView option. For examples see
 * https://fullcalendar.io/docs/views/Available_Views/.
 */
export type CalendarViewOption =
  'month'
    | 'basicWeek'
    | 'basicDay'
    | 'agendaWeek'
    | 'agendaDay'
    | 'listYear'
    | 'listMonth'
    | 'listWeek'
    | 'listDay'

/**
 * Triggered when the user clicks on a day.
 */
export interface CalendarDayClick {

  /**
   * Date holds a Moment for the clicked day. If an all-day area has been clicked, the moment will be
   * ambiguously-timed. If a slot in the agendaWeek or agendaDay views has been clicked, date will have the slot's
   * time.
   */
  date: Moment;

  /**
   * Native JavaScript (jQuery) event with low-level information such as click coordinates.
   */
  jsEvent: any;

  view: CalendarView;
}

/**
 * Common interface for events triggered by calendar any event related action (click/drag/resize/mouseover etc.).
 *
 * Events will not be triggered for background events.
 */
export interface CalendarEventAction {

  calEvent: CalendarEvent;

  /**
   * Native JavaScript (jQuery) event with low-level information such as click coordinates.
   */
  jsEvent: any;

  view: CalendarView;
}

/**
 * An object that FullCalendar uses to store information about a calendar event.
 *
 * In addition to the fields below, you may also include your own non-standard fields in each Event Object.
 * FullCalendar will not modify or delete these fields. For example, developers often include a description field for
 * use in callbacks such as eventRender.A CSS class (or array of classes) that will be attached to this event's element.
 */
export interface CalendarEvent {
  /**
   * Uniquely identifies the given event. Different instances of repeating events should all have the same id.
   */
  id?: string | number;

  /**
   * The text on an event's element
   */
  title: string;

  /**
   * Whether an event occurs at a specific time-of-day. This property affects whether an event's time is shown. Also,
   * in the agenda views, determines if it is displayed in the "all-day" section. If this value is not explicitly
   * specified, allDayDefault will be used if it is defined. If all else fails, FullCalendar will try to guess. If
   * either the start or end value has a "T" as part of the ISO8601 date string, allDay will become false. Otherwise,
   * it will be true.
   *
   * See https://fullcalendar.io/docs/event_data/Event_Object/ for further documentation.
   */
  allDay?: boolean;

  /**
   * A Moment-ish input, like an ISO8601 string. Throughout the API this will become a real Moment object.
   */
  start: Moment;

  /**
   * The exclusive date/time an event ends. Optional. A Moment-ish input, like an ISO8601 string. Throughout the API
   * this will become a real Moment object. It is the moment immediately after the event has ended. For example, if
   * the last full day of an event is Thursday, the exclusive end of the event will be 00:00:00 on Friday!
   */
  end?: Moment;

  /**
   * A URL that will be visited when this event is clicked by the user. For more information on controlling this
   * behavior, see the eventClick callback.
   */
  url?: string;

  /**
   * A CSS class (or array of classes) that will be attached to this event's element.
   */
  className?: string | string[];

  /**
   * Overrides the master editable option for this single event.
   */
  editable?: boolean;

  /**
   * Overrides the master eventStartEditable option for this single event.
   */
  startEditable?: boolean;

  /**
   * Overrides the master eventDurationEditable option for this single event.
   */
  durationEditable?: boolean;

  /**
   * Overrides the master eventResourceEditable option for this single event.
   */
  resourceEditable?: boolean;

  /**
   * Allows alternate rendering of the event, like background events. Can be empty, "background", or
   * "inverse-background"
   */
  rendering?: string;

  /**
   * Overrides the master eventOverlap option for this single event.
   * If false, prevents this event from being dragged/resized over other events. Also prevents other events from
   * being dragged/resized over this event.
   */
  overlap?: boolean;

  /**
   * An event ID, "businessHours", object. Optional. Overrides the master eventConstraint option for this single
   * event. See https://fullcalendar.io/docs/event_ui/eventConstraint/.
   */
  constraint?: any;

  /**
   * Event Source Object. Automatically populated. A reference to the event source that this event came
   * from. See https://fullcalendar.io/docs/event_data/Event_Source_Object/.
   */
  source?: any;

  /**
   * Sets an event's background and border color just like the calendar-wide eventColor option.
   */
  color?: string;

  /**
   * Sets an event's background color just like the calendar-wide eventBackgroundColor option.
   */
  backgroundColor?: string;

  /**
   * Sets an event's border color just like the the calendar-wide eventBorderColor option.
   */
  borderColor?: string;

  /**
   * Sets an event's text color just like the calendar-wide eventTextColor option.
   */
  textColor?: string;

}

/**
 * An object that is passed to every callback, containing info about the current view.
 *
 * For all views, start, end, intervalStart, and intervalEnd will be ambiguously-timed moments.
 * (https://fullcalendar.io/docs/utilities/Moment/#ambiguously-timed)
 */
export interface CalendarView {
  name: string;

  /**
   * Title text that is displayed at the top of the header (such as "September 2009").
   */
  title: string;

  /**
   * A Moment that is the first visible day.
   * In month-view, this value is often before the 1st day of the month, because most months do not begin on the
   * first day-of-week.
   */

  start: Moment;

  /**
   * A Moment that is the exclusive last visible day.
   */
  end: Moment;

  /**
   * A Moment that is the start of the interval the view is trying to represent. For example, in month view, this will
   * be the first of the month. This value disregards hidden days.
   */
  intervalStart: Moment;

  /**
   * A Moment that is the exclusive end of the interval the view is trying to represent. For example, in month view,
   * this will be the day after the last day of the month (because it is exclusive). This value disregards hidden days.
   */
  intervalEnd: Moment;
}
