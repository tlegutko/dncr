import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { Response } from '@angular/http';
import { CreateCourseRequestJson } from './create-course-request';

@Injectable()
export class CreateCourseService {
  private createCourseUrl = 'api/courses';

  constructor(private http: AuthHttp) {
  }

  createCourse(createCourseRequest: CreateCourseRequestJson): Promise<Response> {
    return this.http
      .post(this.createCourseUrl, createCourseRequest)
      .toPromise();
  }
}
