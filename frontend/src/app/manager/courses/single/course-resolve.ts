import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CoursesService, Course } from 'app/manager/courses';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CourseResolve implements Resolve<Course> {
  constructor(private service: CoursesService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Course>|boolean {
    let id = +route.params['id'];
    return this.service.get(id).toPromise().then(
      (course: Course) => {
        if (course) {
          return course;
        } else {
          // id not found
          this.router.navigate(['/manager/courses']);
          return false;
        }
      }
    );
  }
}
