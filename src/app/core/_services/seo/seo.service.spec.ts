import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { SeoService } from './seo.service';
import { SeoData } from '@core/_models/seo/seo.model';

describe('SeoService', () => {

  let service: SeoService;

  const META_MOCK = {
    updateTag: vi.fn(),
    getTag: vi.fn()
  };

  const TITLE_MOCK = {
    setTitle: vi.fn()
  };

  const MOCK_TRANSLATIONS: Record<string, string> = {
    'SEO.DEFAULT_TITLE': 'Titre par défaut',
    'SEO.DEFAULT_DESCRIPTION': 'Description par défaut',
    'CUSTOM.TITLE': 'Ma Page',
    'CUSTOM.DESC': 'Ma Description'
  };

  beforeEach(() => {
    const TRANSLATE_MOCK = {
      get: vi.fn(() => of(MOCK_TRANSLATIONS)),
      currentLang: 'fr',
      onLangChange: of({ lang: 'fr' })
    };

    TestBed.configureTestingModule({
      providers: [
        SeoService,
        { provide: Meta, useValue: META_MOCK },
        { provide: Title, useValue: TITLE_MOCK },
        { provide: TranslateService, useValue: TRANSLATE_MOCK }
      ]
    });

    service = TestBed.inject(SeoService);

    vi.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update tags with translated values', async() => {
    // Arrange
    const DATA: SeoData = {
      titleKey: 'CUSTOM.TITLE',
      descriptionKey: 'CUSTOM.DESC'
    };

    // Act
    await service.updateMetaTags(DATA);

    // Assert
    expect(TITLE_MOCK.setTitle).toHaveBeenCalledWith('Ma Page');
    expect(META_MOCK.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: 'Ma Description'
    });
  });

  it('should use default robots value when not provided', async() => {
    // Arrange
    const DATA: SeoData = {};

    // Act
    await service.updateMetaTags(DATA);

    // Assert
    expect(META_MOCK.updateTag).toHaveBeenCalledWith({
      name: 'robots',
      content: 'index, follow'
    });
  });

  it('should use specific robots value for error pages', async() => {
    // Arrange
    const DATA: SeoData = { robots: 'noindex, nofollow' };

    // Act
    await service.updateMetaTags(DATA);

    // Assert
    expect(META_MOCK.updateTag).toHaveBeenCalledWith({
      name: 'robots',
      content: 'noindex, nofollow'
    });
  });

  // it('should update open graph type when provided', async() => {
  //   // --- Arrange ---
  //   const DATA: SeoData = { type: 'article' };

  //   // --- Act ---
  //   await service.updateMetaTags(DATA);

  //   // --- Assert ---
  //   expect(META_MOCK.updateTag).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       property: 'og:type',
  //       content: 'article'
  //     })
  //   );
  // });
});
