import { Component, Input } from '@angular/core';
import { Attendee } from 'app/attendee';
import { Router, ActivatedRoute } from '@angular/router';

@Component(
  {
    selector: 'attendee-row',
    templateUrl: './attendee-row.template.html',
    styleUrls: ['./attendee-row.style.scss'],
  }
)
export class AttendeeRowComponent {
  @Input() attendee: Attendee;
  @Input() checkable: boolean;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  public open_attendee_details() {
    this.router.navigate(['./attendee-details/', this.attendee.id], { relativeTo: this.route });
  }
}

