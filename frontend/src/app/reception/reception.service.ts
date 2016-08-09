import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReceptionService {
  constructor(public http: Http) {}

  getValue(value: number): Promise<any> {
    let url = `/api/values/${value}`;
    return this.http.get(url).toPromise()
      .then(response => response.json());
  }
}
