import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { ScheduleModule } from 'primeng/primeng';

@NgModule(
  {
    declarations: [
      CalendarComponent
    ],
    imports: [
      ScheduleModule
    ],
    exports: [
      CalendarComponent
    ]
  }
)
export class CalendarModule {
}
