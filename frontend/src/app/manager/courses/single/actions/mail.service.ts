import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { PlaintextMailRequest } from 'app/Http/Requests';
import 'rxjs/add/operator/catch';

@Injectable()
export class MailService {

  constructor(private http: AuthHttp) {
  }

  public send(plaintextMailRequest: PlaintextMailRequest) {
    let url = `api/send`;
    return this.http.post(url, plaintextMailRequest)
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
