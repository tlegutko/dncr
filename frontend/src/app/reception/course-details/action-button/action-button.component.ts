import { Component, Output, EventEmitter } from '@angular/core';

@Component(
  {
    selector: 'course-details-action-button',
    styleUrls: ['./action-button.style.scss'],
    template: `
      <button type="button" class="btn btn-md-down-fixed btn-lg-up-title"
              (click)="add()">
        <i class="fa fa-plus fa-2x"></i>
      </button>
`
  }
)
export class CourseDetailsActionButtonComponent {
  @Output() onClickAction = new EventEmitter<boolean>();

  add() {
    this.onClickAction.emit(true);
  }
}
