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
  startTime: string;
  endTime: string;
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
  startDate: string;
  startTime: string;
  endTime: string;
  repeatWeeksCount: number;
  locationId: number;
  instructorId: number;

  static mock(): CreateCourseRequest { // useful for manual testing
    let mockModel = new CreateCourseRequest();
    mockModel.name = 'Salsa (początkujący)';
    mockModel.price = 60.00;
    mockModel.classesCount = 1;
    mockModel.seatsCount = 1;
    mockModel.description = 'najlepszy kurs';
    mockModel.startTime = '2016-09-12T19:00:00';
    mockModel.endTime = '2016-09-12T20:00:00';
    mockModel.repeatWeeksCount = 1;
    mockModel.locationId = 1;
    mockModel.instructorId = 1;
    return mockModel;
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
