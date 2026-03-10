/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { MockAdminLoginButtonComponent } from './mock-admin-login-button.component';
import { AuthService } from '@core/_services/auth/auth.service';
import { SnackbarService } from '@app/core/_services/snackbar/snackbar.service';
import { SNACKBAR_KEYS } from '@core/_config/snackbar/snackbar.constant';
import { ENVIRONMENT } from '@env/environment';

describe('MockAdminLoginButtonComponent', () => {

  let component: MockAdminLoginButtonComponent;
  let fixture: ComponentFixture<MockAdminLoginButtonComponent>;
  let authServiceMock: any;
  let snackbarServiceSpy: any;
  let routerMock: any;

  const NAVIGATION_DELAY_MS = 100;

  beforeEach(async() => {
    vi.useFakeTimers();

    authServiceMock = {
      login: vi.fn().mockReturnValue(of({ user: { id: 1 }, token: 'fake-token' }))
    };

    routerMock = {
      navigate: vi.fn().mockResolvedValue(true)
    };

    snackbarServiceSpy = {
      showNotification: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [MockAdminLoginButtonComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: SnackbarService, useValue: snackbarServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MockAdminLoginButtonComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login, show success notification and navigate after delay on click', () => {
    // --- ACT ---
    component.handleLogin();

    // --- ASSERT ---
    expect(authServiceMock.login).toHaveBeenCalledWith({
      email: 'admin@test.com',
      password: ENVIRONMENT.mockAdminPassword
    });

    expect(snackbarServiceSpy.showNotification).toHaveBeenCalledWith(
      SNACKBAR_KEYS.LOGIN_SUCCESS,
      'logIn-logOut'
    );

    expect(routerMock.navigate).not.toHaveBeenCalled();

    // --- ACT ---
    vi.advanceTimersByTime(NAVIGATION_DELAY_MS);

    // --- ASSERT ---
    expect(routerMock.navigate).toHaveBeenCalledWith(['/admin/dashboard']);
  });

  it('should trigger handleLogin when button is clicked in template', () => {
    // --- ARRANGE ---
    const HANDLE_LOGIN_SPY = vi.spyOn(component, 'handleLogin');
    const BUTTON = document.querySelector('button');

    // --- ACT ---
    BUTTON?.click();

    // --- ASSERT ---
    expect(HANDLE_LOGIN_SPY).toHaveBeenCalled();
  });

  it('should use empty string for password if ENVIRONMENT.mockAdminPassword is undefined', () => {
    // --- ARRANGE ---
    const originalPassword = ENVIRONMENT.mockAdminPassword;

    (ENVIRONMENT as any).mockAdminPassword = undefined;

    // --- ACT ---
    component.handleLogin();

    // --- ASSERT ---
    expect(authServiceMock.login).toHaveBeenCalledWith({
      email: 'admin@test.com',
      password: ''
    });

    // --- CLEANUP ---
    (ENVIRONMENT as any).mockAdminPassword = originalPassword;
  });

  it('should show error notification if login fails', () => {
    // --- ARRANGE ---
    authServiceMock.login.mockReturnValue(throwError(() => new Error('Mock API Error')));

    // --- ACT ---
    component.handleLogin();

    // --- ASSERT ---
    expect(authServiceMock.login).toHaveBeenCalled();
    expect(snackbarServiceSpy.showNotification).toHaveBeenCalledWith(
      SNACKBAR_KEYS.LOGIN_ERROR,
      'red-alert'
    );
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
