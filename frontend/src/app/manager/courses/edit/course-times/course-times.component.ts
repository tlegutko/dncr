import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { StoreCourseErrors, CourseTime } from '../../../../course/course.model';
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
export class CourseTimesComponent implements OnInit {

  @Input() model: CourseTime[];
  @Input() errors: StoreCourseErrors;
  locations: CourseLocation[];

  constructor(private locationsService: LocationsService){
  }

  public ngOnInit(): void {
    this.locationsService.list().subscribe(
      (locations) => this.locations = locations, (errors) => this.errors = errors
    );
  }

}
