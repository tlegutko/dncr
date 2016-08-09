import { Injectable } from '@angular/core';
import { User } from './user';
import { Http, Headers } from '@angular/http';

@Injectable()
export class CreateUserService {

  private createUserUrl = 'api/users';

  constructor(private http: Http) {}

  createUser(user: User) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.createUserUrl, user, headers)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
