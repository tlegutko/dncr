import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'app/course';
import { Attendee, AttendeeService } from 'app/attendee';

@Component(
  {
    selector: 'manager-courses-single-attendees',
    styleUrls: ['./attendees.component.scss'],
    templateUrl: './attendees.component.html'
  }
)
export class ManagerCoursesAttendeesComponent {
  public course: Course;
  public attendees: Attendee[];
  public isCreateFormVisible = false;

  constructor(route: ActivatedRoute, service: AttendeeService) {
    route.parent.data.forEach(
      (data: { course: Course }) => {
        this.course = data.course;
        service.getAttendees(data.course).subscribe((attendees) => this.attendees = attendees);
      }
    );
  }

  public showCreateForm() {
    this.isCreateFormVisible = true;
  }

  public hideCreateForm() {
    this.isCreateFormVisible = false;
  }

  public onAttendeeSaved(){
    console.log('attendee save attempt');
  }
}
