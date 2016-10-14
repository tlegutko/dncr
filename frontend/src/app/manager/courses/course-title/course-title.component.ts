import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { StoreCourseErrors, Course } from '../../../course/course.model';
import { Router, NavigationEnd } from '@angular/router';
@Component(
  {
    selector: 'course-title',
    templateUrl: './course-title.component.html',
    styleUrls: ['./course-title.component.scss'],
  }
)
export class CourseTitleComponent implements OnInit {

  @Input() model: Course;
  @Input() errors: StoreCourseErrors;
  @Input() isEditing: boolean;

  @Output() save = new EventEmitter<boolean>();

  private state: TitleState;
  private isEditIconVisible: boolean;
  private nameBeforeEdit: string;
  private createCourseUrl = 'manager/courses/create-course';
  private coursePropertiesExactUrl: string;

  constructor(private router: Router) {
    this.router.isActive('blabla', true);
  }

  ngOnInit() {
    let id = 1; // TODO model.id
    this.coursePropertiesExactUrl = `/manager/courses/${id}`;
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

  private getState(url: string) {
    let state: TitleState;
    switch (url) {
      case this.coursePropertiesExactUrl:
        state = TitleState.TextEditable;
        break;
      case this.createCourseUrl:
        state = TitleState.Editing;
        break;
      default:
        state = TitleState.Text;
    }
    return state;
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

enum TitleState {
  Editing, EditingUndoable, Text, TextEditable
}
