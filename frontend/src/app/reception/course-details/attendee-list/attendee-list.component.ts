import { Component, OnInit } from '@angular/core';
import { Attendee }              from '../../../attendee/attendee';
import { AttendeeService }       from './attendee-list.service';

@Component({
             selector: 'attendee-list',
             templateUrl: 'attendee-list.template.html',
             providers: [ AttendeeService ]
           })
export class AttendeeListComponent implements OnInit {
  errorMessage: string;
  attendees: Attendee[];
  mode = 'Observable';

  constructor (private attendeeService: AttendeeService) {}

  ngOnInit() { this.getAttendees(); }

  getAttendees() {
    this.attendeeService.getAttendees()
      .subscribe(
        attendees => this.attendees = attendees,
        error =>  this.errorMessage = <any>error);
  }
}

