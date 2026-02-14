import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { AuthService } from '@core/_services/auth/auth.service';

import { ROUTES } from './app.routes';
import { authGuard } from './core/guard/auth/auth.guard';

@Component({
  selector: 'mock-layout',
  imports: [RouterOutlet],
  template: '<router-outlet />'
})
class MockLayoutComponent {}

describe('App Routes', () => {

  let harness: RouterTestingHarness;

  const AUTH_SERVICE_MOCK = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    currentUser: signal<any>(undefined),
    isAdmin: vi.fn(),
    isAuthenticated: vi.fn()
  };

  const mockAuthGuard = vi.fn();

  beforeEach(async() => {
    AUTH_SERVICE_MOCK.isAuthenticated.mockReturnValue(false);
    mockAuthGuard.mockReturnValue(true);

    const TEST_ROUTES = ROUTES.map(route => {
      if (route.path === '' && route.children) {
        return {
          ...route,
          loadComponent: undefined,
          component: MockLayoutComponent
        };
      }
      return route;
    });

    TestBed.configureTestingModule({
      providers: [
        provideRouter(TEST_ROUTES),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTranslateService(),
        { provide: AuthService, useValue: AUTH_SERVICE_MOCK },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unsafe-return
        { provide: authGuard, useValue: () => mockAuthGuard() }
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

  it('should navigate to /login', async() => {
    // --- ACT ---
    const INSTANCE = await harness.navigateByUrl('/login');

    // --- ASSERT ---
    expect(INSTANCE).toBeTruthy();
    expect(TestBed.inject(Router).url).toBe('/login');
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

  describe('Error Management Routes', () => {

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

  describe('Private Route (Lines 49-51 coverage)', () => {

    it('should allow navigation to /private if authGuard passes', async() => {
      // --- ARRANGE ---
      AUTH_SERVICE_MOCK.isAuthenticated.mockReturnValue(true);

      // --- ACT ---
      const INSTANCE = await harness.navigateByUrl('/private');

      // --- ASSERT ---
      expect(INSTANCE).toBeTruthy();
      expect(TestBed.inject(Router).url).toBe('/private');
    });

    it('should redirect to /home if authGuard fails (no token)', async() => {
      // --- ARRANGE ---
      const ROUTER = TestBed.inject(Router);
      const HOME_TREE = ROUTER.createUrlTree(['/home']);

      mockAuthGuard.mockReturnValue(HOME_TREE);

      // --- ACT ---
      await harness.navigateByUrl('/private');

      // --- ASSERT ---
      expect(TestBed.inject(Router).url).toBe('/home');
    });

    it('should redirect to unauthorized error if authGuard fails (token present but not authenticated)', async() => {
      // --- ARRANGE ---
      const ROUTER = TestBed.inject(Router);
      const ERROR_TREE = ROUTER.createUrlTree(['/error/unauthorized-error']);

      mockAuthGuard.mockReturnValue(ERROR_TREE);

      // --- ACT ---
      await harness.navigateByUrl('/private');

      // --- ASSERT ---
      expect(TestBed.inject(Router).url).toBe('/error/unauthorized-error');
    });
  });
});

describe('Route Configuration Integrity', () => {
  it('should be able to resolve the PublicLayoutComponent import', async() => {
    // --- ARRANGE ---
    const ROOT_ROUTE = ROUTES.find(r => r.path === '');

    // --- ACT ---
    const COMPONENT_IMPORT = await ROOT_ROUTE?.loadComponent!();

    // --- ASSERT ---
    expect(ROOT_ROUTE?.loadComponent).toBeDefined();
    expect(COMPONENT_IMPORT).toBeTruthy();
  });

  it('should be able to resolve the AdminLayoutComponent import', async() => {
    // --- ARRANGE ---
    const ADMIN_ROUTE = ROUTES.find(r => r.path === 'admin');

    // --- ACT ---
    const COMPONENT_IMPORT = await ADMIN_ROUTE?.loadComponent!();

    // --- ASSERT ---
    expect(ADMIN_ROUTE?.loadComponent).toBeDefined();
    expect(COMPONENT_IMPORT).toBeTruthy();
  });

});
