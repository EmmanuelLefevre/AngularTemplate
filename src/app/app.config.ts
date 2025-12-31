import { ApplicationConfig, provideAppInitializer, inject } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTranslateService, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { catchError, firstValueFrom, Observable, of } from 'rxjs';

import { ROUTES } from '@app/app.routes';
import { authInterceptor } from '@core/interceptor/auth/auth.interceptor';
import { mockInterceptor } from '@core/interceptor/dev/mock.interceptor';
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
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        mockInterceptor
      ])
    ),
    provideAppInitializer(async() => {
      const AUTH_SERVICE = inject(AuthService);
      const TRANSLATE = inject(TranslateService);

      const BROWSER_LANG = TRANSLATE.getBrowserLang();
      const LANG_TO_USE = BROWSER_LANG?.match(/en|fr/) ? BROWSER_LANG : 'fr';
      TRANSLATE.setFallbackLang('fr');

      await Promise.all([
        firstValueFrom(AUTH_SERVICE.refreshUser()?.pipe(catchError(() => of(null))) || of(null)),
        firstValueFrom(TRANSLATE.use(LANG_TO_USE))
      ]);
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
