import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Mail } from './mail.model';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class MailService {

  constructor(private http: AuthHttp) {
  }

  public send(mail: Mail) {
    let url = 'api/mail';
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
