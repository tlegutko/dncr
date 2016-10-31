import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'app/course';
import { Attendee } from 'app/attendee';

@Component(
  {
    selector: 'attendee-details',
    templateUrl: './attendee-details.component.html',
    styleUrls: ['./attendee-details.component.scss']
  }
)
export class AttendeeDetailsComponent {
  course = new Course();
  attendee = new Attendee();

  constructor(private route: ActivatedRoute) {
    route.data.forEach(
      (data: { course: Course, attendee: Attendee }) => {
        this.course = data.course;
        this.attendee = data.attendee;
      }
    );
  }
}
