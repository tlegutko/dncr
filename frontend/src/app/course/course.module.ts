import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonsModule } from 'app/_commons/commons.module';
import { CoursesService } from './courses.service';
import { CourseResolve } from './course-resolve';

@NgModule(
  {
    imports: [
      BrowserModule, FormsModule, CommonsModule
    ],
    providers: [
      CoursesService, CourseResolve
    ]
  }
)
export class CourseModule {
}
