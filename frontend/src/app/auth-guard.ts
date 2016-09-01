import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.check().map(
      (result) => {
        if (result) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      }
    );
  }
}
