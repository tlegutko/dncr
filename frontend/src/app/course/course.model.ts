import { Moment } from 'moment';

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
  times: CourseTime[] = [];

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
    ct.startTime = '11:00';
    ct.endTime = '12:00';
    ct.repeatWeeksCount = 1;
    ct.locationId = 1;
    c.times = [ct];

    return c;
  }

  constructor(id?: number) {
    this.id = id;
    this.times.push(new CourseTime());
  }

  setDefaultRepeatWeeksCount() {
    this.times[0].repeatWeeksCount = 1;
  }

  setTime(courseTime: CreateCourseTime) {
    this.times[0].startDate = courseTime.startDate;
    this.times[0].startTime = courseTime.startTime;
    this.times[0].endTime = courseTime.endTime;
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

export class CreateCourseTime {

  startDate: string;
  startTime: string;
  endTime: string;
  dateFormat = 'YYYY-MM-DD';
  timeFormat = 'HH:mm';

  constructor(clickedTime: Moment) {
    this.startDate = clickedTime.format(this.dateFormat);
    this.startTime = clickedTime.format(this.timeFormat);
    this.endTime = clickedTime.clone().add(1, 'hours').format(this.timeFormat);
  }

}

// export interface StoreCourseErrors {
//   name?: string[];
//   price?: string[];
//   classesCount?: string[];
//   seatsCount?: string[];
//   description?: string[];
//   instructorId?: string[];
//   times?: CourseTimeErrors[];
// }
//
// export interface CourseTimeErrors {
//   locationId?: string[];
//   startDate?: string[];
//   startTime?: string[];
//   endTime?: string[];
//   repeatWeeksCount?: string[];
//   events?: CourseEventErrors[];
// }
//
// export interface CourseEventErrors {
//   date?: string[];
// }
export class StoreCourseErrors {
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
