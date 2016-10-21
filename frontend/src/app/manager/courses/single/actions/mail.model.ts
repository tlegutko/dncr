export class Mail {
  public courseId: number;
  public title: string;
  public message: string;

  constructor(courseId: number, title: string, message: string) {
    this.courseId = courseId;
    this.title = title;
    this.message = message;
  }
}
