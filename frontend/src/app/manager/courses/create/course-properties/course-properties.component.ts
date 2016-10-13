import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { InstructorsService } from '../../../instructors/instructors.service';
import { Instructor } from '../../../instructors/instructor';
import { LocationsService } from '../../../locations/locations.service';
import { CreateCourseRequest, CreateCourseErrors } from '../../../../course/course.model';
import { CourseLocation } from '../../../locations/locations.model';
@Component(
  {
    selector: 'course-properties',
    templateUrl: './course-properties.component.html',
    styleUrls: ['./course-properties.component.scss']
  }
)
export class CreateCoursePropertiesComponent implements OnInit {

  @Input() model: CreateCourseRequest;
  @Input() errors: CreateCourseErrors;
  instructors: Instructor[];
  locations: CourseLocation[];

  constructor(private instructorsService: InstructorsService, private locationsService: LocationsService) {
  }

  public ngOnInit(): void {
    this.instructorsService.list().subscribe(
      (instructors) => this.instructors = instructors, (errors) => this.errors = errors
    );
    this.locationsService.list().subscribe(
      (locations) => this.locations = locations, (errors) => this.errors = errors
    );
  }

}
