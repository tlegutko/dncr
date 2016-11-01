import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CourseErrors, Course } from '../../../course/course.model';
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
  @Input() errors: CourseErrors;

  @Output() save = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<boolean>();

  state: TitleState;
  private nameBeforeEdit: string;
  private stateRef = TitleState;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(
      (e) => {
        if (e instanceof NavigationEnd) {
          this.changeState(CourseTitleComponent.getStateAfterUrlChange(e.url));
        }
      }
    );
  }

  public onSuccessfulSave() {
    this.changeState(TitleState.TextEditable);
  }

  public onCreateCourseErrors() {
    this.changeState(TitleState.Editing);
  }

  public onEditCourseErrors() {
    this.changeState(TitleState.EditingUndoable);
  }

  private isEditing(): boolean {
    return this.state === TitleState.Editing || this.state === TitleState.EditingUndoable;
  }

  private isEditable(): boolean {
    return this.state === TitleState.TextEditable || this.isEditing();
  }

  private onCancel() {
    let newState = this.state === TitleState.EditingUndoable ? TitleState.TextEditable : TitleState.Closed;
    this.changeState(newState);
  }

  private static getStateAfterUrlChange(url: string): TitleState {
    let createCourseUrl = '/manager/courses/create-course';
    let courseDetailsRegExp = /\/manager\/courses\/\d+$/;
    let newState: TitleState;

    if (courseDetailsRegExp.test(url)) {
      newState = TitleState.TextEditable;
    } else if (url === createCourseUrl) {
      newState = TitleState.Editing;
    } else {
      newState = TitleState.Text;
    }

    return newState;
  }

  private changeState(newState: TitleState) {
    switch (newState) { // side effects go here
      case TitleState.PendingSave:
        this.save.emit(true);
        break;
      case TitleState.EditingUndoable:
        this.nameBeforeEdit = this.model.name;
        break;
      case TitleState.TextEditable:
        if (this.state === TitleState.EditingUndoable) {
          this.model.name = this.nameBeforeEdit;
        }
        break;
      case TitleState.Text:
        if (this.state === TitleState.EditingUndoable) { // route change during edit to actions / attendees
          this.model.name = this.nameBeforeEdit;
        }
        break;
      case TitleState.Closed:
        this.close.emit(true);
        break;
      default:
    }
    this.state = newState;
  }

}

enum TitleState {
  Editing, EditingUndoable, Text, TextEditable, PendingSave, Closed
}
