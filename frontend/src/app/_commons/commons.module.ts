import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ScheduleModule } from 'primeng/components/schedule/schedule';
import { Http } from '@angular/http';
import { AuthConfig } from 'angular2-jwt';
import { FormField } from './form-field';
import { CalendarComponent } from './calendar';
import { AddItemButtonComponent } from './add-item-button';
import { AuthHttp, AuthService, AuthGuard } from './auth';
import { LabelledFormField } from './labelled-form-field';

@NgModule(
  {
    declarations: [
      FormField, LabelledFormField, CalendarComponent, AddItemButtonComponent
    ],
    imports: [
      BrowserModule, FormsModule, ScheduleModule
    ],
    providers: [
      AuthService, AuthGuard, {
        provide: AuthHttp,
        useFactory: (http) => {
          return new AuthHttp(
            new AuthConfig(
              {
                globalHeaders: [{ 'Content-Type': 'application/json' }, { 'Accept': 'application/json' }],
                noJwtError: true
              }
            ), http
          );
        },
        deps: [Http]
      }
    ],
    exports: [
      FormField, LabelledFormField, CalendarComponent, AddItemButtonComponent
    ]
  }
)
export class CommonsModule {
}
