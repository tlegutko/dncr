import { Component, OnInit } from '@angular/core';
import { InstructorsService } from './instructors.service';
import { Instructor } from './instructors.model';
import { ActivatedRoute } from '@angular/router';

@Component(
  {
    selector: 'manager-instructors',
    templateUrl: './instructors.component.html',
    styleUrls: ['./instructors.component.scss'],
    providers: [InstructorsService]
  }
)
export class ManagerInstructorsComponent implements OnInit {
  instructors: Instructor[] = [];

  constructor(private route: ActivatedRoute, private instructorsService: InstructorsService) {
  }

  ngOnInit() {
    this.route.data.forEach(
      (data: { instructors: Instructor[]}) => this.instructors = data.instructors
    );
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
