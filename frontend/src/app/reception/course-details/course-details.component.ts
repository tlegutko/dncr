import { Component } from '@angular/core';
import { Attendee } from '../../create-attendee/attendee';
import { GetCourseAttendeesService } from './course-details-attendees.service';
import { CourseDetailsModel } from './course-details.model';

@Component({
    selector: 'course-details',
    templateUrl: './course-details.template.html',
    styleUrls: ['./course-details.style.scss'],
    providers: [GetCourseAttendeesService]
  }
)
export class CourseDetailsComponent {
  course = { // TODO: populate view with an actual course from database
    title: 'Salsa (początkujący)',
    attendees: this.getAttendees()
  };
  isCreateFormVisible = false;
  error = '';

  constructor(private getCourseAttendeesService: GetCourseAttendeesService) {
  }

  getAttendees() {
    this.getCourseAttendeesService.getAttendees();
  }

  public onAttendeeSaved(attendee: Attendee) {
    // this.course.attendees += attendee; // TODO: refresh?
    this.hideCreateForm();
  }

  showCreateForm() {
    this.isCreateFormVisible = true;
  }

  hideCreateForm() {
    this.isCreateFormVisible = false;
  }
}
