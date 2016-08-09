import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LoginModel } from './login/login.model';
import { InvalidLoginException } from './login/invalidLogin.exception';

@Injectable()
export class AuthService {
  loggedIn = false;

  constructor(private router: Router){}

  login(model: LoginModel) {
    if (model.login == 'admin' && model.password == 'admin1') {
      this.loggedIn = true;
      this.router.navigate(['reception']);
      return;
    }

    throw new InvalidLoginException();
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['login']);
  }

  check() {
    return Observable.of(this.loggedIn);
  }
}
