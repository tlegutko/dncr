import { Component, Output, EventEmitter } from '@angular/core';
import splice = require('core-js/fn/array/splice');
import { Instructor } from '../instructors.model';
import { InstructorsService } from '../instructors.service';

interface CreateInstructorErrors {
  name?: string[];
  surname?: string[];
  email?: string[];
  phoneNumber?: string[];
}

@Component(
  {
    selector: 'instructor-create',
    templateUrl: './instructor-create.component.html',
    styleUrls: ['./instructor-create.component.scss'],
  }
)
export class InstructorCreateComponent {
  @Output() onCreated = new EventEmitter<Instructor>();
  model = new Instructor();
  errors: CreateInstructorErrors = {};

  constructor(private instructorsService: InstructorsService) {
  }

  public createInstructor() {
    this.instructorsService.create(this.model)
      .then(
        addedInstructor => {
          this.model = new Instructor();
          this.onCreated.emit(addedInstructor);
        }
      )
      .catch(
        (response) => {
          let error = response.json();
          console.error('Error during instructor creation', error);
          this.errors = error;
        }
      );
  }
}
