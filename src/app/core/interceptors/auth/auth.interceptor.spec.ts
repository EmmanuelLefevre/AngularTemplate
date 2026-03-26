import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { AuthService } from '@core/_services/auth/auth.service';
import { ENVIRONMENT } from '@env/environment';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {

  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  const AUTH_SERVICE_MOCK = {
    token: signal<string | null>(null)
  };

  const API_URL = ENVIRONMENT.apiUrl;
  const EXTERNAL_URL = 'https://external-api.com/data';
  const MOCK_TOKEN = 'my-fake-token';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: AUTH_SERVICE_MOCK }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

    AUTH_SERVICE_MOCK.token.set(null);
  });

  it('should add Authorization header when token exists and URL is API URL', () => {
    // --- ARRANGE ---
    AUTH_SERVICE_MOCK.token.set(MOCK_TOKEN);

    // --- ACT ---
    httpClient.get(`${API_URL}/users`).subscribe();

    // --- ASSERT ---
    const REQ = httpMock.expectOne(`${API_URL}/users`);
    expect(REQ.request.headers.has('Authorization')).toBe(true);
    expect(REQ.request.headers.get('Authorization')).toBe(`Bearer ${MOCK_TOKEN}`);
    REQ.flush({});
  });

  it('should NOT add Authorization header when token exists but URL is NOT API URL', () => {
    // --- ARRANGE ---
    AUTH_SERVICE_MOCK.token.set(MOCK_TOKEN);

    // --- ACT ---
    httpClient.get(EXTERNAL_URL).subscribe();

    // --- ASSERT ---
    const REQ = httpMock.expectOne(EXTERNAL_URL);
    expect(REQ.request.headers.has('Authorization')).toBe(false);
    REQ.flush({});
  });

  it('should NOT add Authorization header when URL is correct but token is missing', () => {
    // --- ARRANGE ---
    AUTH_SERVICE_MOCK.token.set(null);

    // --- ACT ---
    httpClient.get(`${API_URL}/users`).subscribe();

    // --- ASSERT ---
    const REQ = httpMock.expectOne(`${API_URL}/users`);
    expect(REQ.request.headers.has('Authorization')).toBe(false);
    REQ.flush({});
  });
});
