import { Component, Input, OnInit } from '@angular/core';
import { InstructorsService } from '../../../instructors/instructors.service';
import { Instructor } from '../../../instructors/instructor';
import { CourseErrors, Course } from '../../../../course/course.model';
@Component(
  {
    selector: 'course-properties',
    templateUrl: './course-properties.component.html',
    styleUrls: ['./course-properties.component.scss']
  }
)
export class CreateCoursePropertiesComponent implements OnInit {

  @Input() model: Course;
  @Input() errors: CourseErrors;
  instructors: Instructor[];

  constructor(private instructorsService: InstructorsService) {
  }

  public ngOnInit(): void {
    this.instructorsService.list().subscribe(
      (instructors) => this.instructors = instructors, (errors) => this.errors = errors
    );
  }

}
