import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Attendee } from 'app/attendee';

@Component(
  {
    selector: 'attendee-row',
    templateUrl: './attendee-row.template.html',
    styleUrls: ['./attendee-row.style.scss'],
  }
)
export class AttendeeRowComponent {
  @Input() attendee: Attendee;
  @Input() checkable: boolean;
  @Input() detailsRoute: string[];
}
