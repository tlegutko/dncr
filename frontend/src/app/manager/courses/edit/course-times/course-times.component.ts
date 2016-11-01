import { Component, Input, ViewEncapsulation, OnChanges, OnInit } from '@angular/core';
import { CourseTime, CourseTimeErrors } from '../../../../course/course.model';
import { CourseLocation } from '../../../locations/locations.model';
import { LocationsService } from '../../../locations/locations.service';

@Component(
  {
    selector: 'course-times',
    templateUrl: './course-times.component.html',
    styleUrls: ['./course-times.component.scss'],
    encapsulation: ViewEncapsulation.None,
  }
)
export class CourseTimesComponent implements OnInit, OnChanges {

  @Input() model: CourseTime[];
  @Input() errors: CourseTimeErrors[];
  locations: CourseLocation[];

  constructor(private locationsService: LocationsService) {
  }

  public ngOnInit(): void {
    this.locationsService.list().subscribe(
      (locations) => this.locations = locations, (errors) => this.errors = errors
    );
  }

  ngOnChanges() {
    if (this.errors == null || this.errors[0] == null) {
      this.errors = [new CourseTimeErrors()];
    }
  }

}
