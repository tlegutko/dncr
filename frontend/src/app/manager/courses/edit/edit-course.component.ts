import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CourseErrors, Course, CourseTime, CourseTimeErrors, CreateCourseTime } from '../../../course/course.model';
import { CourseLocation } from '../../locations/locations.model';
import { LocationsService } from '../../locations/locations.service';
import { InstructorsService } from '../../instructors/instructors.service';
import { Instructor } from '../../instructors/instructor';
import * as moment from 'moment';
import { Moment } from 'moment';

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
  instructors: Instructor[];
  timeToSet: CreateCourseTime = null;

  constructor(private locationsService: LocationsService, private instructorsService: InstructorsService) {
  }

  ngOnInit(): void {
    if (this.timeToSet != null) {
      this.setTime(this.timeToSet);
    }
    this.model.times = this.sortCourseTimes(this.model.times);
    this.locationsService.list().subscribe(
      (locations) => this.locations = locations, (errors) => this.errors = errors
    );
    this.instructorsService.list().subscribe(
      (instructors) => this.instructors = instructors, (errors) => this.errors = errors
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
    let lastCourseTime = this.model.times[this.model.times.length - 1];
    let newCourseTime = CourseTime.withDefaultRepeatCount();
    newCourseTime.instructors = lastCourseTime.instructors;
    newCourseTime.locationId = lastCourseTime.locationId;
    this.model.times.push(newCourseTime);
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

  private sortCourseTimes(times: CourseTime[]): CourseTime[] {
    let extractTime = (ct: CourseTime): Moment => moment.utc(`${ct.startDate} ${ct.startTime}`);
    return times.sort(
      (ct1: CourseTime, ct2: CourseTime) => extractTime(ct1).diff(extractTime(ct2))
    );
  }

}


