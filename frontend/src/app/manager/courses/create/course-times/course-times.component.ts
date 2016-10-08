import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CreateCourseRequest, CreateCourseErrors, CreateCourseTime } from '../../../../course/course.model';
import { CoursesService } from '../../../../course/courses.service';

@Component(
  {
    selector: 'course-times',
    templateUrl: './course-times.component.html',
    styleUrls: ['./course-times.component.scss'],
    encapsulation: ViewEncapsulation.None,
  }
)
export class CourseTimesComponent implements OnInit {

  @Input() model: CreateCourseRequest;
  @Input() errors: CreateCourseErrors;

  constructor(private coursesService: CoursesService) {
  }

  public ngOnInit() {
    this.model.repeatWeeksCount = 1;
    this.coursesService.recentlyClickedTime.subscribe(
      (courseTime) => this.setModelTime(courseTime)
    );
  }

  private setModelTime(courseTime: CreateCourseTime) {
    this.model.startTime = courseTime.startTime;
    this.model.endTime = courseTime.endTime;
  }

}
