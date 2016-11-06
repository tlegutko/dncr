import { Attendee } from '../attendee';
import { Course, PaymentMethod } from 'app/course';

export class PaymentConfirmation {
  public method: PaymentMethod;
  public attendee: Attendee;
  public course: Course;
}
