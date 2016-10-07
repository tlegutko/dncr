import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'app/course';
import { CreateCourseErrors } from '../../../course/course.model';
import { CoursesService } from '../../../course/courses.service';

@Component(
  {
    selector: 'manager-courses-single',
    styleUrls: ['./single.component.scss'],
    templateUrl: './single.component.html'
  }
)
export class ManagerCoursesSingleComponent implements OnInit {
  private course: Course;
  private errors: CreateCourseErrors = {};

  constructor(private router: Router, private route: ActivatedRoute, private coursesService: CoursesService) {
  }

  public ngOnInit() {
    this.route.data.forEach(
      (data: { course: Course }) => {
        this.course = data.course;
      }
    );
  }

  public onSave() {
    this.coursesService.broadcastCourseSaveRequest();
  }

  public close() {
    this.router.navigate(['/manager/courses']);
  }
}
