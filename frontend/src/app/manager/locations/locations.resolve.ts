import { LocationsService } from './locations.service';
import { NotificationsService } from 'angular2-notifications/src/notifications.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CourseLocation } from './locations.model';

@Injectable()
export class LocationsResolve implements Resolve<CourseLocation[]> {
  constructor(private router: Router, private service: LocationsService, private notifications: NotificationsService) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<CourseLocation[]> {
    return this.service.list().toPromise().then(
      (locations) => locations, () => {
        this.notifications.error('Błąd', 'Nie udało się pobrać lokacji.');
        this.router.navigate(route.parent.url);
      }
    );
  }
}
