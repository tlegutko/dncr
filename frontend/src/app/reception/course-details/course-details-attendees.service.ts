import { Injectable } from '@angular/core';
import { Attendee } from '../../create-attendee/attendee';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetCourseAttendeesService {
  private attendeesUrl = 'api/attendees';

  constructor(private http: AuthHttp) {
  }

  getAttendees(): Observable<Attendee[]> { // TODO: make it dependant on a given course
    return this.http.get(this.attendeesUrl)
      .map(this.extractData);
      // .catch(this.handleError);
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
