import { Component, Input } from '@angular/core';
@Component(
  {
    selector: 'course-details-title',
    templateUrl: './course-details-title.component.html',
    styleUrls: ['./course-details-title.component.scss'],
  }
)
export class CourseDetailsTitleComponent {
  @Input() title: string;
}
