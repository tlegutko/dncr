import { Component, Input, OnInit } from '@angular/core';
import { CreateCourseRequest, CreateCourseErrors } from '../../../../course/course.model';

@Component(
  {
    selector: 'course-times',
    templateUrl: './course-times.component.html',
    styleUrls: ['./course-times.component.scss'],
  }
)
export class CourseTimesComponent implements OnInit {

  @Input() model: CreateCourseRequest;
  @Input() errors: CreateCourseErrors;

  public ngOnInit() {
    this.model.startTime = '2016-09-30 15:00:00'; // TODO have startTime passed from calendar click
    this.model.endTime = '2016-09-30 16:00:00';
    this.model.startDate = '2016-09-30';
    this.model.repeatWeeksCount = 1;
  }
}
