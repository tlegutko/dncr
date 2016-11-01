import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { AttendeeService } from './attendee.service';
import { Attendee } from './attendee';

@Injectable()
export class AttendeeResolve implements Resolve<Attendee> {
  constructor(private router: Router, private service: AttendeeService) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Attendee> {
    let id = +route.params['attendee-id'];
    // TODO: Would be nice to get a notification that something went wrong.
    return this.service.getAttendee(id).toPromise().then(
      attendee => attendee, () => this.router.navigate(route.parent.url)
    );
  }
}
