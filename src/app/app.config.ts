import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import MyPreset from './theme/myPreset';
import { authInterceptor } from './services/Auth/interceptor/AuthInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: { darkModeSelector: '.my-app-dark' },
      },
    }),
    provideAnimations(),
    provideAnimationsAsync(),
    provideHttpClient( withInterceptors([authInterceptor])),
    MessageService,
  ],
};
