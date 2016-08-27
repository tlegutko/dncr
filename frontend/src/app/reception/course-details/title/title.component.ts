import { Component, Input } from '@angular/core';
@Component(
  {
    selector: 'course-details-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.scss'],
  }
)
export class CourseDetailsTitleComponent {
  @Input() title: string;
}
