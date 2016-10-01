import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Instructor } from './instructor';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';

@Injectable()
export class InstructorsService {
  private resource = 'api/instructors';

  constructor(private http: AuthHttp) {
  }

  getList(): Promise<Instructor[]> {
    return this.http
      .get(this.resource)
      .map((response: Response) => response.json())
      .toPromise();
  }

  list(): Observable<Instructor[]> { // TODO merge with above once consulted with Szymon
    return this.http
      .get(this.resource)
      .map((response: Response) => response.json())
      .catch((response) => Observable.throw('Błąd pobierania instruktorów.'));
  }

  remove(instructor: Instructor): Promise<Response> {
    return this.http
      .delete(this.resource + '/' + instructor.id)
      .toPromise();
  }

  create(instructor: Instructor): Promise<Instructor> {
    return this.http
      .post(this.resource, instructor)
      .map((response: Response) => response.json())
      .toPromise();
  }
}
