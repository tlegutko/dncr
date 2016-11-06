import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from 'app/_commons/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HomepageGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): Observable<boolean> {
    let isLoggedIn = AuthService.isLoggedIn();

    if (isLoggedIn){
      this.router.navigate(['/reception']);
    }

    return Observable.of(!isLoggedIn);
  }
}
