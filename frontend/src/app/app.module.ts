import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { CommonsModule } from './_commons/commons.module';
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { NoContent } from './no-content';
import { Homepage, HomepageGuard } from './homepage';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS, CookieService, HomepageGuard, ...AUTH_PROVIDERS, {
    provide: XSRFStrategy,
    useValue: new CookieXSRFStrategy('XSRF-TOKEN', 'X-XSRF-TOKEN')
  }
];

@NgModule(
  {
    bootstrap: [App],
    declarations: [
      App, Homepage, NoContent
    ],
    imports: [
      BrowserModule, FormsModule, HttpModule, CommonsModule, RouterModule.forRoot(ROUTES, { useHash: false })
    ],
    providers: [
      ENV_PROVIDERS, APP_PROVIDERS
    ]
  }
)
export class AppModule {
}
