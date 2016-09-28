import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { CoursesService } from './courses.service';
import { Course } from './course.model';

@Injectable()
export class CourseResolve implements Resolve<Course> {
  constructor(private router: Router, private service: CoursesService) {
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
