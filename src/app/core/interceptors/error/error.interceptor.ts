import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      // Check we are not already on an error page to avoid infinite loops
      if (!router.url.includes('error')) {

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
