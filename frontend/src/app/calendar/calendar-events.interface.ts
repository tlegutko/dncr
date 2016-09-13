import { Moment, Duration } from 'moment';
import { CalendarView, CalendarItem } from './calendar.interface';

export interface CalendarModifyEvent {
  event: CalendarItem;

  /**
   * Amount of time the event was extended by / moved by.
   */
  delta: Duration;

  /**
   * RevertFunc is a function that, if called, reverts the event's end date to the value before the drag. This is
   * useful if an ajax call should fail.
   */
  revertFunc: any;

  /**
   * JsEvent holds the native javascript event with low-level information such as mouse coordinates.
   */
  jsEvent;

  view: CalendarView;
}

/**
 * Common interface for events triggered by calendar any event related action (click/drag/resize/mouseover etc.).
 *
 * Events will not be triggered for background events.
 */
export interface CalendarEvent {
  calEvent: CalendarItem;

  /**
   * Native JavaScript (jQuery) event with low-level information such as click coordinates.
   */
  jsEvent: any;

  view: CalendarView;
}

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
