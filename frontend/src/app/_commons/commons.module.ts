import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScheduleModule } from 'primeng/components/schedule/schedule';
import { Http } from '@angular/http';
import { AuthConfig } from 'angular2-jwt';
import { FormField } from './form-field';
import { CalendarComponent } from './calendar';
import { AddItemButtonComponent } from './add-item-button';
import { AuthHttp, AuthService, AuthGuard } from './auth';
import { LabelledFormField } from './labelled-form-field';
import { NotificationsService } from 'angular2-notifications/src/notifications.service';

@NgModule(
  {
    declarations: [
      FormField, LabelledFormField, CalendarComponent, AddItemButtonComponent
    ],
    imports: [
      CommonModule, FormsModule, ScheduleModule
    ],
    providers: [
      AuthService, AuthGuard, {
        provide: AuthHttp,
        useFactory: (notifications, http) => {
          return new AuthHttp(
            notifications, new AuthConfig(
              {
                globalHeaders: [{ 'Content-Type': 'application/json' }, { 'Accept': 'application/json' }],
                noJwtError: true
              }
            ), http
          );
        },
        deps: [NotificationsService, Http]
      }
    ],
    exports: [
      FormField, LabelledFormField, CalendarComponent, AddItemButtonComponent
    ]
  }
)
export class CommonsModule {
}
