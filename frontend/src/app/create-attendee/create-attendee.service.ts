import { Injectable } from '@angular/core';
import { Attendee } from './attendee';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { Response } from '@angular/http';

@Injectable()
export class CreateAttendeeService {
  private createUserUrl = 'api/attendees';

  constructor(private http: AuthHttp) {
  }

  createAttendee(attendee: Attendee): Promise<Response> {
    return this.http
      .post(this.createUserUrl, attendee)
      .toPromise();
  }
}
