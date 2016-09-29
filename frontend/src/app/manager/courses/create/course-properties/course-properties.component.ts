import { Component } from '@angular/core';
import { CoursePropertiesForm } from '../create-course.model';
@Component(
  {
    selector: 'course-properties',
    templateUrl: './course-properties.component.html',
    styleUrls: ['./course-properties.component.scss']
  }
)
export class CreateCoursePropertiesComponent {

  model = new CoursePropertiesForm;
  errors: CoursePropertiesErrors = {};
  // TODO fetch instr and locations from backend
  instructors = ['Jan Kowalski', 'Stanisław Taneczny', 'Zosia Zgrabna'];
  locations = ['Duża sala', 'Mała sala', 'Sala awaryjna'];

  getModel() {
    return this.model; // TODO convert instr names to id only
  }
}

interface CoursePropertiesErrors {
  classesCount?: string[];
  seatsCount?: string[];
  instructorId?: string[];
  locationId?: string[];
  price?: string[];
  description?: string[];
}
