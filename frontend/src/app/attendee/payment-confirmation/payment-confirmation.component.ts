import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Attendee } from 'app/attendee';
import { Course, PaymentMethod } from 'app/course';

@Component(
  {
    selector: 'payment-confirmation',
    templateUrl: './payment-confirmation.component.html',
    styleUrls: ['./payment-confirmation.component.scss'],
  }
)
export class PaymentConfirmationComponent {
  @Input() method: PaymentMethod;
  @Input() course: Course;
  @Input() person: Attendee;

  constructor(private modal: NgbActiveModal) {
  }

  public confirm() {
    this.modal.close();
  }
  public cancel() {
    this.modal.dismiss();
  }
}
