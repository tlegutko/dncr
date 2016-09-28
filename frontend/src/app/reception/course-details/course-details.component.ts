import { Component } from '@angular/core';
import { Attendee, AttendeeService } from 'app/attendee';
import { CourseDetailsModel } from './course-details.model';

@Component(
  {
    selector: 'course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.scss'],
    providers: [AttendeeService] // TODO: Don't get all attendees from database, take them from a course
  }
)
export class CourseDetailsComponent {
  // TODO: populate view with an actual course from database
  course: CourseDetailsModel = {
    id: 1,
    title: 'Salsa (początkujący)',
    attendees: null
  };
  isCreateFormVisible = false;
  error = '';

  constructor(private attendeeService: AttendeeService) {
    this.getAttendees();
  } // TODO: remove when attendees will be taken from course

  public onAttendeeSaved(attendee: Attendee) {
    this.course.attendees.push(attendee);
    this.hideCreateForm();
  }

  showCreateForm() {
    this.isCreateFormVisible = true;
  }

  hideCreateForm() {
    this.isCreateFormVisible = false;
  }

  getAttendees() { // TODO: remove when attendees will be taken from course
    this.attendeeService.getAttendees()
      .subscribe(
        (attendees) => this.course.attendees = attendees, (error: any) => this.error = error
      );
  }
}
