import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CreateAttendeeService } from './create-attendee.service';
import { Attendee } from './attendee';

interface CreateAttendeeErrors {
  name?: string[];
  surname?: string[];
  email?: string[];
  phoneNumber?: string[];
}

@Component(
  {
    selector: 'create-attendee',
    templateUrl: './create-attendee.template.html',
    styleUrls: ['./create-attendee.style.scss'],
    providers: [CreateAttendeeService]
  }
)
export class CreateAttendeeComponent {
  @Input() title: string;
  @Output() onCancel = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<Attendee>();
  model = new Attendee();
  errors: CreateAttendeeErrors = {};

  constructor(private createAttendeeService: CreateAttendeeService) {
  }

  createUser() {
    this.createAttendeeService.createAttendee(this.model)
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
