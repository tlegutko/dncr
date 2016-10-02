import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';
import 'rxjs/add/operator/catch';
import { Course, CreateCourseRequest } from './course.model';
import { Attendee } from 'app/attendee';
import { CalendarItem } from 'app/_commons/calendar';

@Injectable()
export class CoursesService {

  courseUpdatesSource = new Subject<CalendarItem[]>();
  courseUpdates = this.courseUpdatesSource.asObservable();

  constructor(private http: AuthHttp) {
  }

  public list(): Observable<Course[]> {
    let url = 'api/courses';
    return this.http.get(url)
      .map((response) => response.json())
      .catch((response) => Observable.throw('Błąd pobierania kursów.'));
  }

  public calendarEvents(): Observable<CalendarItem[]> {
    let url = 'api/courses';
    return this.http.get(url)
      .map((response) => this.mapCoursesToEvents(response.json()))
      .catch((response) => Observable.throw('Błąd pobierania wydarzeń.'));
  }

  public broadcastNewCourse(course: Course) {
    this.courseUpdatesSource.next(this.courseToCalendarItems(course));
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

  public create(createCourseRequest: CreateCourseRequest): Observable<Course> {
    let url = `api/courses`;
    return this.http.post(url, createCourseRequest)
      .map((response) => response.json())
      .catch(
        (response) => {
          if (response.status === 500) {
            return Observable.throw('Błąd serwera');
          } else {
            return Observable.throw(response.json());
          }
        }
      );
  }

  private mapCoursesToEvents(courses: Course[]): CalendarItem[] {
    let events: CalendarItem[] = [];
    courses.forEach((course) => events = events.concat(this.courseToCalendarItems(course)));

    return events;
  }

  private courseToCalendarItems(course: Course): CalendarItem[] {
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
}
