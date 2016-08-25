import { beforeEachProviders, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Reception } from './reception.component';
import { ReceptionService } from './reception.service';

// Load the implementations that should be tested

describe(
  'Reception', () => {
    // provide our implementations or mocks to the dependency injector
    beforeEachProviders(
      () => [
        BaseRequestOptions, MockBackend, {
          provide: Http,
          useFactory: function(backend, defaultOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },

        Reception, ReceptionService
      ]
    );

    it(
      'should have call API', inject(
        [Reception, ReceptionService], (ctrl, service) => {
          // Given
          let promise = new Promise(
            (resolve) => {
              resolve({ test: 10 });
            }
          );
          spyOn(service, 'getValue').and.returnValue(promise);
          // When
          ctrl.ngOnInit().then(
            () => {
              // Then
              expect(ctrl.value).toEqual({ test: 10 });
              expect(service.getValue).toHaveBeenCalledWith(10);
            }
          );
        }
      )
    );
  }
);
