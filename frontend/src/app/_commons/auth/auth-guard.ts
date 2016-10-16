import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): Observable<boolean> {
    let isLoggedIn = this.authService.isLoggedIn();

    if (!isLoggedIn){
      // TODO: Add "login required" message ;)
      this.router.navigate(['/']);
    }

    return Observable.of(isLoggedIn);
  }
}
