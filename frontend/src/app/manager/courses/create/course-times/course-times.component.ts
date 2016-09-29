import { Component } from '@angular/core';
import { CourseTimeForm } from '../create-course.model';

interface CourseTimesErrors {
  startTime?: string[];
  endTime?: string[];
  repeatWeeksCount?: string[];
}

@Component(
  {
    selector: 'course-times',
    templateUrl: './course-times.component.html',
    styleUrls: ['./course-times.component.scss']
  }
)
export class CourseTimesComponent {

  defaultCourseTimes: CourseTimeForm = {
    startTime: '2016-09-30 15:00:00', // TODO have startTime passed from calendar click
    endTime: '2016-09-30 16:00:00',
    repeatWeeksCount: 1
  };
  model = this.defaultCourseTimes;
  errors: CourseTimesErrors = {};

  getModel(): CourseTimeForm {
    return this.model; // TODO convert startTime to startDate as well
  }
}
