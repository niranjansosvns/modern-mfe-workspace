import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Import HTTP Providers
import { jwtLoggingInterceptor } from './core/jwt-logging.interceptor'; // Import your interceptor

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Provide HttpClient globally and register your functional interceptor array
    provideHttpClient(
      withInterceptors([jwtLoggingInterceptor])
    )
  ]
};
