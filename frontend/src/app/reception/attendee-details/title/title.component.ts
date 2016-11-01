import { Component, Input } from '@angular/core';
@Component(
  {
    selector: 'attendee-details-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.scss'],
  }
)
export class AttendeeDetailsTitleComponent {
  @Input() title: string;
}
