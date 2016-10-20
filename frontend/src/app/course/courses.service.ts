import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import * as moment from 'moment';
import { Moment } from 'moment';
import 'rxjs/add/operator/catch';
import { Course, CreateCourseRequest, CreateCourseTime } from './course.model';
import { Attendee } from 'app/attendee';
import { CalendarItem } from 'app/_commons/calendar';

@Injectable()
export class CoursesService {
  /* tslint:disable */ // necessary for private member to appear before public one
  private courseCreatedSource = new Subject<Course>();
  private recentlyClickedTimeSource = new ReplaySubject<CreateCourseTime>(1);

  courseCreated = this.courseCreatedSource.asObservable();
  calendarItemsCreated = this.courseCreated.map(this.courseToCalendarItems);
  recentlyClickedTime = this.recentlyClickedTimeSource.asObservable();
  /* tslint:enable */

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

  public broadcastCalendarDateClick(clickedTime: Moment) {
    this.recentlyClickedTimeSource.next(new CreateCourseTime(clickedTime));
  }

  public get(id: number): Observable<Course> {
    let url = `api/courses/${id}`;
    return this.http.get(url)
      .map((response) => response.json())
      .catch((response) => Observable.throw('Błąd pobierania kursu.'));
  }

  public getAttendees(courseId: number): Observable<Attendee[]> {
    let url = `api/courses/${courseId}/attendees`;
    return this.http.get(url)
      .map((response) => response.json())
      .catch((response) => Observable.throw('Błąd pobierania kursantów.'));
  }

  public create(createCourseRequest: CreateCourseRequest): Observable<Course> {
    let url = `api/courses`;
    return this.http.post(url, createCourseRequest)
      .map((response) => response.json())
      .do((course) => this.courseCreatedSource.next(course))
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