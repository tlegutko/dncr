import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router, private authService: AuthService) {
  }

  public logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  public isLoggedIn() {
    return AuthService.isLoggedIn();
  }
}
