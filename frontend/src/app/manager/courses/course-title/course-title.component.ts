import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Course } from 'app/course';

@Component(
  {
    selector: 'course-title',
    templateUrl: './course-title.component.html',
    styleUrls: ['./course-title.component.scss'],
  }
)
export class CourseTitleComponent implements OnInit {
  @Input() model: Course;
  @Input() editable: boolean;
  @Input() errors: string[];

  @Output() save = new EventEmitter<(result: boolean) => void>();
  @Output() close = new EventEmitter<boolean>();

  private isEditing: boolean = false;
  private isNew: boolean = false;
  private storedValue: string;

  ngOnInit() {
    this.storedValue = this.model.name;
    this.isNew = this.model.id === undefined;
    this.isEditing = this.editable && this.isNew;
  }

  public cancel() {
    if (!this.isNew) {
      this.model.name = this.storedValue;
    }

    if (!this.isEditing || this.isNew) {
      this.close.emit(true);
    }

    this.isEditing = false;
  }

  public edit() {
    this.isEditing = true;
  }

  public submit() {
    this.save.emit((result: boolean) => {
      if (result) {
        this.isEditing = false;
        this.isNew = false;
        this.storedValue = this.model.name;
      }
    });
  }
}
