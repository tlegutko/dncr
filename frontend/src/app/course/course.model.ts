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
