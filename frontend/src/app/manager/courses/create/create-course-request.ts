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

  static mock(): CreateCourseRequest {
    let mockModel = new CreateCourseRequest();
    mockModel.name = 'Salsa (początkujący)';
    mockModel.price = 60.00;
    mockModel.classesCount = 4;
    mockModel.seatsCount = 20;
    mockModel.description = 'najlepszy kurs';
    mockModel.startDate = '2016-09-12';
    mockModel.startTime = '2016-09-12T19:00:00';
    mockModel.endTime = '2016-09-12T20:00:00';
    mockModel.repeatWeeksCount = 4;
    return mockModel;
  }

  toJson(): CreateCourseRequestJson {
    return {
      name: this.name,
      price: this.price,
      classes_count: this.classesCount,
      seats_count: this.seatsCount,
      description: this.description,
      start_date: this.startDate,
      start_time: this.startTime,
      end_time: this.endTime,
      repeat_weeks_count: this.repeatWeeksCount,
    };
  }
}

export interface CreateCourseRequestJson {
  name: string;
  price: number;
  classes_count: number;
  seats_count: number;
  description: string;
  start_date: string;
  start_time: string;
  end_time: string;
  repeat_weeks_count: number;
}
