import { Component } from '@angular/core';

import { CourseDetailsModel } from './course-details.model';

@Component({
    selector: 'course-details',
    providers: [ ],
    styleUrls: [ './course-details.style.scss' ],
    templateUrl: './course-details.template.html'
})
export class CourseDetails {
    details: CourseDetailsModel;

    constructor() {
        this.details = {
            name: 'kurs',
            participants: ['k1', 'k2']
        };
    }
}
