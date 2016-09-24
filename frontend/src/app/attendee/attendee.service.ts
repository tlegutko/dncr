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

  createAttendee(attendee: Attendee): Promise<Response> {
    return this.http
      .post(this.attendeesUrl, attendee)
      .toPromise();
  }

  private handleError (error: any) { // TODO: proper error handling
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Błąd serwera';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
