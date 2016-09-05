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
  model = new Attendee();
  errors: CreateAttendeeErrors = {};

  constructor(private createAttendeeService: CreateAttendeeService) {
  }

  createUser() {
    this.createAttendeeService.createAttendee(this.model)
      .then(
        (response) => {
          delete this['errors'];
          console.log(response);
          // TODO: new attendee should be added to the list when it's implemented
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
