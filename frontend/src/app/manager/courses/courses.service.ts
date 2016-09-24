import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { Course } from './course.model';
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
}
