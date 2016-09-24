import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LoginModel } from 'app/homepage/login';
import { CookieService } from 'angular2-cookie/core';
import { Response } from '@angular/http';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  public KNOWN_USER = 'known_user';
  private TOKEN = 'id_token';

  private loggedIn = false;
  private storage: Storage;

  constructor(private router: Router, private cookies: CookieService, private http: AuthHttp) {
    this.storage = localStorage;
    this.loggedIn = tokenNotExpired();
  }

  public login(model: LoginModel): Promise<Response> {
    let request = this.http.post('/api/authorize', model);
    request.subscribe(
      (response) => {
        this.storage.setItem(this.TOKEN, response.json().token);
        this.loggedIn = tokenNotExpired();
        this.cookies.put(this.KNOWN_USER, 'true');
        this.router.navigate(['/reception']);
      }, (error) => error
    );

    return request.toPromise();
  }

  public logout() {
    this.http.post('/api/logout', {}).subscribe(
      () => {
        this.loggedIn = false;
        this.storage.removeItem(this.TOKEN);
        this.router.navigate(['/']);
      }
    );
  }

  public check() {
    return Observable.of(this.loggedIn);
  }

  public isKnownUser(): boolean {
    return this.cookies.get(this.KNOWN_USER) === 'true';
  }
}
