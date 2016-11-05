import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { Attendee } from 'app/attendee';
import { Course, PaymentsService, PaymentMethod } from 'app/course';

@Component(
  {
    selector: 'add-payment',
    templateUrl: './add-payment.component.html',
    styleUrls: ['./add-payment.component.scss'],
  }
)
export class AddPaymentComponent implements OnInit {
  @Input() course: Course;
  @Input() person: Attendee;
  method: PaymentMethod;
  methods: PaymentMethod[];

  constructor(
    private modal: NgbActiveModal, private paymentService: PaymentsService,
    private notifications: NotificationsService
  ) {
  }

  ngOnInit() {
    this.paymentService.listPaymentMethods().subscribe(
      (methods) => this.methods = methods, () => {
        this.notifications.error('Błąd', 'Nie udało się pobrać metod płatności');
        this.modal.dismiss();
      }
    );
  }

  public canConfirm(): boolean {
    return this.method != null;
  }

  public confirm() {
    this.modal.close(this.method);
  }

  public cancel() {
    this.modal.dismiss();
  }
}
