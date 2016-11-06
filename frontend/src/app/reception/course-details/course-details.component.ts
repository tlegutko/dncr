import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Attendee, AttendeeService, PaymentMethod, PaymentConfirmation } from 'app/attendee';
import { Course } from 'app/course';

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
  public paymentMethods: PaymentMethod[] = [
    {
      label: 'Gotówka'
    }, {
      label: 'Benefit'
    }
  ];
  isCreateFormVisible = false;
  error = '';

  constructor(private route: ActivatedRoute, private attendeeService: AttendeeService, private router: Router) {
    route.data.forEach(
      (data: { course: Course }) => {
        this.course = data.course;
        this.getAttendees(this.course);
      }
    );
  }

  public onAttendeeSaved(attendee: Attendee) {
    this.attendees.push(attendee);
    this.hideCreateForm();
  }

  public confirmPayment(confirmation: PaymentConfirmation) {
    console.log('confirmed', confirmation);
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
