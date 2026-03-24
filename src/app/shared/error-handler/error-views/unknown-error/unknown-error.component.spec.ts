import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { UnknownErrorComponent } from './unknown-error.component';

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
            'TITLE': 'Houston, we have a problem!',
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
    it('should render the UFO animation correctly', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      const lottieAnim = fixture.debugElement.query(By.css('.unknown-error__lottie')).nativeElement;

      // --- ASSERT ---
      expect(lottieAnim.getAttribute('src')).toBe('assets/animations/unknown-error-abduction.lottie');
      expect(lottieAnim.getAttribute('aria-label')).toBe('Une soucoupe volante aspirant une chenille');
    });

    it('should render the Lottie animation correctly', () => {
      fixture.detectChanges();

      const lottiePlayer = fixture.debugElement.query(By.css('dotlottie-wc'));

      if (lottiePlayer) {
        expect(lottiePlayer.nativeElement.getAttribute('src')).toContain('unknown-error-abduction.lottie');
      }
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
      expect(title.textContent.trim()).toBe('Houston, we have a problem!');
      expect(subtitle.textContent.trim()).toBe('It seems this page took a leap through spacetime...');
    });
  });
});
