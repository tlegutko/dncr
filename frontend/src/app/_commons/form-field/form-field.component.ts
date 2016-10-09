import { Component, Input } from '@angular/core';

@Component(
  {
    selector: 'form-field',
    template: `
      <div class="form-group" [class.has-danger]="errors">
        <ng-content></ng-content>
        <div class="form-control-feedback" *ngIf="errors">
          <ul>
            <li *ngFor="let error of errors">{{ error }} </li>
          </ul>
        </div>
      </div>
    `,
    styleUrls: ['./form-field.style.scss']
  }
)
export class FormField {
  @Input() errors: string[] = [];
}
