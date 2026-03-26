import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const NETWORK_ERROR_STATUS = 0;
const MIN_HTTP_ERROR_STATUS = 400;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      // Make sure it's a real error (network = 0 or HTTP >= 400)
      const isRealError = error.status === NETWORK_ERROR_STATUS || error.status >= MIN_HTTP_ERROR_STATUS;

      // Check we are not already on an error page to avoid infinite loops
      if (isRealError && !router.url.includes('error')) {

        // Retrieve code (or leave it blank if we can't read it)
        const errorCode = error.status ? String(error.status) : '';

        router.navigate(['/error'], {
          queryParams: { code: errorCode },
          // Replaces URL in history to not break browser's back button
          replaceUrl: true
        });
      }

      return throwError(() => error);
    })
  );
};