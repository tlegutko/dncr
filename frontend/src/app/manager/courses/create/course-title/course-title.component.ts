import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CreateCourseRequest, CreateCourseErrors } from '../../../../course/course.model';
@Component(
  {
    selector: 'course-title',
    templateUrl: './course-title.component.html',
    styleUrls: ['./course-title.component.scss'],
  }
)
export class CreateCourseTitleComponent {
  @Input() model: CreateCourseRequest;

  @Input() errors: CreateCourseErrors;
  @Output() save = new EventEmitter<boolean>();
}
