import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MaintenanceErrorComponent } from './maintenance-error.component';

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

describe('MaintenanceErrorComponent', () => {

  let component: MaintenanceErrorComponent;
  let fixture: ComponentFixture<MaintenanceErrorComponent>;
  let translate: TranslateService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        MaintenanceErrorComponent,
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    translate = TestBed.inject(TranslateService);

    translate.setTranslation('fr', {
      'PAGES': {
        'ERROR': {
          'MAINTENANCE': {
            'TITLE': 'Casques obligatoires !',
            'SUBTITLE': 'On laisse sécher le code et on revient vite...',
            'IMG.ALT.MAINTENANCE': 'Une équipe technique s\'affairant autour d\'un écran en maintenance'
          }
        }
      }
    });
    translate.setTranslation('en', {
      'PAGES': {
        'ERROR': {
          'MAINTENANCE': {
            'TITLE': 'Helmets are needed !',
            'SUBTITLE': 'We\'ll let the code dry and we\'ll be back soon...',
            'IMG.ALT.MAINTENANCE': 'A technical team working on a screen undergoing maintenance'
          }
        }
      }
    });
    translate.use('fr');

    fixture = TestBed.createComponent(MaintenanceErrorComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('UI & Media Rendering', () => {
    it('should render the maintenance animation canvas correctly', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      const lottieAnim = fixture.debugElement.query(By.css('.maintenance-error__lottie')).nativeElement;

      // --- ASSERT ---
      expect(lottieAnim.tagName.toLowerCase()).toBe('canvas');
      expect(lottieAnim.getAttribute('aria-label')).toBe('Une équipe technique s\'affairant autour d\'un écran en maintenance');
    });
  });

  describe('Internationalization (i18n)', () => {
    it('should display the default French translations on init', () => {
      // --- ACT ---
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('.maintenance-error__title')).nativeElement;
      const subtitle = fixture.debugElement.query(By.css('.maintenance-error__subtitle')).nativeElement;

      // --- ASSERT ---
      expect(title.textContent.trim()).toBe('Casques obligatoires !');
      expect(subtitle.textContent.trim()).toBe('On laisse sécher le code et on revient vite...');
    });

    it('should update texts when language is switched to English', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      translate.use('en');
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('.maintenance-error__title')).nativeElement;
      const subtitle = fixture.debugElement.query(By.css('.maintenance-error__subtitle')).nativeElement;

      // --- ASSERT ---
      expect(title.textContent.trim()).toBe('Helmets are needed !');
      expect(subtitle.textContent.trim()).toBe('We\'ll let the code dry and we\'ll be back soon...');
    });

    it('should update the img aria-label when language is switched to English', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      translate.use('en');
      fixture.detectChanges();

      const lottieAnim = fixture.debugElement.query(By.css('.maintenance-error__lottie')).nativeElement;

      // --- ASSERT ---
      expect(lottieAnim.getAttribute('aria-label')).toBe('A technical team working on a screen undergoing maintenance');
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

      const section = fixture.debugElement.query(By.css('.maintenance-error')).nativeElement;
      expect(section.classList.contains('is-ready')).toBe(true);
    });
  });

  describe('Lottie Configuration', () => {
    it('should fallback to DEFAULT_PIXEL_RATIO if window.devicePixelRatio is undefined', () => {
      // --- ARRANGE ---
      const originalPixelRatio = window.devicePixelRatio;

      Object.defineProperty(window, 'devicePixelRatio', {
        value: undefined,
        writable: true
      });

      // --- ACT ---
      fixture = TestBed.createComponent(MaintenanceErrorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      // --- ASSERT ---
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lottieInstance = (component as any).dotLottieInstance;
      expect(lottieInstance).toBeDefined();

      // --- CLEANUP ---
      Object.defineProperty(window, 'devicePixelRatio', {
        value: originalPixelRatio,
        writable: true
      });
    });
  });
});
