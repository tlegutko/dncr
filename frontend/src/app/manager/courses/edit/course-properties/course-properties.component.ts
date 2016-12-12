import { Component, Input, OnInit } from '@angular/core';
import { Instructor, InstructorsService } from 'app/manager/instructors';
import { CourseErrors, Course } from 'app/course';

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
