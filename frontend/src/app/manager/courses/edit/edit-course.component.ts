import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CourseErrors, Course, CourseTime, CourseTimeErrors, CreateCourseTime } from '../../../course/course.model';
import { CourseLocation } from '../../locations/locations.model';
import { LocationsService } from '../../locations/locations.service';

@Component(
  {
    selector: 'edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.scss'],
  }
)
export class EditCourseComponent implements OnInit, OnChanges {

  @Input() model: Course;
  @Input() errors: CourseErrors;
  locations: CourseLocation[];
  timeToSet: CreateCourseTime = null;

  constructor(private locationsService: LocationsService) {
  }

  ngOnInit(): void {
    if (this.timeToSet != null) {
      this.setTime(this.timeToSet);
    }
    this.locationsService.list().subscribe(
      (locations) => this.locations = locations, (errors) => this.errors = errors
    );
  }

  public setTime(courseTime: CreateCourseTime) {
    if (this.model != null) {
      this.model.times[this.model.times.length - 1].setTime(courseTime);
    } else {
      this.timeToSet = courseTime;
    }
  }

  addCourseTime() {
    this.model.times.push(CourseTime.withDefaultRepeatCount());
    this.errors.times.push(new CourseTimeErrors());
  }

  ngOnChanges() {
    this.reinitializeErrors();
  }

  private reinitializeErrors() {
    for (let i = 0; i < this.model.times.length; i++) {
      if (this.errors.times[i] == null) {
        this.errors.times[i] = new CourseTimeErrors();
      }
    }
  }

}


