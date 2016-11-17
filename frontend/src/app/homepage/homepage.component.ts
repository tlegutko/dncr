import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/_commons/auth';

@Component(
  {
    selector: 'homepage',
    styleUrls: ['./homepage.component.scss'],
    templateUrl: './homepage.component.html'
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
  }
}
