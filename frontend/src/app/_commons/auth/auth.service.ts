import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Response } from '@angular/http';
import { tokenNotExpired, AuthHttp, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import 'rxjs/add/observable/of';
import { LoginModel } from 'app/homepage/login';

@Injectable()
export class AuthService {
  public KNOWN_USER = 'known_user';
  private TOKEN = 'id_token';

  private loggedIn = false;
  private storage: Storage;
  private refreshTimeout: any;

  constructor(private cookies: CookieService, private http: AuthHttp) {
    this.storage = localStorage;
    this.loggedIn = tokenNotExpired();
    this.scheduleTokenRefreshing();
  }

  public login(model: LoginModel): Observable<Response> {
    let request = this.http.post('/api/authorize', model);
    request.subscribe((response) => this.saveToken(response));

    return request;
  }

  public logout(): Observable<Response> {
    let request = this.http.post('/api/logout', {});
    request.subscribe(() => this.clear());

    return request;
  }

  public clear() {
    clearTimeout(this.refreshTimeout);
    this.loggedIn = false;
    this.storage.removeItem(this.TOKEN);
  }

  public check() {
    return Observable.of(this.loggedIn);
  }

  public isKnownUser(): boolean {
    return this.cookies.get(this.KNOWN_USER) === 'true';
  }

  private saveToken(response: Response) {
    this.storage.setItem(this.TOKEN, response.json().token);
    this.loggedIn = tokenNotExpired();
    this.cookies.put(this.KNOWN_USER, 'true');
    this.scheduleTokenRefreshing();
  }

  private scheduleTokenRefreshing() {
    if (!this.loggedIn) {
      return;
    }

    let helper = new JwtHelper();
    let token = this.storage.getItem(this.TOKEN);
    let expiry = helper.decodeToken(token).exp * 1000;
    let now = moment().valueOf();
    let timeout = expiry - now - 60000; // Subtract 1 minute to be sure token is still valid

    this.refreshTimeout = setTimeout(
      () => this.http.post('/api/refresh-token', {}).subscribe((response) => this.saveToken(response)), timeout
    );
  }
}
