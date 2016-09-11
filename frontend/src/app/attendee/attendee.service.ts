import { Injectable }     from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Attendee } from './attendee';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AttendeeService {
  private attendeesUrl = 'api/attendee';

  constructor (private http: AuthHttp) {}

  getAttendees(): Observable<Attendee[]> {
    return this.http.get(this.attendeesUrl)
      .map(this.extractData);
    // .catch(this.handleError);
  }

  createAttendee(attendee: Attendee): Promise<Response> {
    return this.http
      .post(this.attendeesUrl, attendee)
      .toPromise();
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) { // TODO: proper error handling
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
