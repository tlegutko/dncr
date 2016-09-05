import { Component } from '@angular/core';
import { InstructorsService } from './instructors.service';
import { Instructor } from './instructor';
import splice = require('core-js/fn/array/splice');

@Component(
  {
    selector: 'manager-instructors',
    templateUrl: './instructors.template.html',
    styleUrls: ['./instructors.style.scss'],
    providers: [InstructorsService],
  }
)
export class ManagerInstructorsComponent {
  instructors: Instructor[] = [];

  constructor(private instructorsService: InstructorsService) {
    this.instructorsService.getList()
      .then(instructors => this.instructors = instructors);
  }

  public remove(instructor: Instructor) {
    this.instructorsService.remove(instructor)
      .then(response => this.instructors.splice(this.instructors.indexOf(instructor), 1));
  }
}
