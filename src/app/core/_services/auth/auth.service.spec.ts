import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { ENVIRONMENT } from '@env/environment';
import { User } from '@core/_models/user/user.model';
import { BYPASS_GLOBAL_ERROR } from '@core/interceptors/error/error.interceptor';

describe('AuthService', () => {

  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  const MOCK_USER: User = { id: 1, username: 'TestUser', email: 'test@test.com', roles: ['ADMIN'] };

  beforeEach(() => {
    const ROUTER_MOCK = {
      navigate: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: ROUTER_MOCK }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login with credentials, send withCredentials and update signal', () => {
    // --- ARRANGE ---
    const MOCK_CREDENTIALS = { email: 'test@test.com', password: 'password' };

    // --- ACT ---
    service.login(MOCK_CREDENTIALS).subscribe((user) => {

      // --- ASSERT ---
      expect(user).toEqual(MOCK_USER);
      expect(service.currentUser()).toEqual(MOCK_USER);
    });

    // --- ASSERT ---
    const REQUEST = httpMock.expectOne(`${ENVIRONMENT.apiUrl}/auth/login`);

    expect(REQUEST.request.method).toBe('POST');
    expect(REQUEST.request.body).toEqual(MOCK_CREDENTIALS);
    expect(REQUEST.request.withCredentials).toBe(true);

    REQUEST.flush(MOCK_USER);
  });

  it('should call GET /me, send withCredentials + bypass context and update currentUser on success', () => {
    // --- ACT ---

    service.initAuth().subscribe((user) => {
      // --- ASSERT ---
      expect(user).toEqual(MOCK_USER);
      expect(service.currentUser()).toEqual(MOCK_USER);
    });

    // --- ASSERT ---
    const REQUEST = httpMock.expectOne(`${ENVIRONMENT.apiUrl}/auth/me`);

    expect(REQUEST.request.method).toBe('GET');
    expect(REQUEST.request.withCredentials).toBe(true);
    expect(REQUEST.request.context.get(BYPASS_GLOBAL_ERROR)).toBe(true);

    REQUEST.flush(MOCK_USER);
  });

  it('should set currentUser to null and return null if initAuth fails (401 Unauthorized)', () => {
    // --- ACT ---
    service.initAuth().subscribe((result) => {

      // --- ASSERT ---
      expect(result).toBeNull();
      expect(service.currentUser()).toBeNull();
    });

    // --- ASSERT ---
    const REQUEST = httpMock.expectOne(`${ENVIRONMENT.apiUrl}/auth/me`);

    REQUEST.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });

  it('should call API logout, clear session and navigate to home on success', () => {
    // --- ARRANGE ---
    service.currentUser.set(MOCK_USER);

    // --- ACT ---
    service.logout();

    // --- ASSERT ---
    const REQUEST = httpMock.expectOne(`${ENVIRONMENT.apiUrl}/auth/logout`);

    expect(REQUEST.request.method).toBe('POST');
    expect(REQUEST.request.withCredentials).toBe(true);

    REQUEST.flush({});

    expect(service.currentUser()).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should still clear session and navigate to home even if API logout fails', () => {
    // --- ARRANGE ---
    service.currentUser.set(MOCK_USER);

    // --- ACT ---
    service.logout();

    // --- ASSERT ---
    const REQUEST = httpMock.expectOne(`${ENVIRONMENT.apiUrl}/auth/logout`);

    REQUEST.flush('Server Error', { status: 500, statusText: 'Server Error' });

    expect(service.currentUser()).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should correctly compute isAuthenticated', () => {
    // --- ASSERT ---
    expect(service.isAuthenticated()).toBe(false);

    // --- ARRANGE & ACT ---
    service.currentUser.set(null);

    // --- ASSERT ---
    expect(service.isAuthenticated()).toBe(false);

    // --- ARRANGE & ACT ---
    service.currentUser.set(MOCK_USER);

    // --- ASSERT ---
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should correctly compute isAuthLoaded', () => {
    // --- ASSERT ---
    expect(service.isAuthLoaded()).toBe(false);

    // --- ARRANGE & ACT ---
    service.currentUser.set(null);

    // --- ASSERT ---
    expect(service.isAuthLoaded()).toBe(true);

    // --- ARRANGE & ACT ---
    service.currentUser.set(MOCK_USER);

    // --- ASSERT ---
    expect(service.isAuthLoaded()).toBe(true);
  });

  it('should return false for isAdmin when currentUser is undefined (initial state)', () => {
    // --- ARRANGE ---
    // currentUser est undefined par défaut dans le service

    // --- ACT & ASSERT ---
    expect(service.isAdmin()).toBe(false);
  });

  it('should return false for isAdmin when currentUser is null (logged out)', () => {
    // --- ARRANGE ---
    service.currentUser.set(null);

    // --- ACT & ASSERT ---
    expect(service.isAdmin()).toBe(false);
  });

  it('should return false for isAdmin when user has only USER role', () => {
    // --- ARRANGE ---
    const STANDARD_USER: User = {
      id: 2,
      username: 'Standard',
      email: 'user@test.com',
      roles: ['USER']
    };
    service.currentUser.set(STANDARD_USER);

    // --- ACT & ASSERT ---
    expect(service.isAdmin()).toBe(false);
  });

  it('should return true for isAdmin when user has ADMIN role', () => {
    // --- ARRANGE ---
    const ADMIN_USER: User = {
      id: 1,
      username: 'Boss',
      email: 'admin@test.com',
      roles: ['ADMIN']
    };
    service.currentUser.set(ADMIN_USER);

    // --- ACT & ASSERT ---
    expect(service.isAdmin()).toBe(true);
  });

  it('should return true for isAdmin when user has multiple roles including ADMIN', () => {
    // --- ARRANGE ---
    const MULTI_ROLE_USER: User = {
      id: 3,
      username: 'SuperUser',
      email: 'super@test.com',
      roles: ['USER', 'ADMIN']
    };
    service.currentUser.set(MULTI_ROLE_USER);

    // --- ACT & ASSERT ---
    expect(service.isAdmin()).toBe(true);
  });
});
