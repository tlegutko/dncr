import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, CourseErrors } from 'app/course';
import { CourseLocation } from 'app/manager/locations';

@Component(
  {
    selector: 'manager-courses-single-details',
    template: `<edit-course [model]="model" [errors]="errors" [locations]="locations" 
               [updateTime]="false"></edit-course>`
  }
)
export class ManagerCoursesDetailsComponent implements OnInit {
  model: Course;
  errors: CourseErrors = new CourseErrors();
  locations: CourseLocation[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.parent.data.forEach(
      (data: { course: Course, courseErrors: CourseErrors, locations: CourseLocation[] }) => {
        this.model = data.course;
        this.errors = data.courseErrors;
        this.locations = data.locations;
      }
    );
  }
}
