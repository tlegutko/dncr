import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Attendee, AttendeeService } from 'app/attendee';
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
  isCreateFormVisible = false;
  error = '';

  constructor(private attendeeService: AttendeeService, private router: Router, private route: ActivatedRoute) {
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

  public showCreateForm() {
    this.isCreateFormVisible = true;
  }

  public hideCreateForm() {
    this.isCreateFormVisible = false;
  }

  public onOpenAttendeeDetails(attendee: Attendee) {
    this.router.navigate(['./attendee-details/', attendee.id], { relativeTo: this.route });
  }

  private getAttendees(course: Course) {
    this.attendeeService.getAttendees(course)
      .subscribe(
        (attendees) => this.attendees = attendees, (error: any) => this.error = error
      );
  }

}
