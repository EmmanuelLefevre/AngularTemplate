import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';

import { AuthService } from '@core/_services/auth/auth.service';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';

import { LoginViewComponent } from './login-view.component';

const FLIP_ANIMATION_DURATION_MS = 800;
const FLIP_ANIMATION_MIDPOINT_RATIO = 0.5;
const FLIP_ANIMATION_MIDPOINT_MS = FLIP_ANIMATION_DURATION_MS * FLIP_ANIMATION_MIDPOINT_RATIO;

describe('LoginViewComponent', () => {

  let component: LoginViewComponent;
  let fixture: ComponentFixture<LoginViewComponent>;
  let router: Router;

  const AUTH_SERVICE_MOCK = {
    login: vi.fn()
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        LoginViewComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: AUTH_SERVICE_MOCK }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginViewComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true));

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
    const MOCK_DATA = { email: 'test@test.com', password: 'password123' };

    it('should call authService.login and navigate on success', () => {
      // --- ARRANGE ---
      const LOGIN_SPY = AUTH_SERVICE_MOCK.login as ReturnType<typeof vi.fn>;
      LOGIN_SPY.mockReturnValue(of({}));

      // --- ACT ---
      component.onFormSubmit(MOCK_DATA);

      // --- ASSERT ---
      expect(component.isLoading()).toBe(false);
      expect(LOGIN_SPY).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'password123'
      });
      expect(router.navigate).toHaveBeenCalledWith(['/private']);
    });

    it('should set isLoading to false on error', () => {
      // --- ARRANGE ---
      const LOGIN_SPY = AUTH_SERVICE_MOCK.login as ReturnType<typeof vi.fn>;
      LOGIN_SPY.mockReturnValue(throwError(() => new Error('Login Failed')));

      // --- ACT ---
      component.onFormSubmit(MOCK_DATA);

      // --- ASSERT ---
      expect(LOGIN_SPY).toHaveBeenCalled();
      expect(component.isLoading()).toBe(false);
    });

    it('should set isLoading to true during the call and false on error', () => {
      // --- ARRANGE ---
      AUTH_SERVICE_MOCK.login.mockReturnValue(throwError(() => new Error('Login Failed')));

      // --- ACT ---
      component.onFormSubmit(MOCK_DATA);

      // --- ASSERT ---
      expect(AUTH_SERVICE_MOCK.login).toHaveBeenCalled();
      expect(component.isLoading()).toBe(false);
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should not call login if data types are invalid', () => {
      // --- ARRANGE ---
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const INVALID_DATA = { email: 123, password: null } as unknown as Parameters<LoginViewComponent['onFormSubmit']>[0];

      // --- ACT ---
      component.onFormSubmit(INVALID_DATA);

      // --- ASSERT ---
      expect(AUTH_SERVICE_MOCK.login).not.toHaveBeenCalled();
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
