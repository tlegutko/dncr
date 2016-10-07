import * as moment from 'moment';
import { Moment } from 'moment';

export class Course {
  id: number;
  companyId: number;
  name: string;
  price: number;
  classesCount: number;
  seatsCount: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  times: CourseTime[];

  constructor(id?: number) {
    this.id = id;
  }
}

export class CourseTime {
  locationId: number;
  startDate: string;
  startTime: string;
  endTime: string;
  repeatWeeksCount: number;
  events: CourseEvent[];
}

export class CourseEvent {
  date: string;
}

export class CreateCourseRequest {
  name: string;
  price: number;
  classesCount: number;
  seatsCount: number;
  description: string;
  startTime: string;
  endTime: string;
  repeatWeeksCount: number;
  locationId: number;
  instructorId: number;

  static fromCourse(c: Course): CreateCourseRequest {
    return {
      name: c.name,
      price: c.price,
      classesCount: c.classesCount,
      seatsCount: c.seatsCount,
      description: c.description,
      startTime: c.times[0].startDate + ' ' + c.times[0].startTime,
      endTime: c.times[0].startDate + ' ' + c.times[0].endTime,
      repeatWeeksCount: c.times[0].repeatWeeksCount,
      locationId: c.times[0].locationId,
      instructorId: 1, // TODO use real instructorId in DNCR-105
    };
  }

  static mock(): CreateCourseRequest { // useful for manual testing
    return {
      name: 'Salsa (początkujący)',
      price: 60.00,
      classesCount: 1,
      seatsCount: 1,
      description: 'najlepszy kurs',
      startTime: '2016-09-12T19:00:00',
      endTime: '2016-09-12T20:00:00',
      repeatWeeksCount: 1,
      locationId: 1,
      instructorId: 1,
    };
  }

}

export class CreateCourseTime {

  startTime: string;
  endTime: string;
  dateFormat = 'YYYY-MM-DD HH:mm:ss';

  constructor(startTime: Moment) {
    this.startTime = startTime.format(this.dateFormat);
    this.endTime = startTime.clone().add(1, 'hours').format(this.dateFormat);
  }

}

export interface CreateCourseErrors {
  name?: string[];
  price?: string[];
  classesCount?: string[];
  seatsCount?: string[];
  description?: string[];
  startDate?: string[];
  startTime?: string[];
  endTime?: string[];
  repeatWeeksCount?: string[];
  instructorId?: string[];
  locationId?: string[];
}
