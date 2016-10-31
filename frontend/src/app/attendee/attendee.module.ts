import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonsModule } from 'app/_commons/commons.module';
import { RouterModule } from '@angular/router';
import { AttendeeRowComponent } from './attendee-row/attendee-row.component';
import { CreateAttendeeComponent } from './create/create-attendee.component';
import { AttendeeService } from './attendee.service';
import { AttendeeResolve } from './attendee-resolve';
import { PaymentConfirmationComponent } from './payment-confirmation/payment-confirmation.component';

@NgModule(
  {
    declarations: [
      AttendeeRowComponent, CreateAttendeeComponent, PaymentConfirmationComponent
    ],
    imports: [
      CommonModule, FormsModule, CommonsModule, NgbModule.forRoot(), RouterModule
    ],
    exports: [
      AttendeeRowComponent, CreateAttendeeComponent
    ],
    providers: [
      AttendeeService, AttendeeResolve
    ],
    entryComponents: [
      PaymentConfirmationComponent
    ]
  }
)
export class AttendeeModule {
}
