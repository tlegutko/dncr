import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, XSRFStrategy, CookieXSRFStrategy, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { NoContent } from './no-content';
import { Homepage } from './homepage/homepage.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AUTH_PROVIDERS, AuthHttp, AuthConfig } from 'angular2-jwt';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS, AuthService, AuthGuard, CookieService, ...AUTH_PROVIDERS, {
    provide: XSRFStrategy,
    useValue: new CookieXSRFStrategy('XSRF-TOKEN', 'X-XSRF-TOKEN')
  }, {
    provide: AuthHttp,
    useFactory: (http) => {
      return new AuthHttp(
        new AuthConfig(
          {
            globalHeaders: [{ 'Content-Type': 'application/json' }, { 'Accept': 'application/json' }],
          }
        ), http
      );
    },
    deps: [Http]
  }
];

@NgModule(
  {
    bootstrap: [App],
    declarations: [
      App, Homepage, NoContent
    ],
    imports: [
      BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(ROUTES, { useHash: false })
    ],
    providers: [
      ENV_PROVIDERS, APP_PROVIDERS
    ]
  }
)
export class AppModule {
}
