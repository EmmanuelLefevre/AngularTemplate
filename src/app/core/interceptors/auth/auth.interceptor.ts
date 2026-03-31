import { HttpInterceptorFn } from '@angular/common/http';

import { ENVIRONMENT } from '@env/environment';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const IS_API_URL = req.url.startsWith(ENVIRONMENT.apiUrl);

  if (IS_API_URL) {
    req = req.clone({
      withCredentials: true
    });
  }

  return next(req);
};
