import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseErrors, Course, CourseTime } from '../../../course/course.model';
import { CoursesService } from '../../../course/courses.service';
import { Router } from '@angular/router';
import { CourseTitleComponent } from '../course-title/course-title.component';
import { EditCourseComponent } from '../edit/edit-course.component';
@Component(
  {
    selector: 'create-course',
    template: `
      <course-title [model]="model" [errors]="errors" (save)="onSave()" (close)="onClose()"></course-title>
      <edit-course [model]="model" [errors]="errors"></edit-course>
    `,
    styles: [':host { display: block }'],
  }
)
export class CreateCourseComponent implements OnInit {
  model = new Course();
  errors: CourseErrors = new CourseErrors();
  @ViewChild(CourseTitleComponent) titleComponent: CourseTitleComponent;
  @ViewChild(EditCourseComponent) editComponent: EditCourseComponent;

  constructor(private router: Router, private coursesService: CoursesService) {
    this.model = Course.mock();
  }

  public ngOnInit() {
    this.model.times = [CourseTime.withDefaultRepeatCount()];
    this.coursesService.recentlyClickedTime.subscribe(
      (courseTime) => {
        this.editComponent.setTime(courseTime);
      }
    );
  }

  onSave() {
    this.coursesService.create(this.model).subscribe(
      (course) => {
        this.router.navigate(['/manager/courses', course.id]);
      }, (errors) => {
        this.errors = errors;
        this.titleComponent.onCreateCourseErrors();
      }
    );
  }

  onClose() {
    this.router.navigate(['/manager/courses']);
  }

}
