import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'app/course';
import { MailService } from './mail.service';
import { AttendeeService } from 'app/attendee/attendee.service';
import { Mail } from './mail.model';

@Component(
  {
    selector: 'manager-courses-single-actions',
    templateUrl: './actions.component.html'
  }
)
export class ManagerCoursesActionsComponent {
  public course: Course;

  constructor(route: ActivatedRoute, private mailService: MailService) {
    route.parent.data.forEach(
      (data: { course: Course }) => {
        this.course = data.course;
      }
    );
  }

  public sendMailToAttendees(message: string) {
    this.mailService.send(
      new Mail(
        this.course.id, 'Powiadomienie z' + ' DNCR.PL z: ' + this.course.name, message
        // TODO: Change title when styling mails
      )
    );
  }
}
