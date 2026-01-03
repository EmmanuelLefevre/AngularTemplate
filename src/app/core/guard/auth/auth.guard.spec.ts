/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';

import { AuthService } from '@core/_services/auth/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {

  const AUTH_SERVICE_MOCK = {
    isAuthenticated: vi.fn(),
  };

  const ROUTER_MOCK = {
    parseUrl: vi.fn((url: string) => url as unknown as UrlTree),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: AUTH_SERVICE_MOCK },
        { provide: Router, useValue: ROUTER_MOCK },
      ],
    });
  });

  it('should allow access if user is authenticated', () => {
    // --- ARRANGE ---
    AUTH_SERVICE_MOCK.isAuthenticated.mockReturnValue(true);

    // --- ACT ---
    const RESULT = TestBed.runInInjectionContext(() =>
      authGuard({} as any, {} as any)
    );

    // --- ASSERT ---
    expect(RESULT).toBe(true);
  });

  it('should redirect to root (/) if not authenticated and no token in localStorage', () => {
    // --- ARRANGE ---
    AUTH_SERVICE_MOCK.isAuthenticated.mockReturnValue(false);

    // --- ACT ---
    const RESULT = TestBed.runInInjectionContext(() =>
      authGuard({} as any, {} as any)
    );

    // --- ASSERT ---
    expect(ROUTER_MOCK.parseUrl).toHaveBeenCalledWith('/');
    expect(RESULT).toBe('/');
  });

  it('should redirect to unauthorized-error if not authenticated but token exists (refresh case)', () => {
    // --- ARRANGE ---
    AUTH_SERVICE_MOCK.isAuthenticated.mockReturnValue(false);
    localStorage.setItem('token', 'some-fake-token');

    // --- ACT ---
    const RESULT = TestBed.runInInjectionContext(() =>
      authGuard({} as any, {} as any)
    );

    // --- ASSERT ---
    expect(ROUTER_MOCK.parseUrl).toHaveBeenCalledWith('/error/unauthorized-error');
    expect(RESULT).toBe('/error/unauthorized-error');
  });
});
