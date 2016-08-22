import { Component } from '@angular/core';

import { ReceptionService } from './reception.service';
import { CourseDetails } from './course-details/course-details.component';

@Component({
  selector: 'reception',
  providers: [ ReceptionService ],
  styleUrls: [ './reception.style.scss' ],
  templateUrl: './reception.template.html',
  directives: [ CourseDetails ]
})
export class Reception {
  value: any;

  constructor(public service: ReceptionService) {
  }

  ngOnInit() {
    return this.service.getValue(10).then(data => this.value = data);
  }
}
