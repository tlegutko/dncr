import { Component, Input } from '@angular/core';
import { CreateCourseErrors, CreateCourseRequest } from '../create-course.model';
@Component(
  {
    selector: 'course-properties',
    templateUrl: './course-properties.component.html',
    styleUrls: ['./course-properties.component.scss']
  }
)
export class CreateCoursePropertiesComponent {

  @Input() model: CreateCourseRequest;
  @Input() errors: CreateCourseErrors;
  // TODO fetch instr and locations from backend
  instructors = ['Jan Kowalski', 'Stanisław Taneczny', 'Zosia Zgrabna'];
  locations = ['Duża sala', 'Mała sala', 'Sala awaryjna'];

}
