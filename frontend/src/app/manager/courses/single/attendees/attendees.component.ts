import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, CoursesService } from 'app/manager/courses';
import { Attendee } from 'app/attendee';

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

  constructor(route: ActivatedRoute, service: CoursesService) {
    route.parent.data.forEach(
      (data: { course: Course }) => {
        this.course = data.course;
        service.getAttendees(data.course.id).subscribe((attendees) => this.attendees = attendees);
      }
    );
  }

  public showCreateForm() {
    this.isCreateFormVisible = true;
  }

  public hideCreateForm() {
    this.isCreateFormVisible = false;
  }
}
