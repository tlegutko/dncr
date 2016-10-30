import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Attendee, AttendeeService, PaymentConfirmation } from 'app/attendee';
import { Course, PaymentMethod, PaymentMethodsService } from 'app/course';
import { NotificationsService } from 'angular2-notifications';

@Component(
  {
    selector: 'course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.scss']
  }
)
export class CourseDetailsComponent {
  public course: Course;
  public attendees: Attendee[];
  public paymentMethods: PaymentMethod[];
  isCreateFormVisible = false;
  error = '';

  constructor(
    private route: ActivatedRoute, private attendeeService: AttendeeService,
    private paymentService: PaymentMethodsService, private notifications: NotificationsService
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
    this.paymentService.create(confirmation).subscribe(
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

  private getAttendees(course: Course) {
    this.attendeeService.getAttendees(course)
      .subscribe(
        (attendees) => this.attendees = attendees, (error: any) => this.error = error
      );
  }
}
