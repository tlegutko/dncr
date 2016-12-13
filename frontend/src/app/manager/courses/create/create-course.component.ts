import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseErrors, Course, CoursesService } from 'app/course';
import { CourseLocation } from 'app/manager/locations';
import { Instructor } from 'app/manager/instructors';

@Component(
  {
    selector: 'create-course',
    template: `
      <course-title [model]="model" [editable]="true" [errors]="errors.name" (save)="onSave($event)" 
                    (close)="onClose()"></course-title>
      <edit-course [model]="model" [errors]="errors" [locations]="locations" [instructors]="instructors" 
                   [updateTime]="true"></edit-course>
    `,
    styles: [':host { display: block }'],
  }
)
export class CreateCourseComponent implements OnInit {
  model = new Course();
  errors: CourseErrors = new CourseErrors();
  locations: CourseLocation[];
  instructors: Instructor[];

  constructor(private router: Router, private route: ActivatedRoute, private coursesService: CoursesService) {
  }

  public ngOnInit() {
    this.route.data.forEach(
      (data: { locations: CourseLocation[], instructors: Instructor[]}) => {
        this.locations = data.locations;
        this.instructors = data.instructors;
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
