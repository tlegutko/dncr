import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import 'rxjs/add/operator/catch';
import { Course } from './course.model';
import { Attendee } from 'app/attendee';
import { CalendarItem } from 'app/_commons/calendar';

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

  public courseToCalendarItems(course: Course): CalendarItem[] {
    let events: CalendarItem[] = [];
    course.times.forEach(
      (time) => time.events.forEach(
        (event) => {
          let start = moment(event.date + ' ' + time.startTime, 'YYYY-MM-DD HH:mm:ss');
          let end = moment(event.date + ' ' + time.endTime, 'YYYY-MM-DD HH:mm:ss');
          events.push(
            {
              id: course.id,
              title: course.name,
              start: start,
              end: end
            }
          );
        }
      )
    );

    return events;
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
