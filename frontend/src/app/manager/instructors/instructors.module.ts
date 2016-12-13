import { NgModule } from '@angular/core';
import { InstructorsResolve } from './instructors.resolve';
import { InstructorsService } from './instructors.service';
import { CommonsModule } from '../../_commons/commons.module';
import { CommonModule } from '@angular/common';
import { ManagerInstructorsComponent } from './instructors.component';
import { InstructorCreateComponent } from './create/instructor-create.component';
import { FormsModule } from '@angular/forms';

@NgModule(
  {
    imports: [
      CommonModule, FormsModule, CommonsModule
    ],
    declarations: [
      InstructorCreateComponent,
      ManagerInstructorsComponent
    ],
    providers: [
      InstructorsService, InstructorsResolve
    ],
    exports: [
      InstructorCreateComponent,
      ManagerInstructorsComponent
    ]
  }
)
export class InstructorsModule {
}
