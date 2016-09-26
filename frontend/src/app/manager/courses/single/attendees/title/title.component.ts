import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component(
  {
    selector: 'manager-course-attendees-title',
    templateUrl: './title.template.html',
    styleUrls: ['./title.style.scss'],
  }
)
export class ManagerCourseAttendeesTitleComponent {
  @Input() isEditing: boolean;

  @Output() onCancel = new EventEmitter<boolean>();
}
