import { Component, Output, EventEmitter } from '@angular/core';

@Component(
  {
    selector: 'add-item-button',
    styleUrls: ['./add-item-button.component.scss'],
    template: `
      <button type="button" class="btn" (click)="onClick.emit(true)">
        <i class="fa fa-plus fa-2x"></i>
      </button>
    `
  }
)
export class AddItemButtonComponent {
  @Output() onClick = new EventEmitter<boolean>();
}
