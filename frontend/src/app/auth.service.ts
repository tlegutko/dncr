import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LoginModel } from './login/login.model';

@Injectable()
export class AuthService {
  LOGGED_IN_KEY = 'logged-in';

  private loggedIn = false;
  private storage: Storage;

  constructor(private router: Router) {
    this.storage = localStorage;
    this.loggedIn = this.getFromStorage();
  }

  login(model: LoginModel) {
    if (model.login === 'admin' && model.password === 'admin1') {
      this.loggedIn = true;
      this.storage.setItem(this.LOGGED_IN_KEY, 'true');
      this.router.navigate(['reception']);
      return;
    }

    throw new Error('Nieprawidłowy login lub hasło.');
  }

  logout() {
    this.loggedIn = false;
    this.storage.removeItem(this.LOGGED_IN_KEY);
    this.router.navigate(['login']);
  }

  check() {
    return Observable.of(this.loggedIn);
  }

  private getFromStorage(): boolean {
    return this.storage.getItem(this.LOGGED_IN_KEY) === 'true';
  }
}
