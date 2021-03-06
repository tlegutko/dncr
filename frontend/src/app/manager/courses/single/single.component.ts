import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications/src/notifications.service';
import { Course, CourseErrors, CoursesService } from 'app/course';

@Component(
  {
    selector: 'manager-courses-single',
    styleUrls: ['./single.component.scss'],
    templateUrl: './single.component.html'
  }
)
export class ManagerCoursesSingleComponent implements OnInit {
  private course: Course;
  private errors: CourseErrors;

  constructor(
    private router: Router, private route: ActivatedRoute, private coursesService: CoursesService,
    private notifications: NotificationsService
  ) {
  }

  public ngOnInit() {
    this.route.data.forEach(
      (data: { course: Course, courseErrors: CourseErrors }) => {
        this.course = data.course;
        this.errors = data.courseErrors;
      }
    );
  }

  onSave(callback: (result: boolean) => void) {
    this.coursesService.create(this.course).subscribe(
      (course) => {
        this.course = course;
        this.errors.clear();
        callback(true);
      }, (errors) => {
        this.notifications.error('Błąd zapisu', 'W formularzu są błędy. Popraw je i spróbuj ponownie.');
        this.errors.update(errors);
        callback(false);
      }
    );
  }

  onClose() {
    this.router.navigate(['/manager/courses']);
  }
}
