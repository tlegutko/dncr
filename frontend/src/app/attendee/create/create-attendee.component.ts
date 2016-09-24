import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AttendeeService } from '../attendee.service';
import { Attendee } from '../attendee';

interface CreateAttendeeErrors {
  name?: string[];
  surname?: string[];
  email?: string[];
  phoneNumber?: string[];
}

// TODO: Should be moved to _commons if really is common to the app.
@Component(
  {
    selector: 'create-attendee',
    templateUrl: './create-attendee.template.html',
    styleUrls: ['./create-attendee.style.scss'],
    providers: [AttendeeService]
  }
)
export class CreateAttendeeComponent {
  @Input() title: string;
  @Output() onCancel = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<Attendee>();
  model = new Attendee();
  errors: CreateAttendeeErrors = {};

  constructor(private attendeeService: AttendeeService) {
  }

  createUser() {
    this.attendeeService.createAttendee(this.model)
      .then(
        (response) => {
          if (response.ok) {
            let attendee = response.json();
            this.errors = {};
            this.onSave.emit(attendee);
          }
        }
      )
      .catch(
        (response) => {
          let error = response.json();
          console.error('Error during attendee creation', error);
          this.errors = error;
        }
      );
  }

}
