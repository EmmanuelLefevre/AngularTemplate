import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { AuthService } from '@core/_services/auth/auth.service';
import { ROUTES } from './app.routes';

describe('App Routes', () => {
  let harness: RouterTestingHarness;

  const AUTH_SERVICE_MOCK = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    currentUser: signal<any>(undefined),
    isAdmin: vi.fn()
  };

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(ROUTES),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTranslateService(),
        { provide: AuthService, useValue: AUTH_SERVICE_MOCK }
      ]
    });

    harness = await RouterTestingHarness.create();
  });

  it('should redirect empty path to /home', async() => {
    // --- ACT ---
    await harness.navigateByUrl('/');

    // --- ASSERT ---
    expect(TestBed.inject(Router).url).toBe('/home');
  });

  it('should navigate to /contact', async() => {
    // --- ACT ---
    const INSTANCE = await harness.navigateByUrl('/contact');

    // --- ASSERT ---
    expect(INSTANCE).toBeTruthy();
    expect(TestBed.inject(Router).url).toBe('/contact');
  });

  it('should redirect to home (via root) if adminGuard fails due to missing token', async() => {
    // --- ARRANGE ---
    AUTH_SERVICE_MOCK.isAdmin.mockReturnValue(false);
    localStorage.clear();

    // --- ACT ---
    await harness.navigateByUrl('/admin/dashboard');

    // --- ASSERT ---
    expect(TestBed.inject(Router).url).toBe('/home');
  });

  it('should allow /admin/dashboard if adminGuard passes', async() => {
    // --- ARRANGE ---
    AUTH_SERVICE_MOCK.isAdmin.mockReturnValue(true);
    AUTH_SERVICE_MOCK.currentUser.set({ roles: ['ADMIN'] });

    // --- ACT ---
    await harness.navigateByUrl('/admin/dashboard');

    // --- ASSERT ---
    expect(TestBed.inject(Router).url).toBe('/admin/dashboard');
  });

  it('should navigate to unfound-error for unknown routes (wildcard)', async() => {
    // --- ACT ---
    await harness.navigateByUrl('/path/that/does/not/exist');

    // --- ASSERT ---
    expect(TestBed.inject(Router).url).toBe('/error/unfound-error');
  });

  it('should load error child routes correctly', async() => {
    // --- ACT ---
    await harness.navigateByUrl('/error/server-error');

    // --- ASSERT ---
    expect(TestBed.inject(Router).url).toBe('/error/server-error');
  });

  describe('Error Management Routes Coverage', () => {
    const ERROR_CASES = [
      { path: '/error/unauthorized-error' },
      { path: '/error/unfound-error' },
      { path: '/error/server-error' },
      { path: '/error/generic-error' },
      { path: '/error/unknown-error' },
    ];

    it.each(ERROR_CASES)('should successfully load component for $path', async({ path }) => {
      // --- ACT ---
      const COMPONENT_INSTANCE = await harness.navigateByUrl(path);

      // --- ASSERT ---
      expect(TestBed.inject(Router).url).toBe(path);
      expect(COMPONENT_INSTANCE).toBeTruthy();
    });
  });
});

