import { HttpContextToken, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * HTTP context token allowing bypassing the global error interceptor.
 * * CONTEXT OF USE :
 * Use this for "silent" or background requests (e.g., autosave, polling,
 * checking username availability). In these specific cases, if the request
 * fails (e.g., 404 or 500), the error must be handled silently or locally
 * by the component and must not trigger a sudden redirection of the user
 * to the site's global error page.
 * * @example
 * // Example of use on an HTTP call in a service
 * this.http.get('/api/check-status', {
 *   context: new HttpContext().set(BYPASS_GLOBAL_ERROR, true)
 * });
 */
export const BYPASS_GLOBAL_ERROR = new HttpContextToken<boolean>(() => false);

const BAD_REQUEST_STATUS = 400;
const MIN_HTTP_ERROR_STATUS = 400;
const NETWORK_ERROR_STATUS = 0;
const UNPROCESSABLE_ENTITY_STATUS = 422;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  // If request explicitly asks not to be intercepted, allowed it to pass.
  if (req.context.get(BYPASS_GLOBAL_ERROR)) {
    return next(req);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      // Make sure it's a real error (network = 0 or HTTP >= 400)
      const isRealError = error.status === NETWORK_ERROR_STATUS || error.status >= MIN_HTTP_ERROR_STATUS;

      // Filter validation errors that should be handled by the forms
      const isValidationError = error.status === BAD_REQUEST_STATUS || error.status === UNPROCESSABLE_ENTITY_STATUS;

      // Extracting base URL without parameters, after check we're not already on an error page to avoid infinite loops
      const [baseUrl] = router.url.split('?');
      const isAlreadyOnErrorPage = baseUrl.startsWith('/error');

      if (isRealError && !isValidationError && !isAlreadyOnErrorPage) {

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
