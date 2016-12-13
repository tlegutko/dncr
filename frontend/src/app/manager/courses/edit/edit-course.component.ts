import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Course, CourseErrors, CoursesService, CourseTime, CourseTimeErrors } from 'app/course';
import { CourseLocation } from 'app/manager/locations';
import { Instructor } from 'app/manager/instructors';

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
  @Input() instructors: Instructor[];

  constructor(private coursesService: CoursesService) {
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
  }

  addCourseTime() {
    let lastCourseTime = this.model.times[this.model.times.length - 1];
    let newCourseTime = new CourseTime();
    newCourseTime.instructors = lastCourseTime.instructors;
    newCourseTime.locationId = lastCourseTime.locationId;
    newCourseTime.repeatWeeksCount = lastCourseTime.repeatWeeksCount;
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


