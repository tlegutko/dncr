import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component(
  {
    selector: 'course-details-title',
    templateUrl: './title.template.html',
    styleUrls: ['./title.style.scss'],
  }
)
export class CourseDetailsTitleComponent {
  @Input() title: string;
  @Input() isEditing: boolean;

  @Output() onSave = new EventEmitter<boolean>();
  @Output() onCancel = new EventEmitter<boolean>();
}
