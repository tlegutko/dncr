import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../course/courses.service';
import { AttendeeService } from '../../attendee/attendee.service';
import { Course } from '../../course/course.model';
import { Attendee } from '../../attendee/attendee';
import { AttendeeDetailsTitleComponent } from './title/title.component';

@Component(
  {
    selector: 'attendee-details',
    templateUrl: './attendee-details.component.html',
    styleUrls: ['./attendee-details.component.scss']
  }
)
export class AttendeeDetailsComponent implements OnInit {
  course = new Course();
  attendee = new Attendee();
  @ViewChild(AttendeeDetailsTitleComponent) private titleComponent: AttendeeDetailsTitleComponent;

  constructor(
    private route: ActivatedRoute, private coursesService: CoursesService,
    private attendeeService: AttendeeService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        let attendeeId = params['attendee-id'];
        this.attendeeService.getAttendee(attendeeId).subscribe(
          (attendee) => this.attendee = attendee
        );
        let courseId = params['course-id'];
        this.coursesService.get(courseId).subscribe(
          (course) => this.course = course
        );
      }
    );
  }
}
