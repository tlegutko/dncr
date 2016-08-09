import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './auth.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.style.scss' ],
  templateUrl: 'app.template.html'
})
export class App {
  constructor(private _auth: AuthService) {}

  logout(){
    this._auth.logout();
  }

  isLoggedIn(){
    return this._auth.check();
  }
}
