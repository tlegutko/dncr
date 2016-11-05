import { PaymentMethod } from '../payment-method';
import { Attendee } from '../attendee';
import { Course } from 'app/course';

export class PaymentConfirmation {
  public method: PaymentMethod;
  public attendee: Attendee;
  public course: Course;
}
