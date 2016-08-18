import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
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
export class Login {
  model = new LoginModel();
  error = '';

  constructor(private service: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.service.check().map(
      (result) => {
        if (result) {
          this.router.navigate(['reception']);
        }
      }
    );
  }

  onSubmit() {
    try {
      this.service.login(this.model);
    } catch (e) {
      this.error = e.message;
    }
  }
}
