import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CreateAttendeeService } from './create-attendee.service';
import { Attendee } from './attendee';

@Component({
             selector: 'create-attendee',
  templateUrl: './create-attendee.template.html',
  styleUrls: ['./create-attendee.style.scss'],
  providers: [CreateAttendeeService]
})
export class CreateAttendeeComponent {
  @Input() title: string;
  @Output() onCancel = new EventEmitter<boolean>();
  model = new Attendee();
  error = '';

  constructor(private createAttendeeService: CreateAttendeeService) {}

  createUser() { // TODO: new attendee should be added to the list when it's implemented
    this.createAttendeeService.createAttendee(this.model)
      .then((r) => {
        this.error = '';
        console.log(r);
      })
      .catch(error => {
        console.log(error);
        this.error = error;
      });
  }

}
