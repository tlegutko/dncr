import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Attendee } from './attendee';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class AttendeeService {
  private attendeesUrl = 'api/attendees';

  constructor (private http: AuthHttp) {}

  getAttendees(): Observable<Attendee[]> {
    return this.http.get(this.attendeesUrl)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  create(attendee: Attendee): Observable<Attendee> {
    return this.http
      .post(this.attendeesUrl, attendee)
      .map((response) => response.json())
      .catch(
        (response) => {
          if (response.ok) {
            return Observable.throw('Błąd serwera');
          }
          return Observable.throw(response.json());
        }
      );
  }

  private handleError (error: any) { // TODO: proper error handling
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Błąd serwera';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
