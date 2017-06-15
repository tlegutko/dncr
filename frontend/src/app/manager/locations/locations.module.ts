import { LocationsService } from './locations.service';
import { LocationsResolve } from './locations.resolve';
import { NgModule } from '@angular/core';

@NgModule(
  {
    providers: [
      LocationsService, LocationsResolve
    ]
  }
)
export class LocationsModule {
}
