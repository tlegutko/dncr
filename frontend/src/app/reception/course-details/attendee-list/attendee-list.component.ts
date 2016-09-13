import { Component, OnInit } from '@angular/core';
import { Attendee } from '../../../attendee/attendee';
import { AttendeeService } from '../../../attendee/attendee.service';

@Component(
  {
    selector: 'attendee-list',
    templateUrl: './attendee-list.template.html',
    styleUrls: ['./attendee-list.style.scss'],
    providers: [AttendeeService]
  }
)
export class AttendeeListComponent implements OnInit {
  errorMessage: string;
  attendees: Attendee[];
  mode = 'Observable';

  constructor(private attendeeService: AttendeeService) {
  }

  public ngOnInit(): void {
    this.getAttendees();
  }

  getAttendees() {
    this.attendeeService.getAttendees()
      .subscribe(
        (attendees) => this.attendees = attendees, (error: any) => this.errorMessage = error
      );
  }
}

