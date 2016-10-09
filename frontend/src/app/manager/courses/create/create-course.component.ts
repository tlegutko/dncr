import { Component, OnInit } from '@angular/core';
import { CreateCourseErrors, CreateCourseRequest, CreateCourseTime } from '../../../course/course.model';
import { CoursesService } from '../../../course/courses.service';
@Component(
  {
    selector: 'create-course',
    template: `
      <course-title [model]="model" [errors]="errors" [isEditing]="true" (save)="editCourse.save()"></course-title>
      <edit-course #editCourse [model]="model" [errors]="errors"></edit-course>
    `,
    styles: [':host { display: block }'],
  }
)
export class CreateCourseComponent implements OnInit {
  model = new CreateCourseRequest();
  errors: CreateCourseErrors = {};

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
