import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'app/course';
import { CourseErrors } from '../../../course/course.model';
import { CoursesService } from '../../../course/courses.service';
import { CourseTitleComponent } from '../course-title/course-title.component';

@Component(
  {
    selector: 'manager-courses-single',
    styleUrls: ['./single.component.scss'],
    templateUrl: './single.component.html'
  }
)
export class ManagerCoursesSingleComponent implements OnInit {

  @ViewChild(CourseTitleComponent) titleComponent: CourseTitleComponent;
  private course: Course;
  private errors: CourseErrors = new CourseErrors();

  constructor(private router: Router, private route: ActivatedRoute, private coursesService: CoursesService) {
  }

  public ngOnInit() {
    this.route.data.forEach(
      (data: { course: Course }) => {
        this.course = data.course;
      }
    );
  }

  onSave() {
    this.coursesService.create(this.course).subscribe(
      (course) => {
        this.course = course;
        this.titleComponent.onSuccessfulSave();
      }, (errors) => {
        this.titleComponent.onEditCourseErrors();
        return this.errors = errors;
      }
    );
  }

  onClose() {
    this.router.navigate(['/manager/courses']);
  }

}
