import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Attendee } from './attendee';

@Injectable()
export class CreateAttendeeService {

  private createUserUrl = 'api/attendees';

  constructor(private http: Http) {}

  createAttendee(attendee: Attendee) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(attendee);
    return this.http
      .post(this.createUserUrl, attendee, headers)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('Error during attendee creation', error);
    return Promise.reject(error.json().message);
  }
}
