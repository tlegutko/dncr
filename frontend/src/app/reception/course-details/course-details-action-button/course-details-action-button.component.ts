import { Component, Output, EventEmitter } from '@angular/core';

@Component(
  {
    selector: 'course-details-action-button',
    styleUrls: ['./course-details-action-button.component.scss'],
    template: `
      <button type="button" class="btn btn-md-down-fixed btn-lg-up-title"
              (click)="emitActionEvent()">
        <i class="fa fa-plus fa-2x"></i>
      </button>
`
  }
)
export class CourseDetailsActionButtonComponent {
  @Output() onClickAction = new EventEmitter<boolean>();

  emitActionEvent() {
    this.onClickAction.emit(true);
  }
}
