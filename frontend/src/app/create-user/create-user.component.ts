import { Component } from '@angular/core';
import { User } from './user';
import { CreateUserService } from './create-user.service';

// TODO: przeglądnij pliki wrzucane do GITa
// TODO: rename to Attendee
@Component({
  selector: 'create-user',
  templateUrl: 'create-user.component.html',
  providers: [
    CreateUserService
  ]
})

export class CreateUser {
  model: User = new User();

  constructor(private createUserService: CreateUserService) {}

  createUser() {
    this.createUserService.createUser(this.model)
      .then((response) => console.log(response));
  }
}
