import { Component, Input } from '@angular/core';

@Component(
  {
    selector: 'labelled-form-field',
    template: `
      <div class="form-group" [class.has-danger]="errors">
        <label [attr.for]="labelFor" class="col-xs-12 col-sm-3 col-xl-2 col-form-label">{{ label }}</label>
        <div class="col-xs-12 col-sm-9 col-xl-10 p-x-0">
          <ng-content></ng-content>
          <div class="form-control-feedback" *ngIf="errors">
            <ul>
              <li *ngFor="let error of errors">{{ error }} </li>
            </ul>
          </div>
        </div>
      </div>
    `,
    styleUrls: ['./labelled-form-field.component.scss'],
  }
)
export class LabelledFormField {
  @Input() errors: string[] = [];
  @Input('for') labelFor: string;
  @Input() label: string;
}
