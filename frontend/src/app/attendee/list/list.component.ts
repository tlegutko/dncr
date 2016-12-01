import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Attendee, AttendeeService, PaymentConfirmation } from 'app/attendee';
import { Course, PaymentMethod, PaymentsService } from 'app/course';
import { NotificationsService } from 'angular2-notifications/src/notifications.service';

@Component(
  {
    selector: 'attendee-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
  }
)
export class AttendeeListComponent {
  public course: Course;
  public attendees: Attendee[];
  public paymentMethods: PaymentMethod[];
  isCreateFormVisible = false;
  error = '';

  constructor(
    private route: ActivatedRoute, private router: Router, private attendeeService: AttendeeService,
    private paymentsService: PaymentsService, private notifications: NotificationsService
  ) {
    route.data.forEach(
      (data: { course: Course, methods: PaymentMethod[] }) => {
        this.course = data.course;
        this.paymentMethods = data.methods;
        this.getAttendees(this.course);
      }
    );
  }

  public onAttendeeSaved(attendee: Attendee) {
    this.attendees.push(attendee);
    this.hideCreateForm();
  }

  public confirmPayment(confirmation: PaymentConfirmation) {
    this.paymentsService.create(confirmation).subscribe(
      () => this.notifications.success('Zapłacono!', 'Płatność została zapisana.'),
      (error) => this.notifications.error('Błąd', 'Nie udało się zapisać płatności.')
    );
  }

  public showCreateForm() {
    this.isCreateFormVisible = true;
  }

  public hideCreateForm() {
    this.isCreateFormVisible = false;
  }

  public close() {
    this.router.navigate(['/reception']);
  }

  private getAttendees(course: Course) {
    this.attendeeService.getAttendees(course)
      .subscribe(
        (attendees) => this.attendees = attendees, (error: any) => this.error = error
      );
  }
}
