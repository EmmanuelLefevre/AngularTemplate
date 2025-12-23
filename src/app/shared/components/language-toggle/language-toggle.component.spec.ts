/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { LanguageToggleComponent } from './language-toggle.component';

import { of, Subject } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('LanguageToggleComponent', () => {
  let component: LanguageToggleComponent;
  let fixture: ComponentFixture<LanguageToggleComponent>;

  let translateService: TranslateService;

  let langChangeSubject: Subject<any>;

  beforeEach(async () => {
    langChangeSubject = new Subject<any>();

    await TestBed.configureTestingModule({
      imports: [
        LanguageToggleComponent,
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);

    vi.spyOn(translateService, 'onLangChange', 'get').mockReturnValue(langChangeSubject as any);
    vi.spyOn(translateService, 'onTranslationChange', 'get').mockReturnValue(new Subject() as any);
    vi.spyOn(translateService, 'onDefaultLangChange', 'get').mockReturnValue(new Subject() as any);

    vi.spyOn(translateService, 'getFallbackLang').mockReturnValue('fr');
    vi.spyOn(translateService, 'use').mockReturnValue(of({}));

    fixture = TestBed.createComponent(LanguageToggleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have initial language from fallback', () => {
    fixture.detectChanges();
    expect(component.currentLang()).toBe('fr');
  });

  it('should call translate.use when switchLanguage is called', () => {
    // --- ARRANGE ---
    fixture.detectChanges();

    // --- ACT ---
    component.switchLanguage('es');

    // --- ASSERT ---
    expect(translateService.use).toHaveBeenCalledWith('es');
  });

  it('should update currentLang signal when language changes', () => {
    // --- ARRANGE ---
    fixture.detectChanges();

    // --- ACT ---
    langChangeSubject.next({ lang: 'en', translations: {} });
    fixture.detectChanges();

    // --- ASSERT ---
    expect(component.currentLang()).toBe('en');
  });
});
