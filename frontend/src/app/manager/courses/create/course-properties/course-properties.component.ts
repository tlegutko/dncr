import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CreateCourseErrors, CreateCourseRequest } from '../create-course.model';
import { InstructorsService } from '../../../instructors/instructors.service';
import { Instructor } from '../../../instructors/instructor';
import { LocationsService } from '../../../locations/locations.service';
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
  @Output() error = new EventEmitter<CreateCourseErrors>();
  instructors: Instructor[];
  locations: any[];

  constructor(private instructorsService: InstructorsService, private locationsService: LocationsService) {
  }

  public ngOnInit(): void {
    this.instructorsService.list().subscribe(
      (instructors) => this.instructors = instructors, (errors) => this.error.emit(errors)
    );
    this.locationsService.list().subscribe(
      (locations) => this.locations = locations, (errors) => this.error.emit(errors)
    );
  }

}
