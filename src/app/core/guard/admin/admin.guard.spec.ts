/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '@core/_services/auth/auth.service';
import { adminGuard } from './admin.guard';

const ASYNC_DELAY_MS = 0;

describe('adminGuard', () => {

  const AUTH_SERVICE_MOCK = {
    currentUser: signal<any>(undefined),
    isAdmin: vi.fn()
  };

  const ROUTER_MOCK = {
    parseUrl: vi.fn((url: string) => url as unknown as UrlTree)
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: AUTH_SERVICE_MOCK },
        { provide: Router, useValue: ROUTER_MOCK }
      ]
    });

    AUTH_SERVICE_MOCK.currentUser.set(undefined);
  });

  it('should allow access if user is already admin (Sync)', () => {
    // --- ARRANGE ---
    AUTH_SERVICE_MOCK.currentUser.set({ roles: ['ADMIN'] });
    AUTH_SERVICE_MOCK.isAdmin.mockReturnValue(true);

    // --- ACT ---
    const RESULT = TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any));

    // --- ASSERT ---
    expect(RESULT).toBe(true);
  });

  it('should redirect to root if no token is present', () => {
    // --- ACT ---
    const RESULT = TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any));

    // --- ASSERT ---
    expect(ROUTER_MOCK.parseUrl).toHaveBeenCalledWith('/');
    expect(RESULT).toBe('/');
  });

  it('should redirect to unauthorized error if user is not ADMIN (Async)', async() => {
    // --- ARRANGE ---
    localStorage.setItem('token', 'valid-token');
    AUTH_SERVICE_MOCK.isAdmin.mockReturnValue(false);

    // --- ACT ---
    const OBS$ = TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any)) as any;

    setTimeout(() => AUTH_SERVICE_MOCK.currentUser.set({ roles: ['USER'] }), ASYNC_DELAY_MS);

    const FINAL_RESULT = await firstValueFrom(OBS$);

    // --- ASSERT ---
    expect(ROUTER_MOCK.parseUrl).toHaveBeenCalledWith('/error/unauthorized-error');
    expect(FINAL_RESULT).toBe('/error/unauthorized-error');
  });

  it('should allow access asynchronously when user loads as ADMIN', async() => {
    // --- ARRANGE ---
    localStorage.setItem('token', 'valid-token');
    AUTH_SERVICE_MOCK.isAdmin.mockReturnValue(false);

    // --- ACT ---
    const OBS$ = TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any)) as any;

    setTimeout(() => {
      AUTH_SERVICE_MOCK.currentUser.set({ roles: ['ADMIN'] });
    }, ASYNC_DELAY_MS);

    const FINAL_RESULT = await firstValueFrom(OBS$);

    // --- ASSERT ---
    expect(FINAL_RESULT).toBe(true);
  });
});
