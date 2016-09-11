import { Component } from '@angular/core';
import { Attendee } from '../../attendee/attendee';
import { CourseDetailsModel } from './course-details.model';

@Component({
    selector: 'course-details',
    templateUrl: './course-details.template.html',
    styleUrls: ['./course-details.style.scss']
  }
)
export class CourseDetailsComponent {
  course = { // TODO: populate view with an actual course from database
    title: 'Salsa (początkujący)',
  };
  isCreateFormVisible = false;
  error = '';

  public onAttendeeSaved(attendee: Attendee) {
    // this.course.attendee += attendee; // TODO: refresh?
    this.hideCreateForm();
  }

  showCreateForm() {
    this.isCreateFormVisible = true;
  }

  hideCreateForm() {
    this.isCreateFormVisible = false;
  }
}
