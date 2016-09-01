import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login';
import { AuthService } from '../auth.service';

@Component(
  {
    selector: 'homepage',
    directives: [LoginComponent],
    styleUrls: ['./homepage.style.scss'],
    templateUrl: './homepage.template.html'
  }
)
export class Homepage {
  isLoginVisible = false;

  constructor(private service: AuthService, private router: Router) {
  }

  showLoginForm() {
    this.isLoginVisible = true;
  }

  ngOnInit() {
    this.isLoginVisible = this.service.isKnownUser();
    this.service.check().subscribe(
      (result) => {
        if (result) {
          this.router.navigate(['reception']);
        }
      }
    );
  }
}