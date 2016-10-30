import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Course, PaymentMethodsService } from 'app/course';
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
    private route: ActivatedRoute, private paymentService: PaymentMethodsService,
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
}
