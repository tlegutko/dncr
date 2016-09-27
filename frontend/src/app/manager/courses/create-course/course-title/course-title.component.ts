import { Component, Output, EventEmitter } from '@angular/core';
@Component(
  {
    selector: 'course-title',
    templateUrl: './course-title.template.html'
  }
)
export class CreateCourseTitleComponent {
  title: string = '';
  @Output() save = new EventEmitter<string>();
}
