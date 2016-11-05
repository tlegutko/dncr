import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from 'app/course';
import { Attendee, PaymentMethod, PaymentConfirmation, PaymentConfirmationComponent } from 'app/attendee';

@Component(
  {
    selector: 'attendee-row',
    templateUrl: './attendee-row.component.html',
    styleUrls: ['./attendee-row.component.scss'],
  }
)
export class AttendeeRowComponent {
  @Input() course: Course;
  @Input() attendee: Attendee;
  @Input() checkable: boolean;
  @Input() detailsRoute: string[];
  @Input() paymentMethods: PaymentMethod[] = [];
  @Output() onPayment = new EventEmitter<PaymentConfirmation>();

  showPaymentForm: boolean = false;

  constructor(private modal: NgbModal) {
  }

  public payUsing(method: PaymentMethod) {
    let modal = this.modal.open(
      PaymentConfirmationComponent, {
        backdrop: 'static',
        windowClass: 'payment-confirmation'
      }
    );
    modal.componentInstance.method = method;
    modal.componentInstance.attendee = this.attendee;
    modal.componentInstance.course = this.course;
    modal.result.then(
      () => {
        this.onPayment.emit(
          {
            attendee: this.attendee,
            course: this.course,
            method: method
          }
        );
        this.hidePayment();
      }, () => {}
    );
  }

  public showPayment() {
    this.showPaymentForm = this.paymentMethods.length > 0;
  }

  public hidePayment() {
    this.showPaymentForm = false;
  }
}
