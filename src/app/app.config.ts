import { ApplicationConfig, provideAppInitializer, inject } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { provideRouter } from '@angular/router';

import { ROUTES } from '@app/app.routes';
import { authInterceptor } from '@core/interceptor/auth.interceptor';
import { mockInterceptor } from './core/interceptor/mock.interceptor';
import { AuthService } from '@core/_services/auth/auth.service';

export class CustomTranslateLoader implements TranslateLoader {
  private readonly http = inject(HttpClient);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTranslation(lang: string): Observable<any> {
    return this.http.get(`./assets/_i18n/${lang}.json`);
  }
}

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideRouter(ROUTES),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        mockInterceptor
      ])
    ),
    provideAppInitializer(() => {
      const AUTH_SERVICE = inject(AuthService);
      const REFRESH$ = AUTH_SERVICE.refreshUser();

      return REFRESH$ ? firstValueFrom(REFRESH$) : Promise.resolve(null);
    }),
    provideTranslateService({
      fallbackLang: 'fr',
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader
      },
    }),
  ]
};
