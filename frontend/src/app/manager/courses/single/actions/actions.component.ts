import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'app/course';
import { MailService } from './mail.service';
import { PlaintextMailRequest } from 'app/Http/Requests';
import { AttendeeService } from 'app/attendee/attendee.service';

@Component(
  {
    selector: 'manager-courses-single-actions',
    templateUrl: './actions.component.html'
  }
)
export class ManagerCoursesActionsComponent {
  public course: Course;

  constructor(route: ActivatedRoute, private mailService: MailService, private attendeeService: AttendeeService) {
    route.parent.data.forEach(
      (data: { course: Course }) => {
        this.course = data.course;
      }
    );
  }

  public sendMailToAttendees(context: String) {
    this.mailService.send(new PlaintextMailRequest(this.attendeeService.getAttendees(this.course), 'Powiadomienie z' +
      ' DNCR.PL z: ' + this.course.name, context));
  }
}
