/* eslint-disable @typescript-eslint/no-explicit-any */

import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { ErrorHandlerComponent } from './error-handler.component';


describe('ErrorHandlerComponent', () => {

  let component: ErrorHandlerComponent;
  let fixture: ComponentFixture<ErrorHandlerComponent>;

  let queryParams$: BehaviorSubject<any>;
  let router: Router;
  let translate: TranslateService;

  beforeEach(async() => {
    queryParams$ = new BehaviorSubject({});

    await TestBed.configureTestingModule({
      imports: [
        ErrorHandlerComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: vi.fn().mockResolvedValue(true),
            url: '/error'
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: queryParams$.asObservable(),
            snapshot: { firstChild: null }
          }
        }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    translate = TestBed.inject(TranslateService);

    translate.setTranslation('fr', {
      'PAGES': {
        'ERROR': {
          'TITLE': {
            'COMMON': 'Une erreur est survenue.',
            'UNKNOWN': 'Une erreur inconnue est survenue.'
          },
          'LABEL': 'Erreur'
        }
      },
      'UI': {
        'BUTTONS': {
          'BACKHOME': {
            'LABEL': 'Retour à l\'accueil',
            'ARIA': 'Retour à la page d\'accueil'
          },
          'LOGIN': {
            'LABEL': 'Se connecter',
            'ARIA': 'Bouton pour ouvrir le formulaire de connexion'
          }
        }
      }
    });
    translate.setTranslation('en', {
      'PAGES': {
        'ERROR': {
          'TITLE': {
            'COMMON': 'An error has occurred.',
            'UNKNOWN': 'An unknown error has occurred.'
          },
          'LABEL': 'Error'
        }
      },
      'UI': {
        'BUTTONS': {
          'BACKHOME': {
            'LABEL': 'Back to home',
            'ARIA': 'Back to home page'
          },
          'LOGIN': {
            'LABEL': 'Login',
            'ARIA': 'Button to open the login form'
          }
        }
      }
    });
    translate.use('fr');

    fixture = TestBed.createComponent(ErrorHandlerComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Routing logic & Code inference', () => {
    it('should return false for isAuthError when code is 404', () => {
      // --- ARRANGE ---
      queryParams$.next({ code: '404' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.isAuthError()).toBe(false);
    });

    it('should handle missing code parameter and NOT navigate (handled by interceptor or layout)', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { value: '/error', configurable: true });
      queryParams$.next({});

      vi.mocked(router.navigate).mockClear();

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.code()).toBe('');
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should cover the generic-error branch (Regex TRUE)', () => {
      // --- ARRANGE ---
      const CUSTOM_CODE = '418';
      queryParams$.next({ code: CUSTOM_CODE });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).toHaveBeenCalledWith(
        ['generic-error'],
        expect.objectContaining({
          queryParams: { code: CUSTOM_CODE },
          relativeTo: expect.any(Object),
          replaceUrl: true
        })
      );
    });

    it('should cover the unknown-error branch (Regex FALSE)', () => {
      // --- ARRANGE ---
      queryParams$.next({ code: '999' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).toHaveBeenCalledWith(
        ['unknown-error'],
        expect.objectContaining({
          queryParams: { code: '999' },
          replaceUrl: true
        })
      );
    });

    it('should navigate to "unauthorized-error" when code is 401', () => {
      // --- ARRANGE ---
      queryParams$.next({ code: '401' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).toHaveBeenCalledWith(
        ['unauthorized-error'],
        expect.objectContaining({
          queryParams: { code: '401' },
          relativeTo: expect.any(Object)
        })
      );
    });

    it('should infer code 401 from URL when queryParams are missing and URL is unauthorized-error', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { value: '/error/unauthorized-error', configurable: true });
      queryParams$.next({});

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.code()).toBe('401');
    });

    it('should NOT navigate if the current URL is unauthorized-error', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { get: () => '/error/unauthorized-error' });

      queryParams$.next({ code: '401' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to "forbidden-error" when code is 403', () => {
      // --- ARRANGE ---
      queryParams$.next({ code: '403' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).toHaveBeenCalledWith(
        ['forbidden-error'],
        expect.objectContaining({
          queryParams: { code: '403' },
          relativeTo: expect.any(Object),
          replaceUrl: true
        })
      );
    });

    it('should infer code 403 from URL when queryParams are missing and URL is forbidden-error', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { value: '/error/forbidden-error', configurable: true });
      queryParams$.next({});

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.code()).toBe('403');
    });

    it('should NOT navigate if the current URL is forbidden-error', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { get: () => '/error/forbidden-error' });
      queryParams$.next({ code: '403' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to "unfound-error" when code is 404', () => {
      // --- ARRANGE ---
      queryParams$.next({ code: '404' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).toHaveBeenCalledWith(
        ['unfound-error'],
        expect.objectContaining({
          queryParams: { code: '404' },
          relativeTo: expect.any(Object)
        })
      );
    });

    it('should infer code 404 from URL when queryParams are missing and URL is unfound-error', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { value: '/error/unfound-error', configurable: true });
      queryParams$.next({});

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.code()).toBe('404');
    });

    it('should NOT navigate if the current URL is unfound-error', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { get: () => '/error/unfound-error' });

      queryParams$.next({ code: '404' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to "timeout-error" when code is 408', () => {
      // --- ARRANGE ---
      queryParams$.next({ code: '408' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).toHaveBeenCalledWith(
        ['timeout-error'],
        expect.objectContaining({
          queryParams: { code: '408' },
          relativeTo: expect.any(Object)
        })
      );
    });

    it('should navigate to timeout-error when code is specifically 504', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { value: '/error', configurable: true });
      queryParams$.next({ code: '504' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).toHaveBeenCalledWith(['timeout-error'], expect.any(Object));
    });

    it('should infer code 408 from URL when queryParams are missing and URL is timeout-error', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { value: '/error/timeout-error', configurable: true });
      queryParams$.next({});

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.code()).toBe('408');
    });

    it('should NOT navigate if the current URL is timeout-error', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { get: () => '/error/timeout-error' });

      queryParams$.next({ code: '408' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to "server-error" when code is 500', () => {
      // --- ARRANGE ---
      queryParams$.next({ code: '500' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).toHaveBeenCalledWith(
        ['server-error'],
        expect.objectContaining({
          queryParams: { code: '500' },
          relativeTo: expect.any(Object)
        })
      );
    });

    it('should infer code 500 from URL when queryParams are missing and URL is server-error', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { value: '/error/server-error', configurable: true });
      queryParams$.next({});

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.code()).toBe('500');
    });

    it('should NOT navigate if the current URL is server-error', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { get: () => '/error/server-error' });

      queryParams$.next({ code: '500' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to "maintenance-error" when code is 503', () => {
      // --- ARRANGE ---
      queryParams$.next({ code: '503' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).toHaveBeenCalledWith(
        ['maintenance-error'],
        expect.objectContaining({
          queryParams: { code: '503' },
          relativeTo: expect.any(Object)
        })
      );
    });

    it('should infer code 503 from URL when queryParams are missing and URL is maintenance-error', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { value: '/error/maintenance-error', configurable: true });
      queryParams$.next({});

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.code()).toBe('503');
    });

    it('should NOT navigate if the current URL is maintenance-error', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { get: () => '/error/maintenance-error' });

      queryParams$.next({ code: '503' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to "timeout-error" when code is 504', () => {
      // --- ARRANGE ---
      queryParams$.next({ code: '504' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      // --- ASSERT ---
      expect(router.navigate).toHaveBeenCalledWith(
        ['timeout-error'],
        expect.objectContaining({
          queryParams: { code: '504' },
          relativeTo: expect.any(Object)
        })
      );
    });

    it('should NOT navigate if the current URL is timeout-error', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { get: () => '/error/timeout-error' });

      queryParams$.next({ code: '504' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to "generic-error" with params when code is valid but unhandled', () => {
      // --- ARRANGE ---
      const CUSTOM_CODE = '418';
      queryParams$.next({ code: CUSTOM_CODE });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).toHaveBeenCalledWith(
        ['generic-error'],
        expect.objectContaining({
          queryParams: { code: CUSTOM_CODE },
          relativeTo: expect.any(Object)
        })
      );
    });

    it('should NOT navigate if the current URL already includes an error page', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { get: () => '/error/unfound-error' });
      queryParams$.next({ code: '404' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should infer code 404 from URL when queryParams are missing', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { value: '/error/unfound-error', configurable: true });
      queryParams$.next({});

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.code()).toBe('404');
    });

    it('should infer code 401 from URL when queryParams are missing', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { value: '/error/unauthorized-error', configurable: true });
      queryParams$.next({});

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.code()).toBe('401');
    });

    it('should infer code 408 from URL when queryParams are missing', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { value: '/error/timeout-error', configurable: true });
      queryParams$.next({});

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.code()).toBe('408');
    });

    it('should infer code 500 from URL when queryParams are missing', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { value: '/error/server-error', configurable: true });
      queryParams$.next({});

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.code()).toBe('500');
    });

    it('should set code to empty string if URL does not match any known error pattern', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { value: '/error/unknown-path', configurable: true });
      queryParams$.next({});

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.code()).toBe('');
    });

    it('should NOT navigate if already on generic-error page with a generic code', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { get: () => '/error/generic-error' });
      queryParams$.next({ code: '502' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should NOT navigate if already on unknown-error page with an unknown code', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { get: () => '/error/unknown-error' });
      queryParams$.next({ code: '999' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('UI & Navigation Actions', () => {
    it('should call router.navigate with the provided path when navigateAction is called', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      component.navigateAction('/test-path');

      // --- ASSERT ---
      expect(router.navigate).toHaveBeenCalledWith(['/test-path']);
    });

    it('should render the "Back to Home" button and navigate to "/" for non-401 errors', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { value: '/error/unfound-error', configurable: true });
      queryParams$.next({ code: '404' });
      fixture.detectChanges();

      const buttonDebugEl = fixture.debugElement.query(By.css('main-button'));

      // --- ACT ---
      buttonDebugEl.triggerEventHandler('clicked', null);

      // --- ASSERT ---
      expect(component.code()).toBe('404');
      expect(buttonDebugEl.componentInstance.label()).toBe('Retour à l\'accueil');
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should render the "Login" button and navigate to "/login" for 401 errors', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { value: '/error/unauthorized-error', configurable: true });
      queryParams$.next({ code: '401' });
      fixture.detectChanges();

      const buttonDebugEl = fixture.debugElement.query(By.css('main-button'));

      // --- ACT ---
      buttonDebugEl.triggerEventHandler('clicked', null);

      // --- ASSERT ---
      expect(component.code()).toBe('401');
      expect(buttonDebugEl.componentInstance.label()).toBe('Se connecter');
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should NOT render the error code block when code is empty (unknown error)', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { value: '/error/unknown-error', configurable: true });
      queryParams$.next({});

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.code()).toBe('');

      const codeContainer = fixture.debugElement.query(By.css('.error-view__code'));

      expect(codeContainer).toBeNull();
    });

    it('should render the error code block when code is provided', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { value: '/error/unfound-error', configurable: true });
      queryParams$.next({ code: '404' });

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.code()).toBe('404');

      const codeContainer = fixture.debugElement.query(By.css('.error-view__code'));

      expect(codeContainer).toBeTruthy();
      expect(codeContainer.nativeElement.textContent).toContain('404');
    });
  });

  describe('Internationalization (i18n)', () => {
    it('should display the default French translations on init', () => {
      // --- ARRANGE ---
      queryParams$.next({ code: '404' });

      // --- ACT ---
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('.error-view__title')).nativeElement;
      const codeLabel = fixture.debugElement.query(By.css('.error-view__code')).nativeElement;

      // --- ASSERT ---
      expect(title.textContent.trim()).toBe('Une erreur est survenue.');
      expect(codeLabel.textContent).toContain('Erreur');
    });

    it('should update static texts when language is switched to English', () => {
      // --- ARRANGE ---
      queryParams$.next({ code: '404' });
      fixture.detectChanges();

      // --- ACT ---
      translate.use('en');
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('.error-view__title')).nativeElement;
      const codeLabel = fixture.debugElement.query(By.css('.error-view__code')).nativeElement;

      // --- ASSERT ---
      expect(title.textContent.trim()).toBe('An error has occurred.');
      expect(codeLabel.textContent).toContain('Error');
    });

    it('should translate the "Back to Home" button for non-401 errors when language changes', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { value: '/error/server-error', configurable: true });
      queryParams$.next({ code: '500' });
      fixture.detectChanges();

      let buttonComponent = fixture.debugElement.query(By.css('main-button')).componentInstance;
      // On exécute le signal
      expect(buttonComponent.label()).toBe('Retour à l\'accueil');

      // --- ACT ---
      translate.use('en');
      fixture.detectChanges();

      // --- ASSERT ---
      buttonComponent = fixture.debugElement.query(By.css('main-button')).componentInstance;

      expect(buttonComponent.label()).toBe('Back to home');
      expect(buttonComponent.ariaLabel()).toBe('Back to home page');
    });

    it('should translate the "Login" button for 401 errors when language changes', () => {
      // --- ARRANGE ---
      Object.defineProperty(router, 'url', { value: '/error/unauthorized-error', configurable: true });
      queryParams$.next({ code: '401' });
      fixture.detectChanges();

      let buttonComponent = fixture.debugElement.query(By.css('main-button')).componentInstance;
      // On exécute le signal
      expect(buttonComponent.label()).toBe('Se connecter');

      // --- ACT ---
      translate.use('en');
      fixture.detectChanges();

      // --- ASSERT ---
      buttonComponent = fixture.debugElement.query(By.css('main-button')).componentInstance;

      expect(buttonComponent.label()).toBe('Login');
      expect(buttonComponent.ariaLabel()).toBe('Button to open the login form');
    });

    it('should apply "is-english" class to the code container when language is English', () => {
      // --- ARRANGE ---
      queryParams$.next({ code: '404' });

      // --- ACT ---
      translate.use('en');
      fixture.detectChanges();

      const codeContainer = fixture.debugElement.query(By.css('.error-view__code'));

      // --- ASSERT ---
      expect(codeContainer.nativeElement.classList.contains('is-english')).toBe(true);
    });

    it('should NOT apply "is-english" class when language is French', () => {
      // --- ARRANGE ---
      queryParams$.next({ code: '404' });

      // --- ACT ---
      translate.use('fr');
      fixture.detectChanges();

      const codeContainer = fixture.debugElement.query(By.css('.error-view__code'));

      // --- ASSERT ---
      expect(codeContainer.nativeElement.classList.contains('is-english')).toBe(false);
    });
  });
});
