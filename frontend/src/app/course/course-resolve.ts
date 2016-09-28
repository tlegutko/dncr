import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { CoursesService } from './courses.service';
import { Course } from './course.model';

@Injectable()
export class CourseResolve implements Resolve<Course> {
  constructor(private router: Router, private service: CoursesService) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Course> {
    let id = +route.params['id'];
    // TODO: Would be nice to get a notification that something went wrong.
    return this.service.get(id).toPromise().then(
      (course) => course, () => this.router.navigate(route.parent.url)
    );
  }
}
