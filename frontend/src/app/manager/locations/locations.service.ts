import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { CourseLocation } from './locations.model';
import { AuthHttp } from 'app/_commons/auth';

@Injectable()
export class LocationsService {
  constructor(private http: AuthHttp) {
  }

  public list(): Observable<CourseLocation[]> {
    let url = 'api/locations';
    return this.http.get(url)
      .map((response) => response.json())
      .catch(() => Observable.throw('Błąd pobierania sal.'));
  }
}
