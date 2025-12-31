import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

import { ENVIRONMENT } from '@env/environment';
import { SeoData } from '@core/_models/seo/seo.model';

const NULL = 0;

@Injectable({
  providedIn: 'root'
})

export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT);
  private readonly translate = inject(TranslateService);

  private readonly config = ENVIRONMENT.application;

  async updateMetaTags(data: SeoData = {}): Promise<void> {
    const KEYS: string[] = [];

    if (data.titleKey) {
      KEYS.push(data.titleKey);
    }
    if (data.descriptionKey) {
      KEYS.push(data.descriptionKey);
    }

    // Retrieve translations ONLY if there are keys
    let translations: Record<string, string> = {};
    if (KEYS.length > NULL) {
      translations = await firstValueFrom(this.translate.get(KEYS));
    }

    // Extracting values
    const TITLE = data.titleKey ? translations[data.titleKey] : null;
    const DESCRIPTION = data.descriptionKey ? translations[data.descriptionKey] : null;

    if (TITLE) {
      this.title.setTitle(TITLE);
      this.meta.updateTag({ property: 'og:title', content: TITLE });
    }

    if (DESCRIPTION) {
      this.meta.updateTag({ name: 'description', content: DESCRIPTION });
      this.meta.updateTag({ property: 'og:description', content: DESCRIPTION });
    }

    // Systematic tags (Always updated)
    if (this.document?.documentElement) {
      this.document.documentElement.lang = this.translate.currentLang || 'fr';
    }

    this.meta.updateTag({ name: 'robots', content: data.robots || 'index, follow' });
    this.meta.updateTag({ name: 'author', content: this.config.author });
    this.meta.updateTag({ name: 'keywords', content: this.config.keywords });
    this.meta.updateTag({ name: 'theme-color', content: this.config.themeColor });

    this.meta.updateTag({ property: 'og:url', content: this.document.URL });

    if (data.type) {
      this.meta.updateTag({ property: 'og:type', content: data.type });
    }

    const IMAGE_TO_USE = data.image || this.config.defaultShareImage;
    if (IMAGE_TO_USE && IMAGE_TO_USE.trim() !== '') {
      this.meta.updateTag({ property: 'og:image', content: IMAGE_TO_USE });
      this.meta.updateTag({ name: 'twitter:image', content: IMAGE_TO_USE });
    }
  }
}
