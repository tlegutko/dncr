import { Component, Output, EventEmitter } from '@angular/core';

@Component(
  {
    selector: 'manager-course-attendee-button',
    styleUrls: ['./add-button.style.scss'],
    template: `
      <button type="button" class="btn" (click)="onClick.emit(true)">
        <i class="fa fa-plus fa-2x"></i>
      </button>
    `
  }
)
export class ManagerCourseAttendeesButtonComponent {
  @Output() onClick = new EventEmitter<boolean>();
}
