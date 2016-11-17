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
  times: CourseTime[] = [new CourseTime()];

  static mock(): Course { // useful for manual testing, don't delete!
    return new Course({
      id: 1,
      companyId: 1,
      name: 'Salsa (początkujący)',
      price: 60.00,
      classesCount: 1,
      seatsCount: 1,
      instructorId: 1,
      description: 'Najlepszy kurs',
      times: [new CourseTime({
        startDate: '2016-10-26',
        startTime: '11:00',
        endTime: '12:00',
        repeatWeeksCount: 1,
        locationId: 1
      })]
    });
  }

  constructor(fields?: {
    id?: number,
    companyId?: number,
    name?: string,
    price?: number,
    classesCount?: number,
    seatsCount?: number,
    instructorId?: number,
    description?: string,
    times?: CourseTime[]
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }

  public setTime(courseTime: CreateCourseTime) {
    this.times[0].startDate = courseTime.startDate;
    this.times[0].startTime = courseTime.startTime;
    this.times[0].endTime = courseTime.endTime;
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
  repeatWeeksCount: number = 1;
  events: CourseEvent[];
  createdAt: string;
  updatedAt: string;

  constructor(fields?: {
    id?: number,
    courseId?: number,
    locationId?: number,
    startDate?: string,
    startTime?: string,
    endTime?: string,
    repeatWeeksCount?: number,
    events?: CourseEvent[]
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export interface CourseEvent  {
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
  times?: CourseTimeErrors[] = [new CourseTimeErrors()];

  public clear() {
    this.name = undefined;
    this.price = undefined;
    this.classesCount = undefined;
    this.seatsCount = undefined;
    this.description = undefined;
    this.instructorId = undefined;
    this.times = [new CourseTimeErrors()];
  }

  public update(errors: CourseErrors) {
    this.clear();
    Object.assign(this, errors);
  }
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
