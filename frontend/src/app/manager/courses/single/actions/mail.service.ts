import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Mail } from './mail.model';
import { AuthHttp } from 'app/_commons/auth';
import { Course } from 'app/course/course.model';

@Injectable()
export class MailService {

  constructor(private http: AuthHttp) {
  }

  public sendMessageForCourse(course: Course, mail: Mail) {
    let url = `api/courses/${course.id}/send-message`;
    return this.http.post(url, mail)
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

}
