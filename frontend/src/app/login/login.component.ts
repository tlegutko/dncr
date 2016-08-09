import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginModel } from './login.model';

@Component({
  selector: 'login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html'
})
export class Login {
  model: LoginModel;
  error: string;

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit() {
    this.service.check().map((result) => {
      if (result) {
        this.router.navigate(['Reception']);
      }
    });
  }

  onSubmit() {
    try {
      this.service.login(this.model);
    } catch (e) {
      this.error = e.message;
    }
  }
}
