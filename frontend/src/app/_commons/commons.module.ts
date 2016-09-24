import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FormField } from './form-field/form-field.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ScheduleModule } from 'primeng/components/schedule/schedule';

@NgModule(
  {
    declarations: [
      FormField, CalendarComponent
    ],
    imports: [
      BrowserModule, FormsModule, ScheduleModule
    ],
    exports: [
      FormField, CalendarComponent
    ]
  }
)
export class CommonsModule {
}
