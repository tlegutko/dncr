import { Component } from '@angular/core';
import { InstructorsService } from './instructors.service';
import { Instructor } from './instructor';

@Component(
  {
    selector: 'manager-instructors',
    templateUrl: './instructors.component.html',
    styleUrls: ['./instructors.component.scss'],
    providers: [InstructorsService]
  }
)
export class ManagerInstructorsComponent {
  instructors: Instructor[] = [];

  constructor(private instructorsService: InstructorsService) {
    this.instructorsService.getList()
      .then(instructors => this.instructors = instructors);
  }

  public remove(instructor: Instructor) {
    if (confirm('Czy na pewno usunąć instruktora?')) {
      this.instructorsService.remove(instructor)
        .then(response => this.instructors.splice(this.instructors.indexOf(instructor), 1));
    }
  }

  public add(instructor: Instructor) {
    this.instructors.push(instructor);
  }
}
