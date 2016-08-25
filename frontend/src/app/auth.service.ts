import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LoginModel } from './homepage/login';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class AuthService {
  public LOGGED_IN_KEY = 'logged-in';
  public KNOWN_USER = 'known_user';

  private loggedIn = false;
  private storage: Storage;

  constructor(private router: Router, private cookies: CookieService) {
    this.storage = localStorage;
    this.loggedIn = this.getFromStorage();
  }

  public login(model: LoginModel) {
    if (model.login === 'admin' && model.password === 'admin1') {
      this.loggedIn = true;
      this.storage.setItem(this.LOGGED_IN_KEY, 'true');
      this.cookies.put(this.KNOWN_USER, 'true');
      this.router.navigate(['reception']);
      return;
    }

    throw new Error('Nieprawidłowy login lub hasło.');
  }

  public logout() {
    this.loggedIn = false;
    this.storage.removeItem(this.LOGGED_IN_KEY);
    this.router.navigate(['/']);
  }

  public check() {
    return Observable.of(this.loggedIn);
  }

  public isKnownUser(): boolean {
    return this.cookies.get(this.KNOWN_USER) === 'true';
  }

  private getFromStorage(): boolean {
    return this.storage.getItem(this.LOGGED_IN_KEY) === 'true';
  }
}
