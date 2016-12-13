import { LocationsService } from './locations.service';
import { NotificationsService } from 'angular2-notifications/src/notifications.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Instructor } from './instructors.model';
import { InstructorsService } from './instructors.service';

@Injectable()
export class InstructorsResolve implements Resolve<Instructor[]> {
  constructor(
    private router: Router, private service: InstructorsService, private notifications: NotificationsService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Instructor[]> {
    return this.service.list().toPromise().then(
      (locations) => locations, () => {
        this.notifications.error('Błąd', 'Nie udało się pobrać listy instruktorów.');
        this.router.navigate(route.parent.url);
      }
    );
  }
}
