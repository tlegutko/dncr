import { Component } from '@angular/core';
import { CreateAttendeeService } from './create-attendee.service';
import { Attendee } from './attendee';

@Component({
  selector: 'create-attendee',
  templateUrl: './create-attendee.component.html',
  styleUrls: ['./create-attendee.component.scss'],
  providers: [CreateAttendeeService]
})
export class CreateAttendee {
  model = new Attendee();
  title = 'Salsa (początkujący)'; // to be injected in the future
  showCreateAttendeeForm = false;
  error = '';

  constructor(private createAttendeeService: CreateAttendeeService) {}

  createUser() {
    this.createAttendeeService.createAttendee(this.model)
      .then(() => this.error = '')
      .catch(error => this.error = error);
  }

  // noinspection JSMethodCanBeStatic
  setEmailValidationMessage(emailInput: any) { // [tlegutko] without this method message would be displayed in english
    if (emailInput.validity.typeMismatch){
      emailInput.setCustomValidity('Niepoprawny adres email');
    } else {
      emailInput.setCustomValidity('');
    }
  }

  showCreateAttendeeComponent() {
    this.showCreateAttendeeForm = true;
  }

  hideCreateAttendeeComponent() {
    this.showCreateAttendeeForm = false;
  }
}
