/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { of } from 'rxjs';

import { ENVIRONMENT } from '@env/environment';
import { SeoService } from './seo.service';
import { SeoData } from '@core/_models/seo/seo.model';

const NULL = 0;

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
    // --- ARRANGE ---
    const DATA: SeoData = { titleKey: 'CUSTOM.TITLE' };

    // --- ACT ---
    await service.updateMetaTags(DATA);

    // --- ASSERT ---
    expect(META_MOCK.updateTag).toHaveBeenCalledWith({
      name: 'author',
      content: ENVIRONMENT.application.author
    });
  });

  it('should update tags with translated values', async() => {
    // --- ARRANGE ---
    const DATA: SeoData = {
      titleKey: 'CUSTOM.TITLE',
      descriptionKey: 'CUSTOM.DESCRIPTION'
    };

    // --- ACT ---
    await service.updateMetaTags(DATA);

    // --- ASSERT ---
    expect(TITLE_MOCK.setTitle).toHaveBeenCalledWith('Ma Page');
    expect(META_MOCK.updateTag).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'description', content: 'Ma Description' })
    );
    expect(META_MOCK.updateTag).toHaveBeenCalledWith(
      expect.objectContaining({ property: 'og:title', content: 'Ma Page' })
    );
  });

  it('should use default robots value when not provided', async() => {
    // --- ARRANGE ---
    const DATA: SeoData = {};

    // --- ACT ---
    await service.updateMetaTags(DATA);

    // --- ASSERT ---
    expect(META_MOCK.updateTag).toHaveBeenCalledWith({
      name: 'robots',
      content: 'index, follow'
    });
  });

  it('should use default robots value when not provided', async() => {
    // --- ARRANGE ---
    const DATA: SeoData = {};

    // --- ACT ---
    await service.updateMetaTags(DATA);

    // --- ASSERT ---
    expect(META_MOCK.updateTag).toHaveBeenCalledWith({
      name: 'robots',
      content: 'index, follow'
    });
  });

  it('should use specific robots value for error pages', async() => {
    // --- ARRANGE ---
    const DATA: SeoData = { robots: 'noindex, nofollow' };

    // --- ACT ---
    await service.updateMetaTags(DATA);

    // --- ASSERT ---
    expect(META_MOCK.updateTag).toHaveBeenCalledWith({
      name: 'robots',
      content: 'noindex, nofollow'
    });
  });

  it('should update tags from environment configuration', async() => {
    // --- ARRANGE ---
    const DATA: SeoData = { titleKey: 'CUSTOM.TITLE' };

    // --- ACT ---
    await service.updateMetaTags(DATA);

    // --- ASSERT ---
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
    // --- ARRANGE ---
    const DATA: SeoData = { image: 'https://test.com/image.jpg' };

    // --- ACT ---
    await service.updateMetaTags(DATA);

    // --- ASSERT ---
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

    // --- ACT ---
    await service.updateMetaTags({});

    // --- ASSERT ---
    expect(DOC.documentElement.lang).toBe('en');
  });

  it('should fallback to fr if currentLang is undefined', async() => {
    // --- ARRANGE ---
    const DOC = TestBed.inject(DOCUMENT);
    const TRANSLATE = TestBed.inject(TranslateService);

    (TRANSLATE as any).currentLang = '';

    // --- ACT ---
    await service.updateMetaTags({});

    // --- ASSERT ---
    expect(DOC.documentElement.lang).toBe('fr');
  });

  it('should handle missing documentElement gracefully', async() => {
    // --- ARRANGE ---
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

    // --- ACT & ASSERT ---
    await expect(LOCAL_SERVICE.updateMetaTags({})).resolves.not.toThrow();
  });

  it('should use the environment default image if no image is provided in data', async() => {
    // --- ARRANGE ---
    const DATA: SeoData = {};

    // --- ACT ---
    await service.updateMetaTags(DATA);

    // --- ASSERT ---
    expect(META_MOCK.updateTag).toHaveBeenCalledWith({
      property: 'og:image',
      content: ENVIRONMENT.application.defaultShareImage
    });
  });

  it('should update og:image when an image is provided in data', async() => {
    // --- ARRANGE ---
    const MOCK_IMAGE = 'https://test.com/image.jpg';
    const DATA: SeoData = { image: MOCK_IMAGE };

    // --- ACT ---
    await service.updateMetaTags(DATA);

    // --- ASSERT ---
    expect(META_MOCK.updateTag).toHaveBeenCalledWith({
      property: 'og:image',
      content: MOCK_IMAGE
    });
  });

  it('should NOT update og:image if no image is provided and default is empty', async() => {
    // --- ARRANGE ---
    (service as any).config.defaultShareImage = '';

    const DATA: SeoData = { image: undefined };

    // --- ACT ---
    await service.updateMetaTags(DATA);

    // --- ASSERT ---
    const OG_IMAGE_CALLS = META_MOCK.updateTag.mock.calls.filter(call =>
      call[NULL].property === 'og:image'
    );

    expect(OG_IMAGE_CALLS.length).toBe(NULL);
  });
});
