/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { authGuard } from '@core/guards/auth/auth.guard';
import { adminGuard } from '@core/guards/admin/admin.guard';
import { AuthService } from '@core/_services/auth/auth.service';
import { ROUTES } from '@app/app.routes';

@Component({
  selector: 'mock-layout',
  imports: [RouterOutlet],
  template: '<router-outlet />'
})
class MockLayoutComponent {}

describe('App Routes', () => {

  let harness: RouterTestingHarness;
  let router: Router;

  const AUTH_SERVICE_MOCK = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    currentUser: signal<any>(undefined),
    isAdmin: vi.fn(),
    isAuthenticated: vi.fn()
  };

  const mockAuthGuard = vi.fn();
  const mockAdminGuard = vi.fn();

  beforeEach(async() => {
    vi.clearAllMocks();
    AUTH_SERVICE_MOCK.isAuthenticated.mockReturnValue(false);
    mockAuthGuard.mockReturnValue(true);
    mockAdminGuard.mockReturnValue(true);

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
        { provide: authGuard, useValue: () => mockAuthGuard() },
        { provide: adminGuard, useValue: () => mockAdminGuard() }
      ]
    });

    router = TestBed.inject(Router);
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
      { path: '/error/forbidden-error' },
      { path: '/error/unfound-error' },
      { path: '/error/server-error' },
      { path: '/error/generic-error' },
      { path: '/error/unknown-error' },
      { path: '/error/timeout-error' },
      { path: '/error/maintenance-error' },
    ];

    it.each(ERROR_CASES)('should successfully load component for $path', async({ path }) => {
      // --- ACT ---
      const COMPONENT_INSTANCE = await harness.navigateByUrl(path);

      // --- ASSERT ---
      expect(TestBed.inject(Router).url).toBe(path);
      expect(COMPONENT_INSTANCE).toBeTruthy();
    });
  });

  describe('Private Route', () => {

    it('should allow navigation to /private if authGuard returns true', async() => {
      // --- ARRANGE ---
      mockAuthGuard.mockReturnValue(true);

      // --- ACT ---
      const INSTANCE = await harness.navigateByUrl('/private');

      // --- ASSERT ---
      expect(INSTANCE).toBeTruthy();
      expect(router.url).toBe('/private');
    });

    it('should redirect to root (/) if authGuard rejects unauthenticated user', async() => {
      // --- ARRANGE ---
      mockAuthGuard.mockReturnValue(router.parseUrl('/'));

      // --- ACT ---
      await harness.navigateByUrl('/private');

      // --- ASSERT ---
      expect(router.url).toBe('/home');
    });
  });

  describe('Admin Route (Protected by adminGuard)', () => {

    it('should allow access to /admin if adminGuard returns true', async() => {
      // --- ARRANGE ---
      mockAdminGuard.mockReturnValue(true);

      // --- ACT ---
      const INSTANCE = await harness.navigateByUrl('/admin');

      // --- ASSERT ---
      expect(INSTANCE).toBeTruthy();
      expect(router.url).toBe('/admin');
    });

    it('should redirect to root (/) if adminGuard rejects visitor (401 case)', async() => {
      // --- ARRANGE ---
      mockAdminGuard.mockReturnValue(router.parseUrl('/'));

      // --- ACT ---
      await harness.navigateByUrl('/admin');

      // --- ASSERT ---
      expect(router.url).toBe('/home');
    });

    it('should redirect to forbidden-error if adminGuard rejects non-admin user (403 case)', async() => {
      // --- ARRANGE ---
      const FORBIDDEN_TREE = router.parseUrl('/error/forbidden-error');
      mockAdminGuard.mockReturnValue(FORBIDDEN_TREE);

      // --- ACT ---
      await harness.navigateByUrl('/admin');

      // --- ASSERT ---
      expect(router.url).toBe('/error/forbidden-error');
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
});

describe('Route SEO Data Integrity', () => {
  // --- SETUP VARIABLES ---
  const publicLayoutRoute = ROUTES.find(r => r.path === '');
  const publicRoutes = publicLayoutRoute?.children || [];

  const errorLayoutRoute = publicRoutes.find(r => r.path === 'error');
  const errorRoutes = errorLayoutRoute?.children || [];

  it('should contain valid and EXACT SEO metadata for public views', () => {
    // --- ARRANGE ---
    const expectedPublicSeo = [
      { path: 'home', titleKey: 'META.PAGES.HOME.TITLE', descriptionKey: 'META.PAGES.HOME.DESCRIPTION' },
      { path: 'login', titleKey: 'META.PAGES.LOGIN.TITLE', descriptionKey: 'META.PAGES.LOGIN.DESCRIPTION' },
      { path: 'contact', titleKey: 'META.PAGES.CONTACT.TITLE', descriptionKey: 'META.PAGES.CONTACT.DESCRIPTION' }
    ];

    // --- ACT & ASSERT ---
    expectedPublicSeo.forEach(expected => {
      const route = publicRoutes.find(r => r.path === expected.path);

      expect(route).toBeDefined();
      expect(route?.data?.['seo']).toBeDefined();

      expect(route?.data?.['seo']?.titleKey).toBe(expected.titleKey);
      expect(route?.data?.['seo']?.descriptionKey).toBe(expected.descriptionKey);
    });
  });

  it('should contain valid and EXACT SEO metadata (including robots) for error views', () => {
    // --- ARRANGE ---
    const expectedErrorSeo = [
      { path: 'unauthorized-error', titleKey: 'META.PAGES.ERROR.401.TITLE', descriptionKey: 'META.PAGES.ERROR.401.DESCRIPTION' },
      { path: 'forbidden-error', titleKey: 'META.PAGES.ERROR.403.TITLE', descriptionKey: 'META.PAGES.ERROR.403.DESCRIPTION' },
      { path: 'unfound-error', titleKey: 'META.PAGES.ERROR.404.TITLE', descriptionKey: 'META.PAGES.ERROR.404.DESCRIPTION' },
      { path: 'server-error', titleKey: 'META.PAGES.ERROR.500.TITLE', descriptionKey: 'META.PAGES.ERROR.500.DESCRIPTION' },
      { path: 'generic-error', titleKey: 'META.PAGES.ERROR.GENERIC.TITLE', descriptionKey: 'META.PAGES.ERROR.GENERIC.DESCRIPTION' },
      { path: 'unknown-error', titleKey: 'META.PAGES.ERROR.UNKNOWN.TITLE', descriptionKey: 'META.PAGES.ERROR.UNKNOWN.DESCRIPTION' },
      { path: 'timeout-error', titleKey: 'META.PAGES.ERROR.408.TITLE', descriptionKey: 'META.PAGES.ERROR.408.DESCRIPTION' }
      ,
      { path: 'maintenance-error', titleKey: 'META.PAGES.ERROR.503.TITLE', descriptionKey: 'META.PAGES.ERROR.503.DESCRIPTION' }
    ];

    // --- ACT & ASSERT ---
    expectedErrorSeo.forEach(expected => {
      const route = errorRoutes.find(r => r.path === expected.path);

      expect(route).toBeDefined();
      expect(route?.data?.['seo']).toBeDefined();

      expect(route?.data?.['seo']?.titleKey).toBe(expected.titleKey);
      expect(route?.data?.['seo']?.descriptionKey).toBe(expected.descriptionKey);

      expect(route?.data?.['seo']?.robots).toBe('noindex, nofollow');
    });
  });

  it('should have a global "noindex, nofollow" on the parent error layout route', () => {
    // --- ACT & ASSERT ---
    expect(errorLayoutRoute?.data?.['seo']?.robots).toBe('noindex, nofollow');
  });
});
