import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Field } from './field/field.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ScheduleModule } from 'primeng/components/schedule/schedule';

@NgModule(
  {
    declarations: [
      Field, CalendarComponent
    ],
    imports: [
      BrowserModule, FormsModule, ScheduleModule
    ],
    exports: [
      Field, CalendarComponent
    ]
  }
)
export class CommonsModule {
}
