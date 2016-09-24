import { Moment } from 'moment';

/**
 * An object that FullCalendar uses to store information about a calendar event.
 *
 * In addition to the fields below, you may also include your own non-standard fields in each Event Object.
 * FullCalendar will not modify or delete these fields. For example, developers often include a description field for
 * use in callbacks such as eventRender.A CSS class (or array of classes) that will be attached to this event's element.
 */
export interface CalendarItem {
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
