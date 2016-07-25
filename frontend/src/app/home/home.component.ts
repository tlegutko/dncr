import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';

@Component({
  selector: 'home',
  providers: [ Title ],
  styles: [ require('./home.style.scss') ],
  templateUrl: './home.template.html'
})
export class Home {
  // Set our default values
  localState = { value: '' };
  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  submitState(value) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
