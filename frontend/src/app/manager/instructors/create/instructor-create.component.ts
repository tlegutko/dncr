import { Component, Output, EventEmitter } from '@angular/core';
import { Instructor, InstructorsService } from 'app/manager/instructors';
import splice = require('core-js/fn/array/splice');

interface CreateInstructorErrors {
  name?: string[];
  surname?: string[];
  email?: string[];
  phoneNumber?: string[];
}

@Component(
  {
    selector: 'instructor-create',
    templateUrl: './instructor-create.template.html',
    styleUrls: ['./instructor-create.style.scss'],
    providers: [InstructorsService]
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
          console.error('Error during attendee creation', error);
          this.errors = error;
        }
      );
  }
}
