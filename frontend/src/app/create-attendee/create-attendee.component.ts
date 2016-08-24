import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CreateAttendeeService } from './create-attendee.service';
import { Attendee } from './attendee';

@Component({
  selector: 'create-attendee-form',
  templateUrl: './create-attendee.component.html',
  styleUrls: ['./create-attendee.component.scss'],
  providers: [CreateAttendeeService]
})
export class CreateAttendeeComponent {
  @Input() title: string;
  @Output() onCancelAction = new EventEmitter<boolean>();
  model = new Attendee();
  error = ''; // TODO remove

  emitCancelEvent() {
    this.onCancelAction.emit(false);
  }

  constructor(private createAttendeeService: CreateAttendeeService) {}

  createUser() {
    this.createAttendeeService.createAttendee(this.model)
      .then(() => this.error = '')
      .catch(error => this.error = error); // TODO [tlegutko] Improve error msg on err 500.
  }

}
