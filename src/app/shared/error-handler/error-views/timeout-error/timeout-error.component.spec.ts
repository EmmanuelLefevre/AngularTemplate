import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { TimeoutErrorComponent } from './timeout-error.component';

vi.mock('@lottiefiles/dotlottie-web', () => {
  return {
    DotLottie: vi.fn().mockImplementation(function() {
      let readyCallback: (() => void) | undefined;

      return {
        addEventListener: vi.fn((event: string, callback: () => void): void => {
          if (event === 'ready') {
            readyCallback = callback;
          }
        }),

        uiTriggerReady: (): void => {
          if (readyCallback) {
            readyCallback();
          }
        },
        destroy: vi.fn(),
      };
    }),
  };
});

describe('TimeoutErrorComponent', () => {

  let component: TimeoutErrorComponent;
  let fixture: ComponentFixture<TimeoutErrorComponent>;
  let translate: TranslateService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        TimeoutErrorComponent,
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    translate = TestBed.inject(TranslateService);

    translate.setTranslation('fr', {
      'PAGES': {
        'ERROR': {
          'TIMEOUT': {
            'TITLE': 'Perte de signal !',
            'SUBTITLE': 'Même la lumière met du temps à traverser l\'univers...',
            'IMG.ALT.SANDGLASS': 'Un sablier en train de tourner sur lui-même'
          }
        }
      }
    });
    translate.setTranslation('en', {
      'PAGES': {
        'ERROR': {
          'TIMEOUT': {
            'TITLE': 'Signal loss !',
            'SUBTITLE': 'Even light takes time to travel across the universe...',
            'IMG.ALT.SANDGLASS': 'A sandglass spinning on its axis'
          }
        }
      }
    });
    translate.use('fr');

    fixture = TestBed.createComponent(TimeoutErrorComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('UI & Media Rendering', () => {
    it('should render the sandglass animation canvas correctly', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      const canvas = fixture.debugElement.query(By.css('.timeout-error__lottie')).nativeElement;
      const srOnlySpan = fixture.debugElement.query(By.css('.sr-only')).nativeElement;

      // --- ASSERT ---
      expect(canvas.tagName.toLowerCase()).toBe('canvas');
      expect(srOnlySpan.textContent.trim()).toBe('Un sablier en train de tourner sur lui-même');
      expect(canvas.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Internationalization (i18n)', () => {
    it('should display the default French translations on init', () => {
      // --- ACT ---
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('.timeout-error__title')).nativeElement;
      const subtitle = fixture.debugElement.query(By.css('.timeout-error__subtitle')).nativeElement;

      // --- ASSERT ---
      expect(title.textContent.trim()).toBe('Perte de signal !');
      expect(subtitle.textContent.trim()).toBe('Même la lumière met du temps à traverser l\'univers...');
    });

    it('should update texts when language is switched to English', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      translate.use('en');
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('.timeout-error__title')).nativeElement;
      const subtitle = fixture.debugElement.query(By.css('.timeout-error__subtitle')).nativeElement;

      // --- ASSERT ---
      expect(title.textContent.trim()).toBe('Signal loss !');
      expect(subtitle.textContent.trim()).toBe('Even light takes time to travel across the universe...');
    });

    it('should update the img description when language is switched to English', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      translate.use('en');
      fixture.detectChanges();

      const srOnlySpan = fixture.debugElement.query(By.css('.sr-only')).nativeElement;

      // --- ASSERT ---
      expect(srOnlySpan.textContent.trim()).toBe('A sandglass spinning on its axis');
    });
  });

  describe('Animation Lifecycle', () => {
    it('should set isReady to true when animation is ready', () => {
      // --- ARRANGE ---
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lottieInstance = (component as any).dotLottieInstance;

      // --- ACT ---
      lottieInstance.uiTriggerReady();
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.isReady).toBe(true);

      const section = fixture.debugElement.query(By.css('.timeout-error')).nativeElement;
      expect(section.classList.contains('is-ready')).toBe(true);
    });
  });

  describe('Lottie Configuration', () => {
    it('should fallback to DEFAULT_PIXEL_RATIO if globalThis.devicePixelRatio is undefined', () => {
      // --- ARRANGE ---
      const originalPixelRatio = globalThis.devicePixelRatio;

      Object.defineProperty(globalThis, 'devicePixelRatio', {
        value: undefined,
        writable: true
      });

      // --- ACT ---
      fixture = TestBed.createComponent(TimeoutErrorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      // --- ASSERT ---
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lottieInstance = (component as any).dotLottieInstance;
      expect(lottieInstance).toBeDefined();

      // --- CLEANUP ---
      Object.defineProperty(globalThis, 'devicePixelRatio', {
        value: originalPixelRatio,
        writable: true
      });
    });
  });
});
