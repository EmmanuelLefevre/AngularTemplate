import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '@core/_services/auth/auth.service';
import { ENVIRONMENT } from '@env/environment';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const AUTH_SERVICES = inject(AuthService);
  const TOKEN = AUTH_SERVICES.token();
  const IS_API_URL = req.url.startsWith(ENVIRONMENT.apiUrl);

  if (TOKEN && IS_API_URL) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
  }

  return next(req);
};
