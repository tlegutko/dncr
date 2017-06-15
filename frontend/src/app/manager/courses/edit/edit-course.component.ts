import { Component, Input, OnInit } from '@angular/core';
import { CourseErrors, Course, CourseTime, CourseTimeErrors } from '../../../course/course.model';
import { CourseLocation } from '../../locations/locations.model';
import { CoursesService } from '../../../course/courses.service';

@Component(
  {
    selector: 'edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.scss'],
  }
)
export class EditCourseComponent implements OnInit {

  @Input() model: Course;
  @Input() errors: CourseErrors;
  @Input() locations: CourseLocation[];
  @Input() updateTime: boolean;

  constructor(private coursesService: CoursesService) {
  }

  ngOnInit(): void {
    if (this.updateTime) {
      this.coursesService.recentlyClickedTime.subscribe(
        (courseTime) => {
          this.model.times[this.model.times.length - 1].setTime(courseTime);
        }
      );
    }
  }

  addCourseTime() {
    this.model.times.push(new CourseTime());
    this.errors.times.push(new CourseTimeErrors());
  }

}


