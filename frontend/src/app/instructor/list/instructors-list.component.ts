import { Component } from '@angular/core';
import { InstructorsService } from '../instructors.service';
import { Instructor } from '../instructor';
import splice = require('core-js/fn/array/splice');

@Component(
  {
    selector: 'instructors-list',
    templateUrl: './instructors-list.template.html',
    providers: [InstructorsService],
  }
)
export class InstructorsListComponent {
  allInstructors: Instructor[] = [];
  error = '';

  constructor(private instructorsService: InstructorsService) {
    this.instructorsService.listInstructors()
      .then(instructors => this.allInstructors = instructors)
      .catch(error => this.error = error);
  }

  public deleteInstructor(instructor: Instructor) {
    this.instructorsService.deleteInstructor(instructor)
      .then(response => this.allInstructors.splice(this.allInstructors.indexOf(instructor), 1))
      .catch(error => this.error = error);
  }
}
