import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Response } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import 'rxjs/add/operator/do';
import { LoginModel } from 'app/homepage/login';
import { AuthHttp } from './http';

@Injectable()
export class AuthService {
  private static TOKEN = 'id_token';
  private static KNOWN_USER = 'known_user';
  private static refreshTimeoutId: any;

  constructor(private cookies: CookieService, private http: AuthHttp) {
    this.scheduleTokenRefreshing();
  }

  public static clear() {
    clearTimeout(AuthService.refreshTimeoutId);
    localStorage.removeItem(AuthService.TOKEN);
  }

  public login(model: LoginModel): Observable<Response> {
    return this.http.post('/api/authorize', model)
      .do((response) => this.saveToken(response));
  }

  public logout(): Observable<Response> {
    return this.http.post('/api/logout', {})
      .do(() => AuthService.clear());
  }

  public static isLoggedIn(): boolean {
    try {
      return tokenNotExpired();
    } catch (e) {
      return false;
    }
  }

  public isKnownUser(): boolean {
    return this.cookies.get(AuthService.KNOWN_USER) === 'true';
  }

  private saveToken(response: Response) {
    localStorage.setItem(AuthService.TOKEN, response.json().token);
    this.cookies.put(AuthService.KNOWN_USER, 'true');
    this.scheduleTokenRefreshing();
  }

  private scheduleTokenRefreshing() {
    if (!AuthService.isLoggedIn()) {
      AuthService.clear();
      return;
    }

    let token = localStorage.getItem(AuthService.TOKEN);
    let timeout = AuthService.getTokenTimeout(token);

    AuthService.refreshTimeoutId = setTimeout(
      () => this.http.post('/api/refresh-token', {}).subscribe((response) => this.saveToken(response)), timeout
    );
  }

  private static getTokenTimeout(token: string): number {
    let expiry = moment(new JwtHelper().getTokenExpirationDate(token));
    let now = moment();
    // Subtract 1 minute to be sure token is still valid
    return moment.duration(expiry.diff(now)).subtract(1, 'minute').asMilliseconds();
  }
}
