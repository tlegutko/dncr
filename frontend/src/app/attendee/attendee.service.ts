import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Attendee } from './attendee';
import { Course } from 'app/course';
import { AuthHttp } from 'app/_commons/auth';

@Injectable()
export class AttendeeService {
  private attendeesUrl = 'api/attendees';

  constructor(private http: AuthHttp) {
  }

  getAttendees(course: Course): Observable<Attendee[]> {
    let url = `api/courses/${course.id}/attendees`;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(() => Observable.throw('Błąd pobierania kursantów'));
  }

  getAttendee(id: number): Observable<Attendee> {
    let url = `${this.attendeesUrl}/${id}`;
    return this.http.get(url)
      .map((response) => response.json())
      .catch(() => Observable.throw('Błąd pobierania kursanta'));
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
