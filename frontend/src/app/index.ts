// App
import { AuthService } from './auth.service';
import { AuthGuard } from './AuthGuard';
export * from './app.component';
export * from './app.routes';

// Application wide providers
export const APP_PROVIDERS = [AuthService, AuthGuard];
