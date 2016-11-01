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
  private errors: CourseErrors;

  constructor(private router: Router, private route: ActivatedRoute, private coursesService: CoursesService) {
  }

  public ngOnInit() {
    this.route.data.forEach(
      (data: { course: Course, courseErrors: CourseErrors }) => {
        this.course = data.course;
        this.errors = data.courseErrors;
      }
    );
  }

  onSave() {
    this.coursesService.create(this.course).subscribe(
      (course) => {
        this.course = course;
        this.titleComponent.onSuccessfulSave();
      }, (errors) => {
        Object.assign(this.errors, errors);
        this.titleComponent.onEditCourseErrors();
      }
    );
  }

  onClose() {
    this.router.navigate(['/manager/courses']);
  }

}
