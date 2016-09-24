import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): Observable<boolean> {
    let check = this.authService.check();
    check.subscribe(
      (result) => {
        if (!result) {
          // TODO: Add "login required" message ;)
          this.router.navigate(['/']);
        }
      }
    );

    return check;
  }
}