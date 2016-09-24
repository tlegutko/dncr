import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AttendeeRowComponent } from './attendee-row/attendee-row.component';

@NgModule(
  {
    declarations: [
      AttendeeRowComponent
    ],
    imports: [
      BrowserModule, FormsModule
    ],
    exports: [
      AttendeeRowComponent
    ]
  }
)
export class AttendeeModule {
}
