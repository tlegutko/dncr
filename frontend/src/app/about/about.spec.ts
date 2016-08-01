import { ActivatedRoute } from '@angular/router';
import {
  beforeEachProviders
} from '@angular/core/testing';

// Load the implementations that should be tested
import { About } from './about.component';

describe('About', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    // provide a better mock
    {
      provide: ActivatedRoute,
      useValue: {
        data: {
          subscribe: (fn) => fn({yourData: 'yolo'})
        }
      }
    },
    About
  ]);
});
