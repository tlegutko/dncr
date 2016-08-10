import {
  beforeEachProviders,
  inject
} from '@angular/core/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { Home } from './home.component';
import { HomeService } from './home.service';
import { Title } from './title';

describe('Home', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    {
      provide: Http,
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    },

    Title,
    Home,
    HomeService
  ]);

  it('should have call API', inject([ Home, HomeService ], (home, service) => {
    // Given
    let promise = new Promise((resolve) => { resolve({ test: 10 }); });
    spyOn(service, 'getValue').and.returnValue(promise);
    // When
    home.ngOnInit().then(() => {
      // Then
      expect(home.value).toEqual({ test: 10 });
      expect(service.getValue).toHaveBeenCalledWith(10);
    });
  }));

  it('should have a title', inject([ Home ], (home) => {
    expect(!!home.title).toEqual(true);
  }));
});
