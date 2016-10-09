import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CreateCourseRequest, CreateCourseErrors } from '../../../course/course.model';
import { Router, NavigationEnd } from '@angular/router';
@Component(
  {
    selector: 'course-title',
    templateUrl: './course-title.component.html',
    styleUrls: ['./course-title.component.scss'],
  }
)
export class CreateCourseTitleComponent implements OnInit {
  @Input() model: CreateCourseRequest;
  @Input() errors: CreateCourseErrors;
  @Input() isEditing: boolean;

  @Output() save = new EventEmitter<boolean>();

  private isEditIconVisible: boolean;
  private nameBeforeEdit: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(
      (e) => {
        if (e instanceof NavigationEnd) {
          this.setEditProperties(e.url);
        }
      }
    );
  }

  private setEditProperties(url: string) {
    let nonEditableRoutes = ['actions', 'attendees'];
    let splitUrl = url.split('\/');
    let isTitleEditable = nonEditableRoutes.every((elem) => !splitUrl.includes(elem));
    this.isEditIconVisible = isTitleEditable && !splitUrl.includes('create-course');
    if (!isTitleEditable) {
      this.isEditing = false;
    }
    if (this.nameBeforeEdit) {
      this.model.name = this.nameBeforeEdit;
      this.nameBeforeEdit = null;
    }
  }

  private onSave() {
    this.save.emit(true);
    this.nameBeforeEdit = null;
    this.isEditing = false;
  }

  private toggleEditing() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.nameBeforeEdit = this.model.name;
    } else {
      this.model.name = this.nameBeforeEdit;
      this.nameBeforeEdit = null;
    }
  }
}
