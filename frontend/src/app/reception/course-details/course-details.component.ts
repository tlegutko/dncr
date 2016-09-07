import { Component } from '@angular/core';
import { Attendee } from '../../create-attendee/attendee';

@Component(
  {
    selector: 'course-details',
    templateUrl: './course-details.template.html',
    styleUrls: ['./course-details.style.scss']
  }
)
export class CourseDetailsComponent {
  course = {
    title: 'Salsa (początkujący)'
  };
  isCreateFormVisible = false;
  error = '';

  public onAttendeeSaved(attendee: Attendee) {
    // TODO: new attendee should be added to the list when it's implemented
    this.hideCreateForm();
  }

  showCreateForm() {
    this.isCreateFormVisible = true;
  }

  hideCreateForm() {
    this.isCreateFormVisible = false;
  }
}
