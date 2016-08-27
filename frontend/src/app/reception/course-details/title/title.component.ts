import { Component, Input } from '@angular/core';
@Component(
  {
    selector: 'course-details-title',
    templateUrl: './title.template.html',
    styleUrls: ['./title.style.scss'],
  }
)
export class CourseDetailsTitleComponent {
  @Input() title: string;
}
