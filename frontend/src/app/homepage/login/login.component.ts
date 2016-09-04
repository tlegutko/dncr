import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
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
    try {
      this.service.login(this.model);
    } catch (e) {
      this.error = e.message;
    }
  }
}
