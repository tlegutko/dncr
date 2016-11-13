import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CourseTime, CourseTimeErrors } from 'app/course';
import { CourseLocation, LocationsService } from 'app/manager/locations';

@Component(
  {
    selector: 'course-times',
    templateUrl: './course-times.component.html',
    styleUrls: ['./course-times.component.scss'],
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
