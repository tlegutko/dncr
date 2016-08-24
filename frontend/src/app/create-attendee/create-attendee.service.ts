import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Attendee } from './attendee';
import { Observable } from 'rxjs/Rx'; // [tlegutko] Intellij says unused import, but .toPromise() needs it to work

@Injectable()
export class CreateAttendeeService {

  private createUserUrl = 'api/attendees';

  constructor(private http: Http) {
  }

  createAttendee(attendee: Attendee) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.createUserUrl, attendee, headers)
      .toPromise()
      .catch(
        (error) => {
          console.error('Error during attendee creation', error);
          return Promise.reject(error.json().message);
        }
      );
  }
}
