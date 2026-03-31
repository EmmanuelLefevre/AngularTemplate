/* eslint-disable @typescript-eslint/no-explicit-any */

import { TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';

import { AuthService } from '@core/_services/auth/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {

  let isAuthLoadedSignal: WritableSignal<boolean>;
  let isAuthenticatedSignal: WritableSignal<boolean>;

  const ROUTER_MOCK = {
    parseUrl: vi.fn((url: string) => url as unknown as UrlTree),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    isAuthLoadedSignal = signal(true);
    isAuthenticatedSignal = signal(true);

    const AUTH_SERVICE_MOCK = {
      isAuthLoaded: isAuthLoadedSignal,
      isAuthenticated: isAuthenticatedSignal
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: AUTH_SERVICE_MOCK },
        { provide: Router, useValue: ROUTER_MOCK },
      ],
    });
  });

  it('should allow access synchronously if auth is loaded and user is authenticated', () => {
    // --- ARRANGE ---
    isAuthLoadedSignal.set(true);
    isAuthenticatedSignal.set(true);

    // --- ACT ---
    const RESULT = TestBed.runInInjectionContext(() =>
      authGuard({} as any, {} as any)
    );

    // --- ASSERT ---
    expect(RESULT).toBe(true);
  });

  it('should redirect to unauthorized-error synchronously if auth is loaded and user is NOT authenticated', () => {
    // --- ARRANGE ---
    isAuthLoadedSignal.set(true);
    isAuthenticatedSignal.set(false);

    // --- ACT ---
    const RESULT = TestBed.runInInjectionContext(() =>
      authGuard({} as any, {} as any)
    );

    // --- ASSERT ---
    expect(ROUTER_MOCK.parseUrl).toHaveBeenCalledWith('/error/unauthorized-error');
    expect(RESULT).toBe('/error/unauthorized-error');
  });

  it('should wait for auth to load and allow access if user becomes authenticated', async() => {
    // --- ARRANGE ---
    isAuthLoadedSignal.set(false);
    isAuthenticatedSignal.set(false);

    // --- ACT ---
    const RESULT_OBSERVABLE = TestBed.runInInjectionContext(() =>
      authGuard({} as any, {} as any)
    ) as Observable<boolean | UrlTree>;

    isAuthenticatedSignal.set(true);
    isAuthLoadedSignal.set(true);

    const RESULT = await firstValueFrom(RESULT_OBSERVABLE);

    // --- ASSERT ---
    expect(RESULT).toBe(true);
  });

  it('should wait for auth to load and redirect to unauthorized-error if user is NOT authenticated', async() => {
    // --- ARRANGE ---
    isAuthLoadedSignal.set(false);
    isAuthenticatedSignal.set(false);

    // --- ACT ---
    const RESULT_OBSERVABLE = TestBed.runInInjectionContext(() =>
      authGuard({} as any, {} as any)
    ) as Observable<boolean | UrlTree>;

    // Simulation de la réponse API négative
    isAuthLoadedSignal.set(true);

    const RESULT = await firstValueFrom(RESULT_OBSERVABLE);

    // --- ASSERT ---
    expect(ROUTER_MOCK.parseUrl).toHaveBeenCalledWith('/error/unauthorized-error');
    expect(RESULT).toBe('/error/unauthorized-error');
  });
});
