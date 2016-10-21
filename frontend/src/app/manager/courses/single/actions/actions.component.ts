import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'app/course';
import { MailService } from './mail.service';
import { Mail } from './mail.model';

@Component(
  {
    selector: 'manager-courses-single-actions',
    templateUrl: './actions.component.html'
  }
)
export class ManagerCoursesActionsComponent {
  private mail = new Mail();

  constructor(route: ActivatedRoute, private mailService: MailService) {
    route.parent.data.forEach(
      (data: { course: Course }) => {
        this.mail.courseId = data.course.id;
        this.mail.title = `Powiadomienie DNCR.pl z kursu ${data.course.name}`;
        // TODO: Change title when styling mails
      }
    );
  }

  public sendMailToAttendees() {
    this.mailService.send(this.mail);
  }
}
