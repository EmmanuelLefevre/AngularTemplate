/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { Signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, of, throwError } from 'rxjs';

import { AuthService } from '@core/_services/auth/auth.service';
import { SnackbarService } from '@core/_services/snackbar/snackbar.service';

import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';

import { LoginViewComponent } from './login-view.component';

const FLIP_ANIMATION_DURATION_MS = 800;
const FLIP_ANIMATION_MIDPOINT_RATIO = 0.5;
const FLIP_ANIMATION_MIDPOINT_MS = FLIP_ANIMATION_DURATION_MS * FLIP_ANIMATION_MIDPOINT_RATIO;

const NEXT_TICK_MS = 0;

describe('LoginViewComponent', () => {

  let component: LoginViewComponent;
  let fixture: ComponentFixture<LoginViewComponent>;
  let router: Router;

  const AUTH_SERVICE_MOCK = {
    login: vi.fn(),
    register: vi.fn()
  };

  const SNACKBAR_SERVICE_MOCK = {
    showNotification: vi.fn()
  };

  const queryParamsSubject = new BehaviorSubject<{ email?: string }>({});
  const ACTIVATED_ROUTE_MOCK = {
    queryParams: queryParamsSubject.asObservable(),
    snapshot: { queryParamMap: { get: vi.fn() } }
  };

  const MOCK_DATA = { email: 'test@test.com', password: 'password123', username: 'Grower123' };

  beforeEach(async() => {
    queryParamsSubject.next({});

    await TestBed.configureTestingModule({
      imports: [
        LoginViewComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: AUTH_SERVICE_MOCK },
        { provide: SnackbarService, useValue: SNACKBAR_SERVICE_MOCK },
        { provide: ActivatedRoute, useValue: ACTIVATED_ROUTE_MOCK }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginViewComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true));

    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial signals set to false', () => {
    // --- ASSERT ---
    expect(component.isRegisterMode()).toBe(false);
    expect(component.isLoading()).toBe(false);
    expect(component.isFlipping()).toBe(false);
  });

  describe('ngOnInit (QueryParams Subscription)', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should call toggleMode with email param if isRegisterMode is true', () => {
      // --- ARRANGE ---
      vi.spyOn((component as any), 'dynamicForm').mockReturnValue({
        patchEmail: vi.fn(),
        resetForm: vi.fn()
      });
      const TOGGLE_SPY = vi.spyOn(component, 'toggleMode');
      component.isRegisterMode.set(true);

      // --- ACT ---
      queryParamsSubject.next({ email: 'test@logic.com' });
      vi.advanceTimersByTime(NEXT_TICK_MS);

      // --- ASSERT ---
      expect(TOGGLE_SPY).toHaveBeenCalledWith('test@logic.com');
    });

    it('should patch email directly if isRegisterMode is false', () => {
      // --- ARRANGE ---
      const PATCH_EMAIL_SPY = vi.fn();
      vi.spyOn((component as any), 'dynamicForm').mockReturnValue({
        patchEmail: PATCH_EMAIL_SPY,
        resetForm: vi.fn()
      });
      const TOGGLE_SPY = vi.spyOn(component, 'toggleMode');
      component.isRegisterMode.set(false);

      // --- ACT ---
      queryParamsSubject.next({ email: 'autre@logic.com' });
      vi.advanceTimersByTime(NEXT_TICK_MS);

      // --- ASSERT ---
      expect(PATCH_EMAIL_SPY).toHaveBeenCalledWith('autre@logic.com');
      expect(TOGGLE_SPY).not.toHaveBeenCalled();
    });

    it('should call toggleMode if isRegisterMode is true when email param arrives', () => {
      // --- ARRANGE ---
      vi.spyOn((component as any), 'dynamicForm').mockReturnValue({
        patchEmail: vi.fn(),
        resetForm: vi.fn()
      });
      const TOGGLE_SPY = vi.spyOn(component, 'toggleMode');
      component.isRegisterMode.set(true);

      // --- ACT ---
      queryParamsSubject.next({ email: 'test@logic.com' });
      vi.advanceTimersByTime(NEXT_TICK_MS);

      // --- ASSERT ---
      expect(TOGGLE_SPY).toHaveBeenCalled();
    });

    it('should not call toggleMode if isRegisterMode is false when email param arrives', () => {
      // --- ARRANGE ---
      vi.spyOn((component as any), 'dynamicForm').mockReturnValue({
        patchEmail: vi.fn(),
        resetForm: vi.fn()
      });
      const TOGGLE_SPY = vi.spyOn(component, 'toggleMode');
      component.isRegisterMode.set(false);

      // --- ACT ---
      queryParamsSubject.next({ email: 'autre@logic.com' });
      vi.advanceTimersByTime(NEXT_TICK_MS);

      // --- ASSERT ---
      expect(TOGGLE_SPY).not.toHaveBeenCalled();
    });
  });

  describe('toggleMode()', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should handle the flip animation sequence correctly with timers', () => {
      // --- ARRANGE ---
      const RESET_SPY = vi.fn();

      interface ComponentWithPrivateForm {
        dynamicForm: Signal<Partial<DynamicFormComponent> | undefined>;
      }

      vi.spyOn((component as unknown as ComponentWithPrivateForm), 'dynamicForm')
        .mockReturnValue({ resetForm: RESET_SPY });

      // --- ACT ---
      component.toggleMode();

      // --- ASSERT ---
      expect(component.isFlipping()).toBe(true);
      expect(component.isRegisterMode()).toBe(false);

      // --- ACT ---
      vi.advanceTimersByTime(FLIP_ANIMATION_MIDPOINT_MS);

      // --- ASSERT ---
      expect(component.isRegisterMode()).toBe(true);
      expect(RESET_SPY).toHaveBeenCalled();
      expect(component.isFlipping()).toBe(true);

      // --- ACT ---
      vi.advanceTimersByTime(FLIP_ANIMATION_DURATION_MS - FLIP_ANIMATION_MIDPOINT_MS);

      // --- ASSERT ---
      expect(component.isFlipping()).toBe(false);
    });

    it('should patch email after resetting form if emailToPatch is provided', () => {
      // --- ARRANGE ---
      const RESET_SPY = vi.fn();
      const PATCH_EMAIL_SPY = vi.fn();

      interface ComponentWithPrivateForm {
        dynamicForm: Signal<Partial<DynamicFormComponent> | undefined>;
      }

      vi.spyOn((component as unknown as ComponentWithPrivateForm), 'dynamicForm')
        .mockReturnValue({ resetForm: RESET_SPY, patchEmail: PATCH_EMAIL_SPY });

      // --- ACT ---
      component.toggleMode('delay@test.com');
      vi.advanceTimersByTime(FLIP_ANIMATION_MIDPOINT_MS);

      // --- ASSERT ---
      expect(RESET_SPY).toHaveBeenCalled();
      expect(PATCH_EMAIL_SPY).toHaveBeenCalledWith('delay@test.com');
    });

    it('should abort if animation is already running (isFlipping is true)', () => {
      // --- ARRANGE ---
      component.isFlipping.set(true);
      const initialRegisterMode = component.isRegisterMode();

      // --- ACT ---
      component.toggleMode();

      vi.advanceTimersByTime(FLIP_ANIMATION_DURATION_MS);

      // --- ASSERT ---
      expect(component.isRegisterMode()).toBe(initialRegisterMode);
    });
  });

  describe('onFormSubmit()', () => {
    describe('Login Mode', () => {
      beforeEach(() => {
        component.isRegisterMode.set(false);
      });

      it('should call authService.login, navigate and show snackbar on success', () => {
        // --- ARRANGE ---
        const MOCK_USER = { username: 'Grower123' };
        AUTH_SERVICE_MOCK.login.mockReturnValue(of(MOCK_USER));

        // --- ACT ---
        component.onFormSubmit(MOCK_DATA);

        // --- ASSERT ---
        expect(component.isLoading()).toBe(false);
        expect(AUTH_SERVICE_MOCK.login).toHaveBeenCalledWith({
          email: MOCK_DATA.email,
          password: MOCK_DATA.password
        });
        expect(router.navigate).toHaveBeenCalledWith(['/private']);
        expect(SNACKBAR_SERVICE_MOCK.showNotification).toHaveBeenCalledWith(
          'UI.SNACKBAR.AUTH.LOGIN.SUCCESS',
          'logIn-logOut',
          { username: 'Grower123' }
        );
      });

      it('should show confirm email snackbar if error contains confirm', () => {
        // --- ARRANGE ---
        AUTH_SERVICE_MOCK.login.mockReturnValue(throwError(() => new Error('Email not confirmed')));

        // --- ACT ---
        component.onFormSubmit(MOCK_DATA);

        // --- ASSERT ---
        expect(component.isLoading()).toBe(false);
        expect(SNACKBAR_SERVICE_MOCK.showNotification).toHaveBeenCalledWith(
          'UI.SNACKBAR.AUTH.LOGIN.CONFIRM_EMAIL_NEEDED',
          'red-alert'
        );
      });

      it('should show generic error snackbar for other errors', () => {
        // --- ARRANGE ---
        AUTH_SERVICE_MOCK.login.mockReturnValue(throwError(() => new Error('Invalid credentials')));

        // --- ACT ---
        component.onFormSubmit(MOCK_DATA);

        // --- ASSERT ---
        expect(SNACKBAR_SERVICE_MOCK.showNotification).toHaveBeenCalledWith(
          'UI.SNACKBAR.AUTH.LOGIN.ERROR',
          'red-alert'
        );
      });
    });

    describe('Register Mode', () => {
      beforeEach(() => {
        component.isRegisterMode.set(true);
      });

      it('should call authService.register, navigate to login with queryParams and show snackbar on success', () => {
        // --- ARRANGE ---
        AUTH_SERVICE_MOCK.register.mockReturnValue(of({}));

        // --- ACT ---
        component.onFormSubmit(MOCK_DATA);

        // --- ASSERT ---
        expect(component.isLoading()).toBe(false);
        expect(AUTH_SERVICE_MOCK.register).toHaveBeenCalledWith({
          email: MOCK_DATA.email,
          password: MOCK_DATA.password,
          username: MOCK_DATA.username
        });
        expect(router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { email: MOCK_DATA.email } });
        expect(SNACKBAR_SERVICE_MOCK.showNotification).toHaveBeenCalledWith(
          'UI.SNACKBAR.AUTH.REGISTER.SUCCESS',
          'register'
        );
      });

      it('should fall back to empty string for username if undefined', () => {
        // --- ARRANGE ---
        AUTH_SERVICE_MOCK.register.mockReturnValue(of({}));
        const DATA_WITHOUT_USERNAME = { email: 'test@test.com', password: 'password123' };

        // --- ACT ---
        component.onFormSubmit(DATA_WITHOUT_USERNAME);

        // --- ASSERT ---
        expect(AUTH_SERVICE_MOCK.register).toHaveBeenCalledWith({
          email: DATA_WITHOUT_USERNAME.email,
          password: DATA_WITHOUT_USERNAME.password,
          username: ''
        });
      });

      it('should show error snackbar if register fails', () => {
        // --- ARRANGE ---
        AUTH_SERVICE_MOCK.register.mockReturnValue(throwError(() => new Error('Register Failed')));

        // --- ACT ---
        component.onFormSubmit(MOCK_DATA);

        // --- ASSERT ---
        expect(component.isLoading()).toBe(false);
        expect(SNACKBAR_SERVICE_MOCK.showNotification).toHaveBeenCalledWith(
          'UI.SNACKBAR.AUTH.REGISTER.ERROR',
          'red-alert'
        );
      });
    });

    it('should not call login or register if data types are invalid', () => {
      // --- ARRANGE ---
      const INVALID_DATA = { email: 123, password: null } as any;

      // --- ACT ---
      component.onFormSubmit(INVALID_DATA);

      // --- ASSERT ---
      expect(AUTH_SERVICE_MOCK.login).not.toHaveBeenCalled();
      expect(AUTH_SERVICE_MOCK.register).not.toHaveBeenCalled();
      expect(component.isLoading()).toBe(false);
    });
  });

  describe('onCancel()', () => {
    it('should call resetForm on the dynamicForm viewChild', () => {
      // --- ARRANGE ---
      const RESET_SPY = vi.fn();

      interface ComponentWithPrivateForm {
        dynamicForm: Signal<Partial<DynamicFormComponent> | undefined>;
      }

      vi.spyOn((component as unknown as ComponentWithPrivateForm), 'dynamicForm')
        .mockReturnValue({ resetForm: RESET_SPY });

      // --- ACT ---
      component.onCancel();

      // --- ASSERT ---
      expect(RESET_SPY).toHaveBeenCalled();
    });
  });
});
