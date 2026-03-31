import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { authInterceptor } from './auth.interceptor';
import { ENVIRONMENT } from '@env/environment';

describe('authInterceptor', () => {

  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting()
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add withCredentials: true if the request URL starts with the API URL', () => {
    // --- ARRANGE ---
    const API_ENDPOINT = `${ENVIRONMENT.apiUrl}/users`;

    // --- ACT ---
    httpClient.get(API_ENDPOINT).subscribe();

    // --- ASSERT ---
    const REQUEST = httpMock.expectOne(API_ENDPOINT);

    expect(REQUEST.request.method).toBe('GET');
    expect(REQUEST.request.withCredentials).toBe(true);

    REQUEST.flush({});
  });

  it('should NOT modify the request (no withCredentials) if the URL is external', () => {
    // --- ARRANGE ---
    const EXTERNAL_URL = 'https://api.github.com/users';

    // --- ACT ---
    httpClient.get(EXTERNAL_URL).subscribe();

    // --- ASSERT ---
    const REQUEST = httpMock.expectOne(EXTERNAL_URL);

    expect(REQUEST.request.method).toBe('GET');
    expect(REQUEST.request.withCredentials).toBeFalsy();

    REQUEST.flush({});
  });

  it('should NOT modify the request if the URL is a local asset', () => {
    // --- ARRANGE ---
    const LOCAL_ASSET_URL = './assets/i18n/fr.json';

    // --- ACT ---
    httpClient.get(LOCAL_ASSET_URL).subscribe();

    // --- ASSERT ---
    const REQUEST = httpMock.expectOne(LOCAL_ASSET_URL);

    expect(REQUEST.request.method).toBe('GET');
    expect(REQUEST.request.withCredentials).toBeFalsy();

    REQUEST.flush({});
  });
});
