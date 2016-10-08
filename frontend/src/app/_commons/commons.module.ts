import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ScheduleModule } from 'primeng/components/schedule/schedule';
import { FormField } from './form-field';
import { CalendarComponent } from './calendar';
import { AddItemButtonComponent } from './add-item-button';
import { AuthService, AuthGuard } from './auth';
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
      AuthService, AuthGuard
    ],
    exports: [
      FormField, LabelledFormField, CalendarComponent, AddItemButtonComponent
    ]
  }
)
export class CommonsModule {
}
