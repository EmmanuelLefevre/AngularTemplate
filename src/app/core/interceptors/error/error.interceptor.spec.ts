import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpContext, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { signal } from '@angular/core';

import { errorInterceptor, BYPASS_GLOBAL_ERROR } from './error.interceptor';
import { AuthService } from '@core/_services/auth/auth.service';

class MockRouter {
  url = '/home';
  navigate = vi.fn();
}

describe('errorInterceptor', () => {

  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let mockRouter: MockRouter;

  const AUTH_SERVICE_MOCK = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    currentUser: signal<any>({ id: 1, name: 'Test' })
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        { provide: Router, useClass: MockRouter },
        { provide: AuthService, useValue: AUTH_SERVICE_MOCK }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    mockRouter = TestBed.inject(Router) as unknown as MockRouter;

    AUTH_SERVICE_MOCK.currentUser.set({ id: 1, name: 'Test' });
  });

  afterEach(() => {
    httpTestingController.verify();
    vi.clearAllMocks();
  });

  it('should let the request pass without doing anything if successful (200 OK)', () => {
    // --- ACT ---
    httpClient.get('/api/data').subscribe();
    const req = httpTestingController.expectOne('/api/data');

    req.flush({ data: 'ok' });

    // --- ASSERT ---
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to /error/server-error with the correct code if the server crashes (500 Error)', () => {
    // --- ARRANGE ---
    mockRouter.url = '/home';

    // --- ACT ---
    httpClient.get('/api/data').subscribe({ error: vi.fn() });

    const req = httpTestingController.expectOne('/api/data');
    req.flush('Server crash', { status: 500, statusText: 'Internal Server Error' });

    // --- ASSERT ---
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/error/server-error'], {
      queryParams: { code: '500' },
      replaceUrl: true
    });
  });

  it('should redirect to /error/forbidden-error when hitting a 403 Forbidden', () => {
    // --- ARRANGE ---
    mockRouter.url = '/home';

    // --- ACT ---
    httpClient.get('/api/data').subscribe({ error: vi.fn() });

    const req = httpTestingController.expectOne('/api/data');
    req.flush('Forbidden', { status: 403, statusText: 'Forbidden' });

    // --- ASSERT ---
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/error/forbidden-error'], {
      queryParams: { code: '403' },
      replaceUrl: true
    });
  });

  it('should redirect to /error/unfound-error when hitting a 404 Not Found', () => {
    // --- ARRANGE ---
    mockRouter.url = '/home';

    // --- ACT ---
    httpClient.get('/api/data').subscribe({ error: vi.fn() });

    const req = httpTestingController.expectOne('/api/data');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });

    // --- ASSERT ---
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/error/unfound-error'], {
      queryParams: { code: '404' },
      replaceUrl: true
    });
  });

  it('should redirect to /error/generic-error for unhandled specific errors (e.g. 502 Bad Gateway)', () => {
    // --- ARRANGE ---
    mockRouter.url = '/home';

    // --- ACT ---
    httpClient.get('/api/data').subscribe({ error: vi.fn() });

    const req = httpTestingController.expectOne('/api/data');
    req.flush('Bad Gateway', { status: 502, statusText: 'Bad Gateway' });

    // --- ASSERT ---
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/error/generic-error'], {
      queryParams: { code: '502' },
      replaceUrl: true
    });
  });

  it('should redirect to /error/unknown-error and return an empty code if the error is a network failure (status 0)', () => {
    // --- ARRANGE ---
    mockRouter.url = '/home';

    // --- ACT ---
    httpClient.get('/api/data').subscribe({ error: vi.fn() });

    const req = httpTestingController.expectOne('/api/data');
    req.flush('Network error', { status: 0, statusText: 'Unknown Error' });

    // --- ASSERT ---
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/error/unknown-error'], {
      queryParams: undefined,
      replaceUrl: true
    });
  });

  it('should set currentUser to null AND redirect to unauthorized-error on 401', () => {
    // --- ARRANGE ---
    mockRouter.url = '/home';

    // --- ACT ---
    httpClient.get('/api/data').subscribe({ error: vi.fn() });

    const req = httpTestingController.expectOne('/api/data');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    // --- ASSERT ---
    expect(AUTH_SERVICE_MOCK.currentUser()).toBeNull();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/error/unauthorized-error'], {
      queryParams: { code: '401' },
      replaceUrl: true
    });
  });

  it('should NOT redirect if the user is ALREADY on an error page', () => {
    // --- ARRANGE ---
    mockRouter.url = '/error/generic-error';

    // --- ACT ---
    httpClient.get('/api/data').subscribe({ error: vi.fn() });

    const req = httpTestingController.expectOne('/api/data');
    req.flush('Server crash', { status: 500, statusText: 'Internal Server Error' });

    // --- ASSERT ---
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should NOT redirect for informational status codes (1xx)', () => {
    // --- ARRANGE ---
    mockRouter.url = '/home';

    // --- ACT ---
    httpClient.get('/api/data').subscribe({
      error: vi.fn()
    });

    const req = httpTestingController.expectOne('/api/data');
    req.flush('Info', { status: 100, statusText: 'Continue' });

    // --- ASSERT ---
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should NOT redirect for redirection status codes (3xx)', () => {
    // --- ARRANGE ---
    mockRouter.url = '/home';

    // --- ACT ---
    httpClient.get('/api/data').subscribe({
      error: vi.fn()
    });

    const req = httpTestingController.expectOne('/api/data');
    req.flush('Redirect', { status: 302, statusText: 'Found' });

    // --- ASSERT ---
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should NOT redirect for validation errors (400 Bad Request)', () => {
    // --- ARRANGE ---
    mockRouter.url = '/login';

    // --- ACT ---
    httpClient.get('/api/data').subscribe({
      error: vi.fn()
    });

    const req = httpTestingController.expectOne('/api/data');
    req.flush('Bad form data', { status: 400, statusText: 'Bad Request' });

    // --- ASSERT ---
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should NOT redirect for validation errors (422 Unprocessable Entity)', () => {
    // --- ARRANGE ---
    mockRouter.url = '/login';

    // --- ACT ---
    httpClient.get('/api/data').subscribe({
      error: vi.fn()
    });

    const req = httpTestingController.expectOne('/api/data');
    req.flush('Invalid fields', { status: 422, statusText: 'Unprocessable Entity' });

    // --- ASSERT ---
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should NOT redirect if BYPASS_GLOBAL_ERROR token is provided, even on 500 Error', () => {
    // --- ARRANGE ---
    mockRouter.url = '/home';
    const context = new HttpContext().set(BYPASS_GLOBAL_ERROR, true);

    // --- ACT ---
    httpClient.get('/api/data', { context }).subscribe({
      error: vi.fn()
    });

    const req = httpTestingController.expectOne('/api/data');
    req.flush('Background sync failed', { status: 500, statusText: 'Internal Server Error' });

    // --- ASSERT ---
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to maintenance-error when status is 503 (Lines 94-95)', () => {
    // --- ARRANGE ---
    mockRouter.url = '/home';

    // --- ACT ---
    httpClient.get('/api/data').subscribe({ error: vi.fn() });
    const req = httpTestingController.expectOne('/api/data');

    // On simule précisément le code 503
    req.flush('Service Unavailable', { status: 503, statusText: 'Service Unavailable' });

    // --- ASSERT ---
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/error/maintenance-error'], expect.objectContaining({
      queryParams: { code: '503' }
    }));
  });

  it('should fall back to unknown-error via the DEFAULT branch for non-standard codes (Line 101)', () => {
    // --- ARRANGE ---
    mockRouter.url = '/home';
    const EXOTIC_CODE = 666;

    // --- ACT ---
    httpClient.get('/api/data').subscribe({ error: vi.fn() });
    const req = httpTestingController.expectOne('/api/data');

    req.flush('Devil Error', { status: EXOTIC_CODE, statusText: 'Exotic Error' });

    // --- ASSERT ---
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/error/unknown-error'], expect.objectContaining({
      queryParams: { code: '666' }
    }));
  });

  const scenarios = [
    { status: 0, dest: 'unknown-error', code: '' },
    { status: 401, dest: 'unauthorized-error', code: '401' },
    { status: 403, dest: 'forbidden-error', code: '403' },
    { status: 404, dest: 'unfound-error', code: '404' },
    { status: 408, dest: 'timeout-error', code: '408' },
    { status: 500, dest: 'server-error', code: '500' },
    { status: 503, dest: 'maintenance-error', code: '503' },
    { status: 504, dest: 'timeout-error', code: '504' },
    { status: 502, dest: 'generic-error', code: '502' },
  ];

  scenarios.forEach(({ status, dest, code }) => {
    it(`should redirect to ${dest} for status ${status}`, () => {
      // --- ARRANGE ---
      mockRouter.url = '/home';

      // --- ACT ---
      httpClient.get('/api/data').subscribe({ error: vi.fn() });
      const req = httpTestingController.expectOne('/api/data');
      req.flush('Error', { status, statusText: 'Error' });

      // --- ASSERT ---
      expect(mockRouter.navigate).toHaveBeenCalledWith([`/error/${dest}`], {
        queryParams: code ? { code } : undefined,
        replaceUrl: true
      });

      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (status === 401) {
        expect(AUTH_SERVICE_MOCK.currentUser()).toBeNull();
      }
    });
  });
});
