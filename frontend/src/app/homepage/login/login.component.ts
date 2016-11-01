import { Component } from '@angular/core';
import { NgForm } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'app/_commons/auth';
import { LoginModel } from './login.model';

@Component(
  {
    selector: 'login',
    providers: [NgForm],
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
  }
)
export class LoginComponent {
  model = new LoginModel();
  error = '';
  isKnownUser = false;

  constructor(private router: Router, private service: AuthService) {
  }

  ngOnInit() {
    this.isKnownUser = this.service.isKnownUser();
  }

  onSubmit() {
    this.service.login(this.model)
      .subscribe(
        () => {
          this.router.navigate(['/reception']);
        }, (body) => {
          let response = body.json();
          if (response.hasOwnProperty('error')) {
            this.error = response.error;
          } else {
            this.error = 'Nieoczekiwany błąd serwera.';
          }
        }
      );
  }
}
