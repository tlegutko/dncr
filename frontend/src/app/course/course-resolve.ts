import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { CoursesService } from './courses.service';
import { Course } from './course.model';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class CourseResolve implements Resolve<Course> {
  constructor(private router: Router, private service: CoursesService, private notifications: NotificationsService) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Course> {
    let id = +route.params['id'];
    return this.service.get(id).toPromise().then(
      (course) => course, () => {
        this.notifications.error('Błąd', 'Nie udało się pobrać kursu.');
        this.router.navigate(route.parent.url);
      }
    );
  }
}
