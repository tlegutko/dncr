import { Component } from '@angular/core';
import { CreateAttendeeComponent } from '../../create-attendee/create-attendee.component';
import { CourseDetailsTitleComponent } from './title/title.component';
import {
  CourseDetailsActionButtonComponent
} from
  './action-button/action-button.component';

@Component(
  {
    selector: 'course-details',
    templateUrl: './course-details.template.html',
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
