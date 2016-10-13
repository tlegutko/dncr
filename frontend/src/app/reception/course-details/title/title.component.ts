import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component(
  {
    selector: 'course-details-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.scss'],
  }
)
export class CourseDetailsTitleComponent {
  @Input() title: string;
  @Input() isEditing: boolean;

  @Output() onCancel = new EventEmitter<boolean>();

  constructor(private router: Router) {
  }

  public close() {
    this.router.navigate(['/reception']);
  }
}
