/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-magic-numbers */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, NavigationStart, NavigationEnd, NavigationError, Event as RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {

  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let routerEventsSubject: Subject<RouterEvent>;
  let translate: TranslateService;

  beforeEach(async() => {
    routerEventsSubject = new Subject<RouterEvent>();
    const mockRouter = {
      events: routerEventsSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      imports: [
        LoaderComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    translate = TestBed.inject(TranslateService);

    translate.setTranslation('en', {
      'UI.LOADER.ARIA': 'Page loading in progress'
    });
    translate.use('en');

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('Initialization', () => {
    it('should create the component with initial state', () => {
      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component).toBeTruthy();
      expect((component as any).isLoading()).toBe(false);
    });
  });

  describe('Internationalization & Accessibility', () => {
    it('should render the translated aria-label when loading', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      (component as any).isLoading.set(true);

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      const loaderElement = fixture.debugElement.query(By.css('.loader')).nativeElement;

      expect(loaderElement.tagName.toLowerCase()).toBe('output');
      expect(loaderElement.getAttribute('aria-label')).toBe('Page loading in progress');
    });

    it('should render the FontAwesome leaf icon properly hidden from screen readers', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      (component as any).isLoading.set(true);
      fixture.detectChanges();

      // --- ACT ---
      const iconElement = fixture.debugElement.query(By.css('fa-icon'));

      // --- ASSERT ---
      expect(iconElement).toBeTruthy();
      expect(iconElement.nativeElement.getAttribute('aria-hidden')).toBe('true');
      expect((component as any).icon.iconName).toBe('leaf');
    });
  });

  describe('Routing Events Logic', () => {
    it('should activate the loader on NavigationStart', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      routerEventsSubject.next(new NavigationStart(1, '/home'));

      // --- ASSERT ---
      expect((component as any).isLoading()).toBe(true);
    });

    it('should deactivate the loader after 300ms on NavigationEnd', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      routerEventsSubject.next(new NavigationStart(1, '/home'));
      expect((component as any).isLoading()).toBe(true);

      // --- ACT ---
      routerEventsSubject.next(new NavigationEnd(1, '/home', '/home'));

      // --- ASSERT ---
      expect((component as any).isLoading()).toBe(true);

      vi.advanceTimersByTime(500);

      expect((component as any).isLoading()).toBe(false);
    });

    it('should deactivate the loader after 300ms on NavigationError to prevent infinite blocking', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      routerEventsSubject.next(new NavigationStart(1, '/home'));
      expect((component as any).isLoading()).toBe(true);

      // --- ACT ---
      routerEventsSubject.next(new NavigationError(1, '/home', 'Error 500'));
      vi.advanceTimersByTime(500);

      // --- ASSERT ---
      expect((component as any).isLoading()).toBe(false);
    });
  });
});
