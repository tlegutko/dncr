import { Component } from '@angular/core';

@Component(
  {
    selector: 'course-details',
    templateUrl: './course-details.template.html',
    styleUrls: ['./course-details.style.scss']
  }
)
export class CourseDetailsComponent {
  course = {
    title: 'Salsa (początkujący)'
  };
  isCreateFormVisible = false;
  error = '';

  showCreateForm() {
    this.isCreateFormVisible = true;
  }

  hideCreateForm() {
    this.isCreateFormVisible = false;
  }
}
