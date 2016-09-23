import { Component } from '@angular/core';
import { AuthService } from 'app/_commons/auth';

/*
 * App Component
 * Top Level Component
 */
@Component(
  {
    selector: 'app',
    styleUrls: ['./app.style.scss'],
    templateUrl: 'app.template.html'
  }
)
export class App {
  constructor(private authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }

  isLoggedIn() {
    return this.authService.check();
  }
}
