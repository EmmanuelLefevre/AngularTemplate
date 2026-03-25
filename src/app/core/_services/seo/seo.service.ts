import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

import { ENVIRONMENT } from '@env/environment';
import { SeoData } from '@core/_models/seo/seo.model';

const APP_NAME_KEY = 'META.DEFAULT.APP_NAME';
const DEFAULT_TITLE_KEY = 'META.DEFAULT.TITLE';
const DEFAULT_DESC_KEY = 'META.DEFAULT.DESCRIPTION';
const DEFAULT_KEYWORDS_KEY = 'META.DEFAULT.KEYWORDS';

const TITLE_SEPARATOR = ' | ';

@Injectable({
  providedIn: 'root'
})

export class SeoService {

  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly translate = inject(TranslateService);

  private readonly config = ENVIRONMENT.application;

  async updateMetaTags(data: SeoData = {}): Promise<void> {
    const translations = await this.fetchTranslations(data);

    this.updateTitle(data, translations);
    this.updateDescriptionAndKeywords(data, translations);
    this.updateGeneralTags(data);
    this.updateImageTags(data.image);
  }

  private async fetchTranslations(data: SeoData): Promise<Record<string, string>> {

    const keys: string[] = [
      APP_NAME_KEY,
      DEFAULT_TITLE_KEY,
      DEFAULT_DESC_KEY,
      DEFAULT_KEYWORDS_KEY
    ];

    if (data.titleKey) keys.push(data.titleKey);
    if (data.descriptionKey) keys.push(data.descriptionKey);

    return firstValueFrom(this.translate.get(keys)) as Promise<Record<string, string>>;
  }

  private updateTitle(data: SeoData, translations: Record<string, string>): void {

    const appName = translations[APP_NAME_KEY];
    const pageTitle = data.titleKey ? translations[data.titleKey] : null;

    const finalTitle = (pageTitle && pageTitle !== translations[DEFAULT_TITLE_KEY])
      ? `${appName}${TITLE_SEPARATOR}${pageTitle}`
      : appName;

    if (finalTitle) {
      this.title.setTitle(finalTitle);
      this.meta.updateTag({ property: 'og:title', content: finalTitle });
    }
  }

  private updateDescriptionAndKeywords(data: SeoData, translations: Record<string, string>): void {

    const description = (data.descriptionKey && translations[data.descriptionKey])
      ? translations[data.descriptionKey]
      : translations[DEFAULT_DESC_KEY];

    const keywords = translations[DEFAULT_KEYWORDS_KEY];

    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
    }

    if (keywords) {
      this.meta.updateTag({ name: 'keywords', content: keywords });
    }
  }

  private updateGeneralTags(data: SeoData): void {

    if (this.document?.documentElement) {
      this.document.documentElement.lang = this.translate.currentLang || 'fr';
    }

    this.meta.updateTag({ name: 'robots', content: data.robots || 'index, follow' });
    this.meta.updateTag({ name: 'author', content: this.config.author });
    this.meta.updateTag({ name: 'theme-color', content: this.config.themeColor });
    this.meta.updateTag({ property: 'og:url', content: this.document.URL });

    this.meta.updateTag({ property: 'og:type', content: data.type || 'website' });
  }

  private updateImageTags(imageUrl?: string): void {

    const imageToUse = imageUrl || this.config.defaultShareImage;

    if (imageToUse && imageToUse.trim() !== '') {
      this.meta.updateTag({ property: 'og:image', content: imageToUse });
      this.meta.updateTag({ name: 'twitter:image', content: imageToUse });
    }
    else {
      this.meta.removeTag('property=\'og:image\'');
      this.meta.removeTag('name=\'twitter:image\'');
    }
  }
}
