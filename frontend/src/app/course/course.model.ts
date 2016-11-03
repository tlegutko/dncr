import * as moment from 'moment';
import { Moment } from 'moment';
import { Response } from '@angular/http';

export class Course {

  id: number;
  companyId: number;
  name: string;
  price: number;
  classesCount: number;
  seatsCount: number;
  instructorId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  times: CourseTime[];

  static parseRequest(response: Response): Course {
    let course: Course = response.json();
    course.times = course.times.map(CourseTime.changeTimeFormat);
    return course;
  }

  static mock(): Course { // useful for manual testing, don't delete!

    let c = new Course();
    c.name = 'Salsa (początkujący)';
    c.price = 60.00;
    c.classesCount = 1;
    c.seatsCount = 1;
    c.description = 'najlepszy kurs';
    c.instructorId = 1;

    let ct = new CourseTime();
    ct.startDate = '2016-10-26';
    ct.startTime = '11:00=';
    ct.endTime = '12:00';
    ct.repeatWeeksCount = 1;
    ct.locationId = 1;
    c.times = [ct];

    return c;
  }

  constructor(id?: number) {
    this.id = id;
  }

}

export class CourseTime {
  static dateFormat = 'YYYY-MM-DD';
  static backendTimeFormat = 'H:m:s';
  static timeFormat = 'HH:mm';

  id: number;
  courseId: number;
  locationId: number;
  startDate: string;
  startTime: string;
  endTime: string;
  repeatWeeksCount: number;
  events: CourseEvent[];
  createdAt: string;
  updatedAt: string;

  setTime(courseTime: CreateCourseTime) {
    this.startDate = courseTime.startDate;
    this.startTime = courseTime.startTime;
    this.endTime = courseTime.endTime;
  }

  static withDefaultRepeatCount(): CourseTime {
    let c = new CourseTime();
    c.repeatWeeksCount = 1;
    return c;
  }

  static changeTimeFormat(ct: CourseTime): CourseTime {
    ct.startTime = CourseTime.parseTime(ct.startTime);
    ct.endTime = CourseTime.parseTime(ct.endTime);
    return ct;
  }

  private static parseTime(time: string) {
    return moment(time, CourseTime.backendTimeFormat).format(CourseTime.timeFormat);
  }

}

export class CourseEvent  {
  id: number;
  courseTimeId: number;
  date: string;
  createdAt: string;
  updatedAt: string;

}

export class CreateCourseTime {
  startDate: string;
  startTime: string;
  endTime: string;

  constructor(clickedTime: Moment) {
    this.startDate = clickedTime.format(CourseTime.dateFormat);
    this.startTime = clickedTime.format(CourseTime.timeFormat);
    this.endTime = clickedTime.clone().add(1, 'hours').format(CourseTime.timeFormat);
  }

}

export class CourseErrors {
  name?: string[];
  price?: string[];
  classesCount?: string[];
  seatsCount?: string[];
  description?: string[];
  instructorId?: string[];
  times?: CourseTimeErrors[] = [];
}

export class CourseTimeErrors {
  locationId?: string[];
  startDate?: string[];
  startTime?: string[];
  endTime?: string[];
  repeatWeeksCount?: string[];
  events?: CourseEventErrors[] = [];
}

export class CourseEventErrors {
  date?: string[];
}
