import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseErrors } from './course.model';

/**
 * Allows to share errors object in components not being direct descendants of one another
 * (ManagerCoursesSingleComponent and ManagerCoursesDetailsComponent).
 */
@Injectable()
export class CourseErrorsResolve implements Resolve<CourseErrors> {

  public resolve(): Observable<CourseErrors> {
    return Observable.of(new CourseErrors());
  }
}
