import { Component } from '@angular/core';
import { CreateAttendeeComponent } from '../../create-attendee/create-attendee.component';
import { CourseDetailsTitleComponent } from './course-details-title/course-details-title.component';
import {
  CourseDetailsActionButtonComponent
} from
  './course-details-action-button/course-details-action-button.component';

@Component(
  {
    selector: 'course-details',
    templateUrl: './course-details.component.html',
    directives: [
      CreateAttendeeComponent, CourseDetailsTitleComponent, CourseDetailsActionButtonComponent
    ]
  }
)
export class CourseDetailsComponent {
  courseDetails = {
    title: 'Salsa (początkujący)'
  };
  showCreateAttendeeForm = false;
  error = '';

  toggleCreateAttendeeForm(showCreateAttendeeForm: boolean) {
    this.showCreateAttendeeForm = showCreateAttendeeForm;
  }
}
