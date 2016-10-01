import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Location } from './locations.model';

@Injectable()
export class LocationsService {
  constructor(private http: AuthHttp) {
  }

  public list(): Observable<Location[]> {
    let url = 'api/locations';
    return this.http.get(url)
      .map((response) => response.json())
      .catch((response) => Observable.throw('Błąd pobierania sal.'));
  }
}
