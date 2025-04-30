import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; 
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';
import { TokenInterceptor } from './service/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),    
    provideHttpClient(
      withInterceptors([
        (req, next) => new TokenInterceptor().intercept(req, next) 
      ])      ,
      withFetch(),
    ),
    provideClientHydration(withEventReplay())
  ]
};
