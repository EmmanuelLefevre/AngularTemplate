import { HttpClient, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, map, of } from 'rxjs';

import { ENVIRONMENT } from '@env/environment';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const mockInterceptor: HttpInterceptorFn = (req, next) => {

  const ADMIN_ID = 1;
  const DEFAULT_USER_ID = 2;
  const MOCK_DELAY_MS = 150;
  const FIRST_ARRAY_INDEX = 0;
  const HTTP_STATUS_OK = 200;
  const TOKEN_USER_PREFIX = 'token-user-';

  const HTTP = inject(HttpClient);

  if (!ENVIRONMENT.useMocks) {
    return next(req);
  }

  if (req.url.endsWith('/auth/login') && req.method === 'POST') {
    const BODY = req.body as {
      email: string;
      password: string;
    };

    if (BODY?.password !== '1234') {
      return of(new HttpResponse({
        status: 401,
        body: { message: 'Invalid credentials (Try "1234")' }
      })).pipe(delay(MOCK_DELAY_MS));
    }

    const IS_ADMIN: boolean = BODY.email.toLowerCase() === 'admin@test.com';

    return of(new HttpResponse({
      status: HTTP_STATUS_OK,
      body: {
        token: IS_ADMIN ? 'mock-admin-token' : 'mock-token-user-2',
        user: {
          id: IS_ADMIN ? ADMIN_ID : DEFAULT_USER_ID,
          username: IS_ADMIN ? 'Admin' : 'Manu',
          roles: IS_ADMIN ? ['ADMIN', 'USER'] : ['USER']
        }
      }
    })).pipe(delay(MOCK_DELAY_MS));
  }

  if (req.url.endsWith('/auth/me') && req.method === 'GET') {
    const TOKEN = localStorage.getItem('token') || '';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return HTTP.get<any[]>('/assets/_data/mock-users.json').pipe(
      map(users => {
        const IS_ADMIN = TOKEN.includes('admin');
        const USER = users.find(u => {
          if (IS_ADMIN) {
            return u.roles.includes('ADMIN');
          }

          const USER_ID = Number(TOKEN.replace(TOKEN_USER_PREFIX, ''));

          return u.id === USER_ID;
        });

        return new HttpResponse({
          status: HTTP_STATUS_OK,
          body: USER || users[FIRST_ARRAY_INDEX] });
      })
    );
  }

  return next(req);
};
