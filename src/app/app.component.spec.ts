import { TestBed } from '@angular/core/testing';
import { provideRouter, RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { describe, it, expect, beforeEach } from 'vitest';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let translateService: TranslateService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        TranslateModule.forRoot({
          fallbackLang: 'fr'
        })
      ],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
  });

  it('should create the app', () => {
    // --- ACT ---
    const FIXTURE = TestBed.createComponent(AppComponent);
    const APP = FIXTURE.componentInstance;

    // --- ASSERT ---
    expect(APP).toBeTruthy();
  });

  it('should have a router outlet', () => {
    // --- ARRANGE ---
    const FIXTURE = TestBed.createComponent(AppComponent);

    // --- ACT ---
    FIXTURE.detectChanges();

    // --- ASSERT ---
    const OUTLET = FIXTURE.debugElement.query(By.directive(RouterOutlet));
    expect(OUTLET).toBeTruthy();
  });

  it('should have the correct title in the signal', () => {
    // --- ARRANGE ---
    const FIXTURE = TestBed.createComponent(AppComponent);
    const APP = FIXTURE.componentInstance;

    // --- ASSERT ---
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((APP as any).title()).toBe('AngularTemplate');
  });

  it('should use "fr" if browser language is not fr or en (Coverage 100%)', () => {
    // --- ARRANGE ---
    vi.spyOn(translateService, 'getBrowserLang').mockReturnValue('de');

    // --- ACT ---
    const FIXTURE = TestBed.createComponent(AppComponent);
    FIXTURE.detectChanges();

    // --- ASSERT ---
    expect(translateService.currentLang).toBe('fr');
  });
});
