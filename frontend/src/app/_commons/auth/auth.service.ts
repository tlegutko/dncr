import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import 'rxjs/add/operator/do';
import { LoginModel } from 'app/homepage/login';
import { AuthHttp } from './http';

@Injectable()
export class AuthService {
  private static TOKEN = 'id_token';
  private static refreshTimeout: any;
  public KNOWN_USER = 'known_user';

  public static clear() {
    clearTimeout(AuthService.refreshTimeout);
    localStorage.removeItem(AuthService.TOKEN);
  }

  constructor(private cookies: CookieService, private http: AuthHttp, private router: Router) {
    this.scheduleTokenRefreshing();
  }

  public login(model: LoginModel): Observable<Response> {
    return this.http.post('/api/authorize', model)
      .do((response) => this.saveToken(response));
  }

  public logout(): Observable<Response> {
    return this.http.post('/api/logout', {})
      .do(() => AuthService.clear());
  }

  public isLoggedIn(): boolean {
    try {
      if (!tokenNotExpired()){
        if (this.router.url !== '/') {
          this.router.navigate(['/']);
        }
        return false;
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  public isKnownUser(): boolean {
    return this.cookies.get(this.KNOWN_USER) === 'true';
  }

  private saveToken(response: Response) {
    localStorage.setItem(AuthService.TOKEN, response.json().token);
    this.cookies.put(this.KNOWN_USER, 'true');
    this.scheduleTokenRefreshing();
  }

  private scheduleTokenRefreshing() {
    if (!this.isLoggedIn()) {
      AuthService.clear();
      return;
    }

    let helper = new JwtHelper();
    let token = localStorage.getItem(AuthService.TOKEN);
    let expiry = helper.decodeToken(token).exp * 1000;
    let now = moment().valueOf();
    let timeout = expiry - now - 60000; // Subtract 1 minute to be sure token is still valid

    AuthService.refreshTimeout = setTimeout(
      () => this.http.post('/api/refresh-token', {}).subscribe((response) => this.saveToken(response)), timeout
    );
  }
}
