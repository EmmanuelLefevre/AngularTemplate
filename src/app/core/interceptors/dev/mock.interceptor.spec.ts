/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, provideHttpClient, withInterceptors } from '@angular/common/http';

import { ENVIRONMENT } from '@env/environment';
import { mockInterceptor } from './mock.interceptor';

const MOCK_DELAY_MS = 150;
const FIRST_USER = 1;
const SECOND_USER = 2;
const UNAUTHORIZED_HTTP_CODE = 401;

vi.mock('@env/environment', () => ({
  ENVIRONMENT: {
    useMocks: true,
    apiUrl: 'http://localhost:3000/api'
  }
}));

describe('mockInterceptor', () => {

  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    vi.useFakeTimers();

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([mockInterceptor])),
        provideHttpClientTesting(),
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    httpMock.verify();
  });

  it('should pass through when useMocks is false', () => {
    // --- ARRANGE ---
    ENVIRONMENT.useMocks = false;

    // --- ACT ---
    httpClient.get('/any-url').subscribe();

    // --- ASSERT ---
    const REQ = httpMock.expectOne('/any-url');
    expect(REQ.request.url).toBe('/any-url');
    ENVIRONMENT.useMocks = true;
  });

  describe('Auth Login', () => {
    it('should return 401 if password is not 1234', async() => {
      // --- ARRANGE ---
      let errorResponse: HttpErrorResponse | undefined;

      httpClient.post('/auth/login', { email: 'test@test.com', password: 'wrong' }).subscribe({
        next: () => {
          // If we get there, nterceptor returned a success (of) instead of an error
        },
        error: (err: HttpErrorResponse) => {
          errorResponse = err;
        }
      });

      // --- ACT ---
      await vi.advanceTimersByTimeAsync(MOCK_DELAY_MS);

      // --- ASSERT ---
      expect(errorResponse).toBeDefined();
      expect(errorResponse?.status).toBe(UNAUTHORIZED_HTTP_CODE);
      expect(errorResponse?.error.message).toContain('Invalid credentials');
    });

    it('should return admin data on successful admin login', async() => {
      // --- ARRANGE ---
      let response: any;
      const ADMIN_CREDENTIALS = { email: 'admin@test.com', password: '1234' };

      // --- ACT ---
      httpClient.post('/auth/login', ADMIN_CREDENTIALS).subscribe(res => response = res);
      await vi.advanceTimersByTimeAsync(MOCK_DELAY_MS);

      // --- ASSERT ---
      expect(response.token).toBe('mock-admin-token');
      expect(response.user.roles).toContain('ADMIN');
    });

    it('should return regular user data on successful user login', async() => {
      // --- ARRANGE ---
      let response: any;
      const ADMIN_CREDENTIALS_2 = { email: 'manu@test.com', password: '1234' };

      // --- ACT ---
      httpClient.post('/auth/login', ADMIN_CREDENTIALS_2).subscribe(res => response = res);
      await vi.advanceTimersByTimeAsync(MOCK_DELAY_MS);

      // --- ASSERT ---
      expect(response.token).toBe('mock-token-user-2');
      expect(response.user.username).toBe('Manu');
    });
  });

  describe('Auth Me', () => {

    const MOCK_USERS = [
      { id: 1, roles: ['ADMIN'], username: 'Admin' },
      { id: 2, roles: ['USER'], username: 'Manu' }
    ];

    it('should return admin user profile when token is admin', () => {
      // --- ARRANGE ---
      localStorage.setItem('token', 'mock-admin-token');

      // --- ACT ---
      httpClient.get('/auth/me').subscribe(res => {
        // --- ASSERT ---
        expect((res as any).username).toBe('Admin');
      });

      const ASSET_REQ = httpMock.expectOne('/assets/_data/mock-users.json');
      ASSET_REQ.flush(MOCK_USERS);
    });

    it('should return specific user by ID from token', () => {
      // --- ARRANGE ---
      localStorage.setItem('token', 'token-user-2');

      // --- ACT ---
      httpClient.get('/auth/me').subscribe(res => {
        // --- ASSERT ---
        expect((res as any).id).toBe(SECOND_USER);
      });

      const ASSET_REQ = httpMock.expectOne('/assets/_data/mock-users.json');
      ASSET_REQ.flush(MOCK_USERS);
    });

    it('should fallback to first user if token is invalid', () => {
      // --- ARRANGE ---
      localStorage.setItem('token', 'invalid-token');

      // --- ACT ---
      httpClient.get('/auth/me').subscribe(res => {
        // --- ASSERT ---
        expect((res as any).id).toBe(FIRST_USER);
      });

      const ASSET_REQ = httpMock.expectOne('/assets/_data/mock-users.json');
      ASSET_REQ.flush(MOCK_USERS);
    });

    it('should handle missing token in localStorage by using an empty string', () => {
      // --- ARRANGE ---
      localStorage.removeItem('token');
      const MOCK_USERS_2 = [{ id: 1, roles: ['ADMIN'], username: 'Admin' }];

      // --- ACT ---
      httpClient.get('/auth/me').subscribe(res => {
        // --- ASSERT ---
        expect((res as any).id).toBe(FIRST_USER);
      });

      httpMock.expectOne('/assets/_data/mock-users.json').flush(MOCK_USERS_2);
    });
  });

  describe('Pass-through Logic', () => {
    it('should pass through when useMocks is false', () => {
      // --- ARRANGE ---
      ENVIRONMENT.useMocks = false;

      // --- ACT ---
      httpClient.get('/any-url').subscribe();

      // --- ASSERT ---
      const REQ = httpMock.expectOne('/any-url');
      expect(REQ.request.url).toBe('/any-url');
      ENVIRONMENT.useMocks = true;
    });

    it('should pass through for unknown URLs (not login, not me)', () => {
      // --- ARRANGE ---
      const UNKNOWN_URL = '/api/other-resource';

      // --- ACT ---
      httpClient.get(UNKNOWN_URL).subscribe();

      // --- ASSERT ---
      const REQ = httpMock.expectOne(UNKNOWN_URL);
      expect(REQ.request.url).toBe(UNKNOWN_URL);
    });
  });
});
