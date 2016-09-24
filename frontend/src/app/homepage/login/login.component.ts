import { Component } from '@angular/core';
import { AuthService } from 'app/_commons/auth';
import { LoginModel } from './login.model';
import { NgForm } from '@angular/common';

@Component(
  {
    selector: 'login',
    providers: [NgForm],
    styleUrls: ['./login.style.scss'],
    templateUrl: './login.template.html'
  }
)
export class LoginComponent {
  model = new LoginModel();
  error = '';
  isKnownUser = false;

  constructor(private service: AuthService) {
  }

  ngOnInit() {
    this.isKnownUser = this.service.isKnownUser();
  }

  onSubmit() {
    this.service.login(this.model).catch(
      (body) => {
        let response = body.json();
        if (response.hasOwnProperty('error')) {
          this.error = response.error;
        } else {
          this.error = 'Nieprawidłowy login lub hasło.';
        }
      }
    );
  }
}
