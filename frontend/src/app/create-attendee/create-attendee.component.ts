import { Component } from '@angular/core';
import { CreateAttendeeService } from './create-attendee.service';
import { Attendee } from './attendee';

@Component({
  selector: 'create-attendee',
  templateUrl: 'create-attendee.component.html',
  providers: [
    CreateAttendeeService
  ]
})

export class CreateAttendee {
  model = new Attendee();

  constructor(private createAttendeeService: CreateAttendeeService) {}

  createUser() {
    this.createAttendeeService.createAttendee(this.model)
      .then((response) => console.log(response));
  }
}
