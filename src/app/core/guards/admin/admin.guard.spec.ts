/* eslint-disable @typescript-eslint/no-explicit-any */

import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { signal, WritableSignal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

import { AuthService } from '@core/_services/auth/auth.service';
import { adminGuard } from './admin.guard';

describe('adminGuard', () => {

  let isAuthLoadedMock: WritableSignal<boolean>;
  let isAuthenticatedMock: WritableSignal<boolean>;
  let isAdminMock: WritableSignal<boolean>;

  const ROUTER_MOCK = {
    parseUrl: vi.fn((url: string) => url as unknown as UrlTree)
  };

  beforeEach(() => {
    vi.clearAllMocks();

    isAuthLoadedMock = signal(false);
    isAuthenticatedMock = signal(false);
    isAdminMock = signal(false);

    const AUTH_SERVICE_MOCK = {
      isAuthLoaded: isAuthLoadedMock,
      isAuthenticated: isAuthenticatedMock,
      isAdmin: isAdminMock
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: AUTH_SERVICE_MOCK },
        { provide: Router, useValue: ROUTER_MOCK }
      ]
    });
  });

  describe('Synchronous Navigation (App already loaded)', () => {
    it('should allow access if user is Admin', () => {
      // --- ARRANGE ---
      isAuthLoadedMock.set(true);
      isAuthenticatedMock.set(true);
      isAdminMock.set(true);

      // --- ACT ---
      const RESULT = TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any));

      // --- ASSERT ---
      expect(RESULT).toBe(true);
    });

    it('should redirect to unauthorized-error (401) if user is not authenticated', () => {
      // --- ARRANGE ---
      isAuthLoadedMock.set(true);
      isAuthenticatedMock.set(false);
      isAdminMock.set(false);

      // --- ACT ---
      const RESULT = TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any));

      // --- ASSERT ---
      expect(ROUTER_MOCK.parseUrl).toHaveBeenCalledWith('/error/unauthorized-error');
      expect(RESULT).toBe('/error/unauthorized-error');
    });

    it('should redirect to forbidden-error (403) if user is authenticated but not admin', () => {
      // --- ARRANGE ---
      isAuthLoadedMock.set(true);
      isAuthenticatedMock.set(true);
      isAdminMock.set(false);

      // --- ACT ---
      const RESULT = TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any));

      // --- ASSERT ---
      expect(ROUTER_MOCK.parseUrl).toHaveBeenCalledWith('/error/forbidden-error');
      expect(RESULT).toBe('/error/forbidden-error');
    });
  });

  describe('Asynchronous Navigation (Page Refresh / F5)', () => {
    it('should wait for auth to load and allow access for Admin', async() => {
      // --- ARRANGE ---
      isAuthLoadedMock.set(false);
      isAdminMock.set(true);

      // --- ACT ---
      const OBS$ = TestBed.runInInjectionContext(() =>
        adminGuard({} as any, {} as any)
      ) as Observable<boolean | UrlTree>;

      // On simule la fin du chargement API
      isAuthLoadedMock.set(true);
      const FINAL_RESULT = await firstValueFrom(OBS$);

      // --- ASSERT ---
      expect(FINAL_RESULT).toBe(true);
    });

    it('should wait for auth to load and redirect to unauthorized-error for non-authenticated visitor', async() => {
      // --- ARRANGE ---
      isAuthLoadedMock.set(false);
      isAuthenticatedMock.set(false);

      // --- ACT ---
      const OBS$ = TestBed.runInInjectionContext(() =>
        adminGuard({} as any, {} as any)
      ) as Observable<boolean | UrlTree>;

      isAuthLoadedMock.set(true);
      const FINAL_RESULT = await firstValueFrom(OBS$);

      // --- ASSERT ---
      expect(ROUTER_MOCK.parseUrl).toHaveBeenCalledWith('/error/unauthorized-error');
      expect(FINAL_RESULT).toBe('/error/unauthorized-error');
    });

    it('should wait for auth to load and redirect to forbidden-error for non-admin', async() => {
      // --- ARRANGE ---
      isAuthLoadedMock.set(false);
      isAuthenticatedMock.set(true);
      isAdminMock.set(false);

      // --- ACT ---
      const OBS$ = TestBed.runInInjectionContext(() =>
        adminGuard({} as any, {} as any)
      ) as Observable<boolean | UrlTree>;

      isAuthLoadedMock.set(true);
      const FINAL_RESULT = await firstValueFrom(OBS$);

      // --- ASSERT ---
      expect(ROUTER_MOCK.parseUrl).toHaveBeenCalledWith('/error/forbidden-error');
      expect(FINAL_RESULT).toBe('/error/forbidden-error');
    });
  });
});
