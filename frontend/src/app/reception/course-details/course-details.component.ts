import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Attendee, AttendeeService, PaymentConfirmation } from 'app/attendee';
import { Course, PaymentMethod, PaymentsService } from 'app/course';
import { NotificationsService } from 'angular2-notifications/src/notifications.service';

@Component(
  {
    selector: 'course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.scss']
  }
)
export class CourseDetailsComponent {
  public course: Course;
  public paymentMethods: PaymentMethod[];
  isCreateFormVisible = false;
  error = '';

  constructor(
    private route: ActivatedRoute, private router: Router
  ) {
    route.data.forEach(
      (data: { course: Course, methods: PaymentMethod[] }) => {
        this.course = data.course;
        this.paymentMethods = data.methods;
      }
    );
  }

  public close() {
    this.router.navigate(['/reception']);
  }
}
