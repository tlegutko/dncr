import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Instructor } from './instructor';
import { AuthHttp } from 'angular2-jwt';

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
