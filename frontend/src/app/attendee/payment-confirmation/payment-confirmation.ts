import { Attendee } from '../attendee';
import { Course, PaymentMethod } from 'app/course';

export class PaymentConfirmation {
  public method: PaymentMethod;
  public person: Attendee;
  public course: Course;
}
