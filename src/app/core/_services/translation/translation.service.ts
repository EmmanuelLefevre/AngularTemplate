import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class TranslationService {

  private readonly translate = inject(TranslateService);

  private readonly STORAGE_KEY = 'user-lang';
  private readonly SUPPORTED_LANGS = ['fr', 'en'];
  private readonly DEFAULT_LANG = 'fr';

  public initLanguage(): void {
    this.translate.addLangs(this.SUPPORTED_LANGS);
    this.translate.setFallbackLang(this.DEFAULT_LANG);

    const savedLang = localStorage.getItem(this.STORAGE_KEY);

    if (savedLang && this.SUPPORTED_LANGS.includes(savedLang)) {
      this.translate.use(savedLang);
    }
    else {
      const browserLang = this.translate.getBrowserLang();
      const langToUse = (browserLang && this.SUPPORTED_LANGS.includes(browserLang))
        ? browserLang
        : this.DEFAULT_LANG;

      this.translate.use(langToUse);

      localStorage.setItem(this.STORAGE_KEY, langToUse);
    }
  }

  public setLanguage(lang: string): void {
    if (this.SUPPORTED_LANGS.includes(lang)) {
      this.translate.use(lang);
      localStorage.setItem(this.STORAGE_KEY, lang);

      document.documentElement.lang = lang;
    }
  }

  public getCurrentLang(): string {
    return this.translate.getCurrentLang() || this.DEFAULT_LANG;
  }
}
