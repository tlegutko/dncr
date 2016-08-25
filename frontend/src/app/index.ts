// App
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard';
import { CookieService } from 'angular2-cookie/core';
export * from './app.component';
export * from './app.routes';

// Application wide providers
export const APP_PROVIDERS = [AuthService, AuthGuard, CookieService];
