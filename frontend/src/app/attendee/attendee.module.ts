import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AttendeeRowComponent } from './attendee-row/attendee-row.component';
import { CreateAttendeeComponent } from './create/create-attendee.component';
import { CommonsModule } from 'app/_commons/commons.module';

@NgModule(
  {
    declarations: [
      AttendeeRowComponent, CreateAttendeeComponent
    ],
    imports: [
      BrowserModule, FormsModule, CommonsModule
    ],
    exports: [
      AttendeeRowComponent, CreateAttendeeComponent
    ]
  }
)
export class AttendeeModule {
}
