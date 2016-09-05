import { Injectable } from '@angular/core';
import { Attendee } from './attendee';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CreateAttendeeService {

  private createUserUrl = 'api/attendees';

  constructor(private http: AuthHttp) {
  }

  createAttendee(attendee: Attendee) {
    return this.http
      .post(this.createUserUrl, attendee)
      .toPromise()
      .catch(
        (error) => {
          console.error('Error during attendee creation', error);
          return error;
        }
      );
  }
}
