import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { AttendeeService } from '../attendee.service';
import { Attendee } from '../attendee';

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
    styleUrls: ['./create-attendee.style.scss']
  }
)
export class CreateAttendeeComponent implements OnInit {
  @Input() courseId: number;
  @Output() onSave = new EventEmitter<Attendee>();
  model = new Attendee();
  errors: CreateAttendeeErrors = {};

  constructor(private attendeeService: AttendeeService) {
  }

  ngOnInit() {
    this.model.courseId = this.courseId;
  }

  createUser() {
    this.errors = {};
    this.attendeeService.create(this.model)
      .subscribe(
        (attendee) => this.onSave.emit(attendee), (failedResponse) => this.errors = failedResponse
      );
  }

}
