import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Attendee } from './attendee';
import { Course } from 'app/course';

@Injectable()
export class AttendeeService {
  private attendeesUrl = 'api/attendees';

  constructor(private http: AuthHttp) {
  }

  getAttendees(course: Course): Observable<Attendee[]> {
    let url = `api/courses/${course.id}/attendees`;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(
        () => {
          return Observable.throw('Błąd pobierania kursantów.');
        }
      );
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
}
