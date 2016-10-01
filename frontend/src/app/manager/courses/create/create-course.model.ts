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
    mockModel.classesCount = -1;
    mockModel.seatsCount = -1;
    mockModel.description = 'najlepszy kurs';
    mockModel.startDate = '2016-09-12';
    mockModel.startTime = '2016-09-12T19:00:00';
    mockModel.endTime = '2016-09-12T20:00:00';
    mockModel.repeatWeeksCount = -1;
    mockModel.locationId = 2;
    mockModel.instructorId = 1;
    return mockModel;
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
}


export class CourseTimeForm {
  startTime: string;
  endTime: string;
  repeatWeeksCount: number;
}

export class CoursePropertiesForm {
  classesCount: number;
  seatsCount: number;
  instructorId: number;
  locationId: number;
  price: number;
  description: string;
}



