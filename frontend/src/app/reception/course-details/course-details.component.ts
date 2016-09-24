import { Component, OnInit } from '@angular/core';
import { Attendee } from 'app/attendee/attendee';
import { AttendeeService } from 'app/attendee/attendee.service';

@Component({
    selector: 'course-details',
    templateUrl: './course-details.template.html',
    styleUrls: ['./course-details.style.scss'],
    providers: [AttendeeService] // TODO: Don't get all attendees from database, take them from a course
  }
)
export class CourseDetailsComponent implements OnInit { // TODO: remove "implements OnInit" when attendees will be taken
  // from course
  course = { // TODO: populate view with an actual course from database
    title: 'Salsa (początkujący)',
    attendees: null
  };
  isCreateFormVisible = false;
  error = '';

  constructor(private attendeeService: AttendeeService) {
  } // TODO: remove when attendees will be taken from course

  public ngOnInit(): void {
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
