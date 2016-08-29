import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component(
  {
    selector: 'calendar',
    styleUrls: ['./calendar.style.scss'],
    template: `
    <p-schedule class="test" [events]="events" [header]="header" [height]="'parent'" [nowIndicator]="true"
    [locale]="pl" [defaultView]="'agendaDay'" [scrollTime]="'10:00:00'" [minTime]="'6:00:00'"></p-schedule>
`,
    encapsulation: ViewEncapsulation.None,
  }
)
export class CalendarComponent implements OnInit {
  events: any[];
  header: any;
  pl: any;

  private static getCurrentDate(): string {
    return new Date().toJSON().slice(0, 10);
  }

  ngOnInit() {
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
    this.events = [
      {
        'id': 1,
        'title': 'Poranny kurs',
        'start': CalendarComponent.getCurrentDate() + 'T10:00:00',
        'end': CalendarComponent.getCurrentDate() + 'T11:30:00'
      }, {
        'id': 2,
        'title': 'Drugi poranny kurs',
        'start': CalendarComponent.getCurrentDate() + 'T11:00:00',
        'end': CalendarComponent.getCurrentDate() + 'T12:30:00'
      }, {
        'id': 3,
        'title': 'Popołudniowy kurs',
        'start': CalendarComponent.getCurrentDate() + 'T16:00:00',
        'end': CalendarComponent.getCurrentDate() + 'T17:30:00'
      },
    ];
  }

}
