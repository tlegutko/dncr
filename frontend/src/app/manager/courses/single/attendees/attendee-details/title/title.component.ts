import { Component, Input, EventEmitter, Output } from '@angular/core';
@Component(
  {
    selector: 'attendee-details-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.scss'],
  }
)
export class AttendeeDetailsTitleComponent {
  @Input() title: string;
  @Output() onCancel = new EventEmitter<boolean>();
}
