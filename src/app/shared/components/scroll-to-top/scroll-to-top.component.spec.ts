/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { ScrollToTopComponent } from './scroll-to-top.component';

const SCROLL_SUFFICIENT = 100;
const INSUFFICIENT_SCROLL = 10;
const RESTORE_SCROLL = 0;
const VIEWPORT_HEIGHT = 800;

describe('ScrollToTopComponent', () => {

  let component: ScrollToTopComponent;
  let fixture: ComponentFixture<ScrollToTopComponent>;

  let translateService: TranslateService;

  beforeEach(async(): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        ScrollToTopComponent,
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollToTopComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);

    vi.spyOn(translateService, 'get').mockImplementation(
      (key: string | string[]): Observable<string | object> => of(key)
    );
    vi.spyOn(translateService, 'stream').mockImplementation(
      (key: string | string[]): Observable<string | object> => of(key)
    );
    vi.spyOn(translateService, 'getFallbackLang').mockReturnValue('fr');

    vi.stubGlobal('innerHeight', VIEWPORT_HEIGHT);

    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the FontAwesome icon', () => {
    // --- ACT ---
    const ICON = fixture.debugElement.query(By.css('fa-icon'));

    // --- ASSERT ---
    expect(ICON).toBeTruthy();
    expect(component.faAngleDoubleUp).toBeDefined();
  });

  describe('Dynamic Visibility Logic', () => {
    it('should show the button only when scroll exceeds viewport height', () => {
      // --- ARRANGE & ACT (Step 1: Insufficient) ---
      setScrollPosition(INSUFFICIENT_SCROLL);
      component.onWindowScroll();
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.showScroll()).toBe(false);

      // --- ACT (Step 2: Sufficient) ---
      setScrollPosition(SCROLL_SUFFICIENT);
      component.onWindowScroll();
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.showScroll()).toBe(true);

      // --- ASSERT ---
      const BUTTON = fixture.debugElement.query(By.css('.scroll-top--visible'));
      expect(BUTTON).toBeTruthy();

      // --- ACT (Step 3: Restore/Back to top) ---
      setScrollPosition(RESTORE_SCROLL);

      component.onWindowScroll();
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.showScroll()).toBe(false);
    });

    it('should handle fallback scroll', () => {
      // --- ARRANGE ---
      vi.spyOn(window, 'scrollY', 'get').mockReturnValue(undefined as any);
      vi.spyOn(window, 'pageYOffset', 'get').mockReturnValue(undefined as any);

      const DOC = TestBed.inject(DOCUMENT);
      vi.spyOn(DOC.documentElement, 'scrollTop', 'get').mockReturnValue(SCROLL_SUFFICIENT);

      // --- ACT ---
      component.onWindowScroll();

      // --- ASSERT ---
      expect(component.showScroll()).toBe(true);
    });

    it('should not update signal if state is already correct', () => {
      // --- ARRANGE ---
      setScrollPosition(SCROLL_SUFFICIENT);
      component.onWindowScroll();

      const SPY = vi.spyOn(component.showScroll, 'set');

      // --- ACT ---
      component.onWindowScroll();

      // --- ASSERT ---
      expect(SPY).not.toHaveBeenCalled();
    });
  });

  describe('Action Logic', () => {
    it('should call window.scrollTo when button is clicked', async(): Promise<void> => {
      // --- ARRANGE ---
      const SCROLL_SPY = vi.spyOn(window, 'scrollTo').mockImplementation((): void => {
        return;
      });

      component.showScroll.set(true);

      fixture.detectChanges();
      await fixture.whenStable();

      // --- ACT ---
      const BUTTON = fixture.debugElement.query(By.css('.scroll-top'));
      BUTTON.nativeElement.click();

      // --- ASSERT ---
      expect(SCROLL_SPY).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth'
      });

      SCROLL_SPY.mockRestore();
    });

    it('should scroll to top when clicked', () => {
      // --- ARRANGE ---
      const SCROLL_SPY = vi.spyOn(window, 'scrollTo').mockImplementation((): void => {
        return undefined;
      });

      // --- ACT ---
      component.scrollToTop();

      // --- ASSERT ---
      expect(SCROLL_SPY).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });
  });

  describe('Accessibility & Translation', () => {
    it('should have the correct translated aria-label', async(): Promise<void> => {
      // --- ARRANGE ---
      const EXPECTED_ARIA = 'UI_COMPONENTS.SCROLL_TO_TOP.ARIA';

      fixture.detectChanges();
      await fixture.whenStable();

      // --- ACT ---
      const BUTTON = fixture.debugElement.query(By.css('.scroll-top')).nativeElement;

      // --- ASSERT ---
      expect(BUTTON.getAttribute('aria-label')).toBe(EXPECTED_ARIA);
    });
  });

  /**
   * Helper to simulate scroll position in JS DOM
   */
  function setScrollPosition(value: number): void {
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(value);
    vi.spyOn(window, 'pageYOffset', 'get').mockReturnValue(value);

    const DOC = TestBed.inject(DOCUMENT);

    vi.spyOn(DOC.documentElement, 'scrollTop', 'get').mockReturnValue(value);
    vi.spyOn(DOC.body, 'scrollTop', 'get').mockReturnValue(value);
  }
});
