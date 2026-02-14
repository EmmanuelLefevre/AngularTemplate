import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './translation.service';
import { Mock } from 'vitest';

describe('TranslationService', () => {

  let service: TranslationService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let translateServiceSpy: any;

  let getItemSpy: Mock;
  let setItemSpy: Mock;

  const STORAGE_KEY = 'user-lang';
  const DEFAULT_LANG = 'fr';
  const SUPPORTED_LANGS = ['fr', 'en'];

  beforeEach(() => {
    getItemSpy = vi.fn();
    setItemSpy = vi.fn();

    vi.stubGlobal('localStorage', {
      getItem: getItemSpy,
      setItem: setItemSpy,
      clear: vi.fn(),
      removeItem: vi.fn(),
      length: 0,
      key: vi.fn()
    });

    translateServiceSpy = {
      addLangs: vi.fn(),
      setFallbackLang: vi.fn(),
      use: vi.fn(),
      getBrowserLang: vi.fn(),
      getCurrentLang: vi.fn(),
      currentLang: undefined
    };

    TestBed.configureTestingModule({
      providers: [
        TranslationService,
        { provide: TranslateService, useValue: translateServiceSpy }
      ]
    });

    service = TestBed.inject(TranslationService);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initLanguage', () => {
    it('should initialize supported langs and fallback lang', () => {
      // ARRANGE
      getItemSpy.mockReturnValue(null);
      translateServiceSpy.getBrowserLang.mockReturnValue('fr');

      // ACT
      service.initLanguage();

      // ASSERT
      expect(translateServiceSpy.addLangs).toHaveBeenCalledWith(SUPPORTED_LANGS);
      expect(translateServiceSpy.setFallbackLang).toHaveBeenCalledWith(DEFAULT_LANG);
    });

    it('should prioritize LocalStorage and NOT call setItem if a valid lang already exists', () => {
      // ARRANGE
      getItemSpy.mockReturnValue('en');

      // ACT
      service.initLanguage();

      // ASSERT
      expect(getItemSpy).toHaveBeenCalledWith(STORAGE_KEY);
      expect(translateServiceSpy.use).toHaveBeenCalledWith('en');
      expect(setItemSpy).not.toHaveBeenCalled();
    });

    it('should prioritize LocalStorage language if supported', () => {
      // ARRANGE
      vi.spyOn(localStorage, 'getItem').mockReturnValue('en');
      translateServiceSpy.getBrowserLang.mockReturnValue('fr');

      // ACT
      service.initLanguage();

      // ASSERT
      expect(localStorage.getItem).toHaveBeenCalledWith(STORAGE_KEY);
      expect(translateServiceSpy.use).toHaveBeenCalledWith('en');
    });

    it('should use Browser language if LocalStorage is empty but Browser lang is supported', () => {
      // ARRANGE
      vi.spyOn(localStorage, 'getItem').mockReturnValue(null);
      translateServiceSpy.getBrowserLang.mockReturnValue('en');

      // ACT
      service.initLanguage();

      // ASSERT
      expect(translateServiceSpy.use).toHaveBeenCalledWith('en');
    });

    it('should use Default language if LocalStorage is empty and Browser lang is unsupported', () => {
      // ARRANGE
      vi.spyOn(localStorage, 'getItem').mockReturnValue(null);
      translateServiceSpy.getBrowserLang.mockReturnValue('de');

      // ACT
      service.initLanguage();

      // ASSERT
      expect(translateServiceSpy.use).toHaveBeenCalledWith(DEFAULT_LANG);
    });

    it('should ignore LocalStorage if the value is not supported', () => {
      // ARRANGE
      vi.spyOn(localStorage, 'getItem').mockReturnValue('ru');
      translateServiceSpy.getBrowserLang.mockReturnValue('en');

      // ACT
      service.initLanguage();

      // ASSERT
      expect(translateServiceSpy.use).toHaveBeenCalledWith('en');
    });
  });

  describe('setLanguage', () => {
    it('should change language and save to localStorage if supported', () => {
      // ACT
      service.setLanguage('en');

      // ASSERT
      expect(translateServiceSpy.use).toHaveBeenCalledWith('en');
      expect(localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, 'en');
    });

    it('should DO NOTHING if language is not supported', () => {
      // ACT
      service.setLanguage('jp');

      // ASSERT
      expect(translateServiceSpy.use).not.toHaveBeenCalled();
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('getCurrentLang', () => {
    it('should return the current language from TranslateService if defined', () => {
      // ARRANGE
      translateServiceSpy.getCurrentLang.mockReturnValue('en');

      // ACT
      const lang = service.getCurrentLang();

      // ASSERT
      expect(lang).toBe('en');
    });

    it('should return the default language if TranslateService returns nothing', () => {
      // ARRANGE
      translateServiceSpy.getCurrentLang.mockReturnValue(undefined);

      // ACT
      const lang = service.getCurrentLang();

      // ASSERT
      expect(lang).toBe(DEFAULT_LANG);
    });
  });
});