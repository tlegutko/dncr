import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonsModule } from 'app/_commons/commons.module';
import { CoursesService } from './courses.service';
import { CourseResolve } from './course-resolve';
import { PaymentMethodsResolve } from './payment-methods-resolve';
import { PaymentMethodsService } from './payment-methods.service';

@NgModule(
  {
    imports: [
      CommonModule, FormsModule, CommonsModule
    ],
    providers: [
      CoursesService, CourseResolve, PaymentMethodsService, PaymentMethodsResolve
    ]
  }
)
export class CourseModule {
}
