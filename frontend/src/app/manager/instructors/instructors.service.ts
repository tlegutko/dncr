import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Instructor } from './instructors.model';
import { Observable } from 'rxjs';
import { AuthHttp } from 'app/_commons/auth';

@Injectable()
export class InstructorsService {
  private resource = 'api/instructors';

  constructor(private http: AuthHttp) {
  }

  list(): Observable<Instructor[]> {
    return this.http
      .get(this.resource)
      .map((response: Response) => response.json())
      .catch(() => Observable.throw('Błąd pobierania instruktorów.'));
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
