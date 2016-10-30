import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Attendee, AddPaymentComponent, PaymentConfirmation } from 'app/attendee';
import { Course, PaymentMethod } from 'app/course';

@Component(
  {
    selector: 'attendee-action-button',
    styleUrls: ['./action-button.component.scss'],
    templateUrl: './action-button.component.html'
  }
)
export class AttendeeActionButtonComponent {
  @Input() attendee: Attendee;
  @Input() course: Course;
  @Output() onPayment = new EventEmitter<PaymentConfirmation>();

  constructor(private modal: NgbModal){
  }

  public addPayment(){
    let modal = this.modal.open(
      AddPaymentComponent, {
        backdrop: 'static',
        windowClass: 'add-payment'
      }
    );
    modal.componentInstance.person = this.attendee;
    modal.componentInstance.course = this.course;
    modal.result.then(
      (method: PaymentMethod) => {
        this.onPayment.emit(
          {
            person: this.attendee,
            course: this.course,
            method: method
          }
        );
      },
      () => {}
    );
  }
}
