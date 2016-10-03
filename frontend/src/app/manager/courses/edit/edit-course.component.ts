import { Component, Input } from '@angular/core';
import { CreateCourseErrors, CreateCourseRequest } from '../../../course/course.model';
import { CoursesService } from '../../../course/courses.service';
import { Router } from '@angular/router';

@Component(
  {
    selector: 'edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.scss'],
  }
)
export class EditCourseComponent {

  @Input() model: CreateCourseRequest;
  @Input() errors: CreateCourseErrors;
  isGeneralErrorMessage: Boolean = false;

  constructor(private router: Router, private coursesService: CoursesService) {
  }

  handleErrors(error: any) {
    this.isGeneralErrorMessage = (typeof error === 'string');
    this.errors = error;
  }

  save() {
    console.log('save');
    this.coursesService.create(this.model).subscribe(
      (course) => {
        this.router.navigate(['/manager/courses', course.id]);
      }, (errors) => this.handleErrors(errors)
    );
  }
}
