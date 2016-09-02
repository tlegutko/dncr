import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Instructor } from './instructor';

@Injectable()
export class InstructorsService {
  private resource = 'api/instructors';

  constructor(private http: Http) {
  }

  listInstructors(): Promise<Instructor[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .get(this.resource, headers)
      .map((response: Response) => response.json())
      .toPromise()
      .catch(this.handleError);
  }

  deleteInstructor(instructor: Instructor) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .delete(this.resource + '/' + instructor.id, headers)
      .map((response: Response) => response.json())
      .toPromise()
      .catch(this.handleError);
  }

  createInstructor(instructor: Instructor) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .put(this.resource, instructor, headers)
      .map((response: Response) => response.json())
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('Error during listing instructors', error);
    return Promise.reject(error.json().message);
  }
}
