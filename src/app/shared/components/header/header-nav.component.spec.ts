import { provideRouter, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNavComponent } from './header-nav.component';

describe('HeaderNavComponent', () => {

  let component: HeaderNavComponent;
  let fixture: ComponentFixture<HeaderNavComponent>;
  let translateService: TranslateService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderNavComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideRouter([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderNavComponent);
    component = fixture.componentInstance;

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('fr', {
      'UI': {
        'BUTTONS': {
          'LOGO': {
            'ARIA': 'Retour à la page d\'accueil'
          },
          'MOBILE': {
            'MENU': {
              'ARIA': {
                'OPEN': 'Ouvrir le menu',
                'CLOSE': 'Fermer le menu'
              }
            }
          },
          'LOGIN': {
            'LABEL': 'Se connecter',
            'ARIA': 'Bouton pour ouvrir le formulaire de connexion'
          }
        }
      }
    });
    translateService.use('fr');

    document.body.className = '';
  });

  afterEach(() => {
    document.body.classList.remove('no-scroll');
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Menu State Management', () => {
    it('should toggle the menu signal', () => {
      // --- ACT ---
      component.toggleMenu();

      // --- ASSERT ---
      expect(component.isMenuOpen()).toBe(true);
    });

    it('should force the menu to close when closeMenu() is called', () => {
      // --- ARRANGE ---
      component.isMenuOpen.set(true);
      expect(component.isMenuOpen()).toBe(true);

      // --- ACT ---
      component.closeMenu();

      // --- ASSERT ---
      expect(component.isMenuOpen()).toBe(false);
    });
  });

  describe('DOM Side Effects', () => {
    it('should add "no-scroll" class to body when menu is opened', () => {
      // --- ACT ---
      component.isMenuOpen.set(true);
      fixture.detectChanges();

      // --- ASSERT ---
      expect(document.body.classList.contains('no-scroll')).toBe(true);
    });

    it('should remove "no-scroll" class from body when menu is closed', () => {
      // --- ARRANGE ---
      component.isMenuOpen.set(true);
      fixture.detectChanges();
      expect(document.body.classList.contains('no-scroll')).toBe(true);

      // --- ACT ---
      component.isMenuOpen.set(false);
      fixture.detectChanges();

      // --- ASSERT ---
      expect(document.body.classList.contains('no-scroll')).toBe(false);
    });
  });

  describe('Routing & Navigation', () => {
    it('should close the menu and navigate to /login when onLoginClick() is called', () => {
      // --- ARRANGE ---
      const ROUTER = TestBed.inject(Router);
      const NAVIGATE_SPY = vi.spyOn(ROUTER, 'navigate').mockImplementation(() => Promise.resolve(true));
      const CLOSE_MENU_SPY = vi.spyOn(component, 'closeMenu');

      // --- ACT ---
      component.onLoginClick();

      // --- ASSERT ---
      expect(CLOSE_MENU_SPY).toHaveBeenCalled();
      expect(NAVIGATE_SPY).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('Internationalization & Accessibility (ARIA)', () => {
    it('should render the translated aria-label for the logo', () => {
      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      const logoLink = fixture.debugElement.query(By.css('.header__logo')).nativeElement;
      expect(logoLink.getAttribute('aria-label')).toBe('Retour à la page d\'accueil');
    });

    it('should render the translated aria-label for the burger menu when closed', () => {
      // --- ARRANGE ---
      component.isMenuOpen.set(false);

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      const burgerBtn = fixture.debugElement.query(By.css('.header__burger')).nativeElement;
      expect(burgerBtn.getAttribute('aria-label')).toBe('Ouvrir le menu');
    });

    it('should render the translated aria-label for the burger menu when opened', () => {
      // --- ARRANGE ---
      component.isMenuOpen.set(true);

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      const burgerBtn = fixture.debugElement.query(By.css('.header__burger')).nativeElement;
      expect(burgerBtn.getAttribute('aria-label')).toBe('Fermer le menu');
    });

    it('should render the translated aria-label for the overlay button', () => {
      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      const overlayBtn = fixture.debugElement.query(By.css('.header__overlay')).nativeElement;
      expect(overlayBtn.getAttribute('aria-label')).toBe('Fermer le menu');
    });

    it('should pass translated label and ariaLabel to the main-button (login)', () => {
      // --- ACT ---
      fixture.detectChanges();

      const loginButtonDebugEl = fixture.debugElement.query(By.css('.header__login-btn'));
      const buttonInstance = loginButtonDebugEl.componentInstance;

      // ASSERT ---
      expect(buttonInstance.label()).toBe('Se connecter');
      expect(buttonInstance.ariaLabel()).toBe('Bouton pour ouvrir le formulaire de connexion');
    });
  });
});
