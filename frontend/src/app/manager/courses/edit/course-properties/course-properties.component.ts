import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { InstructorsService } from '../../../instructors/instructors.service';
import { Instructor } from '../../../instructors/instructor';
import { LocationsService } from '../../../locations/locations.service';
import { StoreCourseErrors, Course } from '../../../../course/course.model';
import { CourseLocation } from '../../../locations/locations.model';
@Component(
  {
    selector: 'course-properties',
    templateUrl: './course-properties.component.html',
    styleUrls: ['./course-properties.component.scss']
  }
)
export class CreateCoursePropertiesComponent implements OnInit {

  @Input() model: Course;
  @Input() errors: StoreCourseErrors;
  instructors: Instructor[];

  constructor(private instructorsService: InstructorsService, private locationsService: LocationsService) {
  }

  public ngOnInit(): void {
    this.instructorsService.list().subscribe(
      (instructors) => this.instructors = instructors, (errors) => this.errors = errors
    );
  }

}
