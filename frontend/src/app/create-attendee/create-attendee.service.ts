import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Attendee } from './attendee';
import { Observable } from 'rxjs/Rx'; // [tlegutko] Intellij says unused import, but .toPromise() needs it to work

@Injectable()
export class CreateAttendeeService {

  private createUserUrl = 'api/attendees';

  constructor(private http: Http) {
  }

  createAttendee(attendee: Attendee) {
    let headers = new Headers(
      {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      }
    );
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(this.createUserUrl, attendee, options)
      .toPromise()
      .catch(
        (error) => {
          console.error('Error during attendee creation', error);
          return Promise.reject(JSON.parse(error._body));
        }
      );
  }
}
