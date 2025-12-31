/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { of } from 'rxjs';

import { ENVIRONMENT } from '@env/environment';
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
    'CUSTOM.TITLE': 'Ma Page',
    'CUSTOM.DESCRIPTION': 'Ma Description'
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
        { provide: TranslateService, useValue: TRANSLATE_MOCK },
        {
          provide: DOCUMENT,
          useValue: {
            documentElement: { lang: 'fr' },
            URL: 'http://localhost:3000/'
          }
        }
      ]
    });

    service = TestBed.inject(SeoService);

    vi.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update tags from environment configuration', async() => {
    // Arrange
    const DATA: SeoData = { titleKey: 'CUSTOM.TITLE' };

    // Act
    await service.updateMetaTags(DATA);

    // Assert
    expect(META_MOCK.updateTag).toHaveBeenCalledWith({
      name: 'author',
      content: ENVIRONMENT.application.author
    });
  });

  it('should update tags with translated values', async() => {
    // Arrange
    const DATA: SeoData = {
      titleKey: 'CUSTOM.TITLE',
      descriptionKey: 'CUSTOM.DESCRIPTION'
    };

    // Act
    await service.updateMetaTags(DATA);

    // Assert
    expect(TITLE_MOCK.setTitle).toHaveBeenCalledWith('Ma Page');
    expect(META_MOCK.updateTag).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'description', content: 'Ma Description' })
    );
    expect(META_MOCK.updateTag).toHaveBeenCalledWith(
      expect.objectContaining({ property: 'og:title', content: 'Ma Page' })
    );
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

  it('should update tags from environment configuration', async() => {
    // Arrange
    const DATA: SeoData = { titleKey: 'CUSTOM.TITLE' };

    // Act
    await service.updateMetaTags(DATA);

    // Assert
    expect(META_MOCK.updateTag).toHaveBeenCalledWith({
      name: 'author',
      content: ENVIRONMENT.application.author
    });
    expect(META_MOCK.updateTag).toHaveBeenCalledWith({
      name: 'keywords',
      content: ENVIRONMENT.application.keywords
    });
  });

  it('should update open graph type when provided', async() => {
    // --- Arrange ---
    const DATA: SeoData = { type: 'article' };

    // --- Act ---
    await service.updateMetaTags(DATA);

    // --- Assert ---
    expect(META_MOCK.updateTag).toHaveBeenCalledWith(
      expect.objectContaining({
        property: 'og:type',
        content: 'article'
      })
    );
  });

  it('should update og:image when provided', async() => {
    // Arrange
    const DATA: SeoData = { image: 'https://test.com/image.jpg' };

    // Act
    await service.updateMetaTags(DATA);

    // Assert
    expect(META_MOCK.updateTag).toHaveBeenCalledWith({
      property: 'og:image',
      content: 'https://test.com/image.jpg'
    });
  });

  it('should update the document language attribute based on current language', async() => {
    // --- Arrange ---
    const DOC = TestBed.inject(DOCUMENT);
    const TRANSLATE = TestBed.inject(TranslateService);

    (TRANSLATE as any).currentLang = 'en';

    // --- Act ---
    await service.updateMetaTags({});

    // --- Assert ---
    expect(DOC.documentElement.lang).toBe('en');
  });

  it('should fallback to fr if currentLang is undefined', async() => {
    // --- Arrange ---
    const DOC = TestBed.inject(DOCUMENT);
    const TRANSLATE = TestBed.inject(TranslateService);

    (TRANSLATE as any).currentLang = '';

    // --- Act ---
    await service.updateMetaTags({});

    // --- Assert ---
    expect(DOC.documentElement.lang).toBe('fr');
  });

  it('should handle missing documentElement gracefully', async() => {
    // --- Arrange ---
    const TRANSLATE_MOCK: Partial<TranslateService> = {
      get: () => of({}),
      onLangChange: of({ lang: 'fr', translations: {} }) as any,
      currentLang: 'fr'
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        SeoService,
        { provide: Meta, useValue: META_MOCK },
        { provide: Title, useValue: TITLE_MOCK },
        { provide: TranslateService, useValue: TRANSLATE_MOCK },
        { provide: DOCUMENT, useValue: { URL: 'http://localhost' } }
      ]
    });

    const LOCAL_SERVICE = TestBed.inject(SeoService);

    // --- Act & Assert ---
    await expect(LOCAL_SERVICE.updateMetaTags({})).resolves.not.toThrow();
  });
});
