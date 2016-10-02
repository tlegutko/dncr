import { Component, Input, OnInit } from '@angular/core';
import { CreateCourseRequest, CreateCourseErrors } from '../../../../course/course.model';
import { CoursesService } from '../../../../course/courses.service';

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

  constructor(private coursesService: CoursesService) {
  }

  public ngOnInit() {
    let courseTime = this.coursesService.getRecentlyClickedTime();
    this.model.startTime = courseTime.startTime;
    this.model.endTime = courseTime.endTime;
    this.model.repeatWeeksCount = 1;
  }
}
