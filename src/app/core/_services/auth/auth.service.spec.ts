import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { authInterceptor } from '@core/interceptor/auth.interceptor';
import { ENVIRONMENT } from '@env/environment';
import { User } from '@core/_models/user/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  const MOCK_USER: User = { id: 1, username: 'AdminUser', email: 'admin@test.com', roles: ['ADMIN'] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and update signals/localStorage', () => {
    // --- ARRANGE ---
    const MOCK_CREDENTIALS = { email: 'admin@test.com', password: 'password' };
    const MOCK_RESPONSE = { user: MOCK_USER, token: 'fake-jwt-token' };

    // --- ACT ---
    service.login(MOCK_CREDENTIALS).subscribe(response => {
      // --- ASSERT (Inside Subscribe) ---
      expect(response.token).toBe('fake-jwt-token');
      expect(service.currentUser()).toEqual(MOCK_USER);
      expect(service.token()).toBe('fake-jwt-token');
      expect(localStorage.getItem('token')).toBe('fake-jwt-token');
    });

    // --- ASSERT (HTTP Verification) ---
    const REQUEST = httpMock.expectOne(`${ENVIRONMENT.apiUrl}/auth/login`);
    expect(REQUEST.request.method).toBe('POST');
    expect(REQUEST.request.body).toEqual(MOCK_CREDENTIALS);

    REQUEST.flush(MOCK_RESPONSE);
  });

  it('should reset signals on logout', () => {
    // --- ARRANGE ---
    service.currentUser.set(MOCK_USER);
    service.token.set('fake-token');

    // --- ACT ---
    service.logout();

    // --- ASSERT ---
    expect(service.currentUser()).toBeNull();
    expect(service.token()).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should correctly compute isAdmin', () => {
    // --- ARRANGE ---
    service.currentUser.set({ ...MOCK_USER, roles: ['USER'] });

    // --- ACT & ASSERT ---
    expect(service.isAdmin()).toBe(false);

    // --- ARRANGE ---
    service.currentUser.set({ ...MOCK_USER, roles: ['ADMIN'] });

    // --- ACT & ASSERT ---
    expect(service.isAdmin()).toBe(true);
  });

  it('should add Authorization header if token is present and URL is API', () => {
    // --- ARRANGE ---
    const FAKE_TOKEN = 'my-jwt-token';
    service.token.set(FAKE_TOKEN);

    // --- ACT ---
    httpClient.get(`${ENVIRONMENT.apiUrl}/test`).subscribe();

    // --- ASSERT ---
    const REQUEST = httpMock.expectOne(`${ENVIRONMENT.apiUrl}/test`);
    expect(REQUEST.request.headers.has('Authorization')).toBe(true);
    expect(REQUEST.request.headers.get('Authorization')).toBe(`Bearer ${FAKE_TOKEN}`);
  });

  it('should NOT add Authorization header for external URLs', () => {
    // --- ARRANGE ---
    service.token.set('some-token');
    const EXTERNAL_URL = 'https://google.com/api';

    // --- ACT ---
    httpClient.get(EXTERNAL_URL).subscribe();

    // --- ASSERT ---
    const REQUEST = httpMock.expectOne(EXTERNAL_URL);
    expect(REQUEST.request.headers.has('Authorization')).toBe(false);
  });

  it('should return null and NOT call HTTP if no token is present', () => {
    // --- ARRANGE ---
    service.token.set(null);

    // --- ACT ---
    const RESULT = service.refreshUser();

    // --- ASSERT ---
    expect(RESULT).toBeNull();
    httpMock.expectNone(`${ENVIRONMENT.apiUrl}/auth/me`);
  });

  it('should call GET /me and update currentUser when token is present', () => {
    // --- ARRANGE ---
    const FAKE_TOKEN = 'valid-token';
    service.token.set(FAKE_TOKEN);

    // --- ACT ---
    service.refreshUser()?.subscribe(user => {
      // --- ASSERT (Inside Subscribe) ---
      expect(user).toEqual(MOCK_USER);
      expect(service.currentUser()).toEqual(MOCK_USER);
    });

    // --- ASSERT (HTTP Verification) ---
    const REQUEST = httpMock.expectOne(`${ENVIRONMENT.apiUrl}/auth/me`);
    expect(REQUEST.request.method).toBe('GET');

    REQUEST.flush(MOCK_USER);
  });

  it('should return false when currentUser is null (initial state)', () => {
    // --- ARRANGE ---
    service.currentUser.set(null);

    // --- ACT & ASSERT ---
    // Test case : currentUser()? -> null -> ?? false
    expect(service.isAdmin()).toBe(false);
  });

  it('should return false when user does NOT have ADMIN role', () => {
    // --- ARRANGE ---
    const BASIC_USER: User = { ...MOCK_USER, roles: ['USER'] };
    service.currentUser.set(BASIC_USER);

    // --- ACT & ASSERT ---
    // Test case : roles.includes('ADMIN') -> false
    expect(service.isAdmin()).toBe(false);
  });

  it('should return true when user has ADMIN role', () => {
    // --- ARRANGE ---
    const ADMIN_USER: User = { ...MOCK_USER, roles: ['ADMIN', 'USER'] };
    service.currentUser.set(ADMIN_USER);

    // --- ACT & ASSERT ---
    // Test case : roles.includes('ADMIN') -> true
    expect(service.isAdmin()).toBe(true);
  });

  it('should return false when currentUser is null', () => {
    // --- ARRANGE ---
    service.currentUser.set(null);

    // --- ACT & ASSERT ---
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should return true when currentUser is set', () => {
    // --- ARRANGE ---
    service.currentUser.set(MOCK_USER);

    // --- ACT & ASSERT ---
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should initialize token signal with value from localStorage on creation', () => {
    // --- ARRANGE ---
    const PERSISTED_TOKEN = 'stored-token';
    localStorage.setItem('token', PERSISTED_TOKEN);

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    const NEW_SERVICE = TestBed.inject(AuthService);

    // --- ACT & ASSERT ---
    expect(NEW_SERVICE.token()).toBe(PERSISTED_TOKEN);
  });
});
