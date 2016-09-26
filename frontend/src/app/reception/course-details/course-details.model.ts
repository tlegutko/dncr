import { Attendee } from 'app/attendee/attendee';

// TODO: To be removed and replaced with Course model
export class CourseDetailsModel {
  public title: string;
  public id: number;
  public attendees: Attendee[];
}
