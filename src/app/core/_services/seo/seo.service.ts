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
    const KEYS_TO_TRANSLATE: string[] = [];

    if (data.titleKey) {
      KEYS_TO_TRANSLATE.push(data.titleKey);
    }
    if (data.descriptionKey) {
      KEYS_TO_TRANSLATE.push(data.descriptionKey);
    }

    // Translation ONLY if necessary
    const TRANSLATIONS = KEYS_TO_TRANSLATE.length > NULL
      ? await firstValueFrom(this.translate.get(KEYS_TO_TRANSLATE))
      : {};

    const PAGE_TITLE = data.titleKey ? TRANSLATIONS[data.titleKey] : '';
    const DESCRIPTION = data.descriptionKey ? TRANSLATIONS[data.descriptionKey] : '';

    if (PAGE_TITLE) {
      this.title.setTitle(PAGE_TITLE);
      this.meta.updateTag({ property: 'og:title', content: PAGE_TITLE });
    }

    if (DESCRIPTION) {
      this.meta.updateTag({ name: 'description', content: DESCRIPTION });
      this.meta.updateTag({ property: 'og:description', content: DESCRIPTION });
    }

    // Tags without traduction
    this.document.documentElement.lang = this.translate.currentLang;
    this.meta.updateTag({ name: 'robots', content: data.robots || 'index, follow' });
    this.meta.updateTag({ name: 'author', content: this.config.author });
    this.meta.updateTag({ name: 'keywords', content: this.config.keywords });

    if (data.image) {
      this.meta.updateTag({ property: 'og:image', content: data.image });
    }

    this.meta.updateTag({ property: 'og:url', content: this.document.URL });
  }
}
