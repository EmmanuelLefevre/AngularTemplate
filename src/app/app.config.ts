import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app.routes';

export class MyCustomLoader implements TranslateLoader {
  constructor(private readonly http: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTranslation(lang: string): Observable<any> {
    return this.http.get(`/assets/_i18n/${lang}.json`);
  }
}

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new MyCustomLoader(http);
}

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(ROUTES),
    provideTranslateService({
      fallbackLang: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ]
};
