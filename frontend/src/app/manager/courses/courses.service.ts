import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { Course } from './course.model';
import { Attendee } from 'app/attendee';
import 'rxjs/add/operator/catch';

@Injectable()
export class CoursesService {
  constructor(private http: AuthHttp) {
  }

  public list(): Observable<Course[]> {
    let url = 'api/courses';
    return this.http.get(url)
      .map((response) => response.json())
      .catch((response) => Observable.throw('Błąd pobierania kursów.'))
    ;
  }

  public get(id: number): Observable<Course> {
    let url = 'api/courses/' + id;
    return this.http.get(url)
      .map((response) => response.json())
      .catch((response) => Observable.throw('Błąd pobierania kursu.'));
  }

  public getAttendees(courseId: number): Observable<Attendee[]> {
    let url = 'api/courses/' + courseId + '/attendees';
    return this.http.get(url)
      .map((response) => response.json())
      .catch((response) => Observable.throw('Błąd pobierania kursantów.'));
  }
}
