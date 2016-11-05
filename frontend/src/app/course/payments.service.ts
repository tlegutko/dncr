import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { PaymentConfirmation } from 'app/attendee';
import { AuthHttp } from 'app/_commons/auth';
import { PaymentMethod } from './payment-method.model';

@Injectable()
export class PaymentsService {
  constructor(private http: AuthHttp) {
  }

  public listPaymentMethods(): Observable<PaymentMethod[]> {
    let url = 'api/payment-methods';
    return this.http.get(url)
      .map((response: Response) => response.json() as PaymentMethod[])
      .catch(() => Observable.throw('Błąd pobierania metod płatności.'));
  }

  public create(confirmation: PaymentConfirmation): Observable<any> {
    let url = `api/courses/${confirmation.course.id}/pay`;
    let request = {
      paymentTypeId: confirmation.method.id,
      attendeeId: confirmation.attendee.id,
      isManual: true // TODO: For now we have only manual payment
    };
    return this.http.post(url, request);
  }
}
