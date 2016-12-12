import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseErrors, Course, CoursesService } from 'app/course';

@Component(
  {
    selector: 'create-course',
    template: `
      <course-title [model]="model" [editable]="true" [errors]="errors.name" (save)="onSave($event)" 
                    (close)="onClose()"></course-title>
      <edit-course [model]="model" [errors]="errors"></edit-course>
    `,
    styles: [':host { display: block }'],
  }
)
export class CreateCourseComponent implements OnInit {
  model = new Course();
  errors: CourseErrors = new CourseErrors();

  constructor(private router: Router, private coursesService: CoursesService) {
  }

  public ngOnInit() {
    this.coursesService.recentlyClickedTime.subscribe(
      (courseTime) => {
        this.model.setTime(courseTime);
      }
    );
  }

  onSave(callback: (result: boolean) => void) {
    this.coursesService.create(this.model).subscribe(
      (course) => {
        this.router.navigate(['/manager/courses', course.id]);
        callback(true);
      }, (errors) => {
        this.errors.update(errors);
        callback(false);
      }
    );
  }

  onClose() {
    this.router.navigate(['/manager/courses']);
  }
}
