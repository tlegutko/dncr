import { Component } from '@angular/core';

import { Title } from './title';
import { HomeService } from './home.service';

@Component({
  selector: 'home',
  providers: [ Title, HomeService ],
  styleUrls: [ './home.style.scss' ],
  templateUrl: './home.template.html'
})
export class Home {
  value: number;

  constructor(public title: Title, public service: HomeService) {
  }

  ngOnInit() {
    this.service.getValue(10).then(data => this.value = data);
  }
}
