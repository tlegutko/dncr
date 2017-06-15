import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications/src/notifications.service';
import { Course, PaymentsService } from 'app/course';
import { Attendee, PaymentConfirmation } from 'app/attendee';

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

  constructor(
    private route: ActivatedRoute, private router: Router, private paymentService: PaymentsService,
    private notifications: NotificationsService
  ) {
    route.data.forEach(
      (data: { course: Course, attendee: Attendee }) => {
        this.course = data.course;
        this.attendee = data.attendee;
      }
    );
  }

  public confirmPayment(confirmation: PaymentConfirmation) {
    this.paymentService.create(confirmation).subscribe(
      () => this.notifications.success('Zapłacono!', 'Płatność została zapisana.'),
      (error) => this.notifications.error('Błąd', 'Nie udało się zapisać płatności.')
    );
  }

  public close() {
    this.router.navigate(['/manager/courses', this.course.id]);
  }
}
