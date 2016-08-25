import { Component } from '@angular/core';
import { ReceptionService } from './reception.service';

@Component(
  {
    selector: 'reception',
    providers: [ReceptionService],
    styleUrls: ['./reception.style.scss'],
    templateUrl: './reception.template.html'
  }
)
export class Reception {
  value: any;

  constructor(public service: ReceptionService) {
  }

  ngOnInit() {
    return this.service.getValue(10).then(data => this.value = data);
  }
}
