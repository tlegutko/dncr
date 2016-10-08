import { Component, Input } from '@angular/core';

@Component(
  {
    selector: 'labelled-form-field',
    template: `
      <form-field [errors]="errors" class="row m-r-0">
        <label for="labelFor" class="col-xs-12 col-sm-3 col-xl-2 col-form-label">{{ label }}</label>
        <div class="col-xs-12 col-sm-9 col-xl-10 p-x-0">
          <ng-content></ng-content>
        </div>
      </form-field>
    `,
    styleUrls: ['./labelled-form-field.component.scss'],
  }
)
export class LabelledFormField {
  @Input() errors: string[] = [];
  @Input() labelFor: string;
  @Input() label: string;
}
