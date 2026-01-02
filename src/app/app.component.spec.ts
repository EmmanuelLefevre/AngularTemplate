/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';

import { AppComponent } from './app.component';
import { AuthService } from '@core/_services/auth/auth.service';
import { SeoService } from '@core/_services/seo/seo.service';

const NAV_ID = 1;
const NULL = 0;

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let translateService: TranslateService;
  let authServiceMock: any;
  let seoServiceMock: any;
  let routerEventsSubject: Subject<any>;

  beforeEach(async() => {

    authServiceMock = { initAuth: vi.fn() };
    seoServiceMock = { updateMetaTags: vi.fn() };
    routerEventsSubject = new Subject<any>();

    const ROUTER_MOCK = {
      events: routerEventsSubject.asObservable(),
    };

    const ACTIVATED_ROUTE_MOCK = {
      firstChild: {
        firstChild: {
          snapshot: { data: { seo: { titleKey: 'NESTED_TITLE' } } },
          firstChild: null
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: SeoService, useValue: seoServiceMock },
        { provide: Router, useValue: ROUTER_MOCK },
        { provide: ActivatedRoute, useValue: ACTIVATED_ROUTE_MOCK }
      ]
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.getCurrentLang();
  });

  it('should create the app', () => {
    // --- ACT ---
    const FIXTURE = TestBed.createComponent(AppComponent);
    const APP = FIXTURE.componentInstance;

    // --- ASSERT ---
    expect(APP).toBeTruthy();
  });

  it('should create the app and init auth', () => {
    // --- ACT ---
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // --- ASSERT ---
    expect(component).toBeTruthy();
    expect(authServiceMock.initAuth).toHaveBeenCalled();
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

  it('should update SEO on NavigationEnd', () => {
    // --- ARRANGE ---
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    // --- ACT ---
    routerEventsSubject.next(new NavigationEnd(NAV_ID, '/home', '/home'));

    // --- ASSERT ---
    expect(seoServiceMock.updateMetaTags).toHaveBeenCalledWith({ titleKey: 'NESTED_TITLE' });
  });

  it('should update SEO when language is changed', () => {
    // --- ARRANGE ---
    const LANG_CHANGE_SUBJECT = new Subject<any>();

    vi.spyOn(translateService, 'onLangChange', 'get').mockReturnValue(LANG_CHANGE_SUBJECT as any);

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const LANG_CHANGE_EVENT = {
      lang: 'en',
      translations: {}
    };

    // --- ACT ---
    LANG_CHANGE_SUBJECT.next(LANG_CHANGE_EVENT);

    // --- ASSERT ---
    expect(seoServiceMock.updateMetaTags).toHaveBeenCalled();
  });

  it('should use "en" if browser language is "en"', () => {
    // --- ARRANGE ---
    vi.spyOn(translateService, 'getBrowserLang').mockReturnValue('en');
    const SPY_USE = vi.spyOn(translateService, 'use');

    // --- ACT ---
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    // --- ASSERT ---
    expect(SPY_USE).toHaveBeenCalledWith('en');
  });

  it('should use "fr" if browser language is something else', () => {
    // --- ARRANGE ---
    vi.spyOn(translateService, 'getBrowserLang').mockReturnValue('de');
    const SPY_USE = vi.spyOn(translateService, 'use');

    // --- ACT ---
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    // --- ASSERT ---
    expect(SPY_USE).toHaveBeenCalledWith('fr');
  });

  it('should handle route without data gracefully', () => {
    // --- ARRANGE ---
    const EMPTY_ROUTE_MOCK = { firstChild: null };
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      imports: [AppComponent, TranslateModule.forRoot()],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: SeoService, useValue: seoServiceMock },
        { provide: Router, useValue: { events: of(new NavigationEnd(NAV_ID, '', '')) } },
        { provide: ActivatedRoute, useValue: EMPTY_ROUTE_MOCK }
      ]
    });

    // --- ACT ---
    const EMPTY_FICTURE = TestBed.createComponent(AppComponent);
    EMPTY_FICTURE.detectChanges();

    // --- ASSERT ---
    expect(seoServiceMock.updateMetaTags).toHaveBeenCalledWith(undefined);
  });

  it('should scroll to top of window on NavigationEnd', () => {
    // --- ARRANGE ---
    const SCROLL_SPY = vi.spyOn(window, 'scrollTo').mockImplementation((): void => {
      return undefined;
    });

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    // --- ACT ---
    routerEventsSubject.next(new NavigationEnd(NAV_ID, '/new-page', '/new-page'));

    // --- ASSERT ---
    expect(SCROLL_SPY).toHaveBeenCalledWith(NULL, NULL);

    SCROLL_SPY.mockRestore();
  });
});
