import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonsModule } from 'app/_commons/commons.module';
import { RouterModule } from '@angular/router';
import { AttendeeRowComponent } from './attendee-row/attendee-row.component';
import { CreateAttendeeComponent } from './create/create-attendee.component';
import { AttendeeService } from './attendee.service';
import { AttendeeResolve } from './attendee-resolve';

@NgModule(
  {
    declarations: [
      AttendeeRowComponent, CreateAttendeeComponent
    ],
    imports: [
      CommonModule, FormsModule, CommonsModule, RouterModule
    ],
    exports: [
      AttendeeRowComponent, CreateAttendeeComponent
    ],
    providers: [
      AttendeeService, AttendeeResolve
    ]
  }
)
export class AttendeeModule {
}
