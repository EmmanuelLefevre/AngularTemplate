/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '@core/_services/auth/auth.service';
import { ENVIRONMENT } from '@env/environment';
import { MockAdminLoginButtonComponent } from './mock-admin-login-button.component';

describe('MockAdminLoginButtonComponent', () => {

  let component: MockAdminLoginButtonComponent;
  let authServiceMock: any;
  let routerMock: any;

  const NAVIGATION_DELAY_MS = 100;

  beforeEach(async() => {
    // --- ARRANGE ---
    vi.useFakeTimers();

    authServiceMock = {
      login: vi.fn().mockReturnValue(of({ user: { id: 1 }, token: 'fake-token' }))
    };

    routerMock = {
      navigate: vi.fn().mockResolvedValue(true)
    };

    await TestBed.configureTestingModule({
      imports: [MockAdminLoginButtonComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    const FIXTURE = TestBed.createComponent(MockAdminLoginButtonComponent);
    component = FIXTURE.componentInstance;

    FIXTURE.detectChanges();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login and navigate after delay on click', () => {
    // --- ACT ---
    component.handleLogin();

    // --- ASSERT ---
    expect(authServiceMock.login).toHaveBeenCalledWith({
      email: 'admin@test.com',
      password: ENVIRONMENT.mockAdminPassword
    });

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
});
