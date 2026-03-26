import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { errorInterceptor } from './error.interceptor';

class MockRouter {
  url = '/home';
  navigate = vi.fn();
}

describe('errorInterceptor', () => {

  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let mockRouter: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        { provide: Router, useClass: MockRouter }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    mockRouter = TestBed.inject(Router) as unknown as MockRouter;
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

  it('should redirect to /error with the correct code if the server crashes (500 Error)', () => {
    // --- ARRANGE ---
    mockRouter.url = '/home';

    // --- ACT ---
    httpClient.get('/api/data').subscribe({
      error: (error: HttpErrorResponse) => {
        // --- ASSERT ---
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(error.status).toBe(500);
      }
    });

    const req = httpTestingController.expectOne('/api/data');
    req.flush('Server crash', { status: 500, statusText: 'Internal Server Error' });

    // --- ASSERT ---
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/error'], {
      queryParams: { code: '500' },
      replaceUrl: true
    });
  });

  it('should return an empty code if the error does not contain a status (e.g., Timeout)', () => {
    // --- ARRANGE ---
    mockRouter.url = '/home';

    // --- ACT ---
    httpClient.get('/api/data').subscribe({
      error: vi.fn()
    });

    const req = httpTestingController.expectOne('/api/data');
    req.flush('Network error', { status: 0, statusText: 'Unknown Error' });

    // --- ASSERT ---
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/error'], {
      queryParams: { code: '' },
      replaceUrl: true
    });
  });

  it('should NOT redirect if the user is ALREADY on an error page', () => {
    // --- ARRANGE ---
    mockRouter.url = '/error/generic-error';

    // --- ACT ---
    httpClient.get('/api/data').subscribe({
      error: vi.fn()
    });

    const req = httpTestingController.expectOne('/api/data');
    req.flush('Server crash', { status: 500, statusText: 'Internal Server Error' });

    // --- ASSERT ---
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
