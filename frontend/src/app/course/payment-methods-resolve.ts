import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/toPromise';
import { PaymentMethod } from './payment-method.model';
import { PaymentMethodsService } from './payment-methods.service';

@Injectable()
export class PaymentMethodsResolve implements Resolve<PaymentMethod[]> {
  constructor(
    private router: Router, private service: PaymentMethodsService, private notifications: NotificationsService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<PaymentMethod[]> {
    return this.service.list().toPromise().then(
      (response) => response, () => {
        this.notifications.error('Błąd', 'Nie udało się pobrać metod płatności.');
        this.router.navigate(route.parent.url);
      }
    );
  }
}
