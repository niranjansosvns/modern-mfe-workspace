import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { PROFILE_ROUTES } from './app.routes'; // Change 'routes' to 'PROFILE_ROUTES'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(PROFILE_ROUTES) // Feed your profile routes here
  ]
};
