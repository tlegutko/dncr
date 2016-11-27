import { Component, Input, OnInit } from '@angular/core';
import { CourseErrors, Course, CourseTime, CourseTimeErrors } from '../../../course/course.model';
import { CourseLocation } from '../../locations/locations.model';
import { LocationsService } from '../../locations/locations.service';
import { InstructorsService } from '../../instructors/instructors.service';
import { Instructor } from '../../instructors/instructor';
import * as moment from 'moment';
import { Moment } from 'moment';
import { CoursesService } from '../../../course/courses.service';

@Component(
  {
    selector: 'edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.scss'],
  }
)
export class EditCourseComponent implements OnInit {

  @Input() model: Course;
  @Input() errors: CourseErrors;
  @Input() locations: CourseLocation[];
  @Input() updateTime: boolean;
  instructors: Instructor[];

  constructor(private locationsService: LocationsService, private instructorsService: InstructorsService, private coursesService: CoursesService) {
  }

  ngOnInit(): void {
    if (this.updateTime) {
      this.coursesService.recentlyClickedTime.subscribe(
        (courseTime) => {
          this.model.times[this.model.times.length - 1].setTime(courseTime);
        }
      );
    }
    this.model.times = this.sortCourseTimes(this.model.times);
    this.instructorsService.list().subscribe(
      (instructors) => this.instructors = instructors, (errors) => this.errors = errors
    );
  }

  addCourseTime() {
    let lastCourseTime = this.model.times[this.model.times.length - 1];
    let newCourseTime = new CourseTime();
    newCourseTime.instructors = lastCourseTime.instructors;
    newCourseTime.locationId = lastCourseTime.locationId;
    this.model.times.push(newCourseTime);
    this.errors.times.push(new CourseTimeErrors());
  }

  private sortCourseTimes(times: CourseTime[]): CourseTime[] {
    let extractTime = (ct: CourseTime): Moment => moment.utc(`${ct.startDate} ${ct.startTime}`);
    return times.sort(
      (ct1: CourseTime, ct2: CourseTime) => extractTime(ct1).diff(extractTime(ct2))
    );
  }

}


