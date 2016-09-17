import { Component, Input } from '@angular/core';

@Component(
  {
    selector: 'form-field',
    template: `
      <div class="form-group" [class.has-danger]="errors">
        <ng-content></ng-content>
        <div class="form-control-feedback" *ngIf="errors">
          <span *ngFor="let error of errors">{{ error }}</span>
        </div>
      </div>
    `,
    styleUrls: ['./field.style.scss']
  }
)
export class Field {
  @Input() errors: string[] = [];
}