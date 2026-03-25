import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { UnknownErrorComponent } from './unknown-error.component';

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

describe('UnknownErrorComponent', () => {

  let component: UnknownErrorComponent;
  let fixture: ComponentFixture<UnknownErrorComponent>;
  let translate: TranslateService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        UnknownErrorComponent,
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    translate = TestBed.inject(TranslateService);

    translate.setTranslation('fr', {
      'PAGES': {
        'ERROR': {
          'UNKNOWN': {
            'TITLE': 'Houston, on a un problème !',
            'SUBTITLE': 'Il semblerait que cette page ait fait un saut dans l\'espace-temps...',
            'IMG.ALT.ABDUCTION': 'Une soucoupe volante aspirant une chenille'
          }
        }
      }
    });
    translate.setTranslation('en', {
      'PAGES': {
        'ERROR': {
          'UNKNOWN': {
            'TITLE': 'Houston, we have a problem !',
            'SUBTITLE': 'It seems this page took a leap through spacetime...',
            'IMG.ALT.ABDUCTION': 'A flying saucer abducting a caterpillar'
          }
        }
      }
    });
    translate.use('fr');

    fixture = TestBed.createComponent(UnknownErrorComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('UI & Media Rendering', () => {
    it('should render the UFO animation canvas correctly', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      const canvas = fixture.debugElement.query(By.css('.unknown-error__lottie')).nativeElement;
      const srOnlySpan = fixture.debugElement.query(By.css('.sr-only')).nativeElement;

      // --- ASSERT ---
      expect(canvas.tagName.toLowerCase()).toBe('canvas');
      expect(srOnlySpan.textContent.trim()).toBe('Une soucoupe volante aspirant une chenille');
      expect(canvas.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Internationalization (i18n)', () => {
    it('should display the default French translations on init', () => {
      // --- ACT ---
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('.unknown-error__title')).nativeElement;
      const subtitle = fixture.debugElement.query(By.css('.unknown-error__subtitle')).nativeElement;

      // --- ASSERT ---
      expect(title.textContent.trim()).toBe('Houston, on a un problème !');
      expect(subtitle.textContent.trim()).toBe('Il semblerait que cette page ait fait un saut dans l\'espace-temps...');
    });

    it('should update texts when language is switched to English', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      translate.use('en');
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('.unknown-error__title')).nativeElement;
      const subtitle = fixture.debugElement.query(By.css('.unknown-error__subtitle')).nativeElement;

      // --- ASSERT ---
      expect(title.textContent.trim()).toBe('Houston, we have a problem !');
      expect(subtitle.textContent.trim()).toBe('It seems this page took a leap through spacetime...');
    });

    it('should update the img description when language is switched to English', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      translate.use('en');
      fixture.detectChanges();

      const srOnlySpan = fixture.debugElement.query(By.css('.sr-only')).nativeElement;

      // --- ASSERT ---
      expect(srOnlySpan.textContent.trim()).toBe('A flying saucer abducting a caterpillar');
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

      const section = fixture.debugElement.query(By.css('.unknown-error')).nativeElement;
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
      fixture = TestBed.createComponent(UnknownErrorComponent);
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
