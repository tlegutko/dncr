import { Component, Output, EventEmitter } from '@angular/core';

@Component(
  {
    selector: 'course-details-action-button',
    styleUrls: ['./action-button.style.scss'],
    template: `
      <button type="button" class="btn" (click)="onClick.emit(true)">
        <i class="fa fa-plus fa-2x"></i>
      </button>
    `
  }
)
export class CourseDetailsActionButtonComponent {
  @Output() onClick = new EventEmitter<boolean>();
}
