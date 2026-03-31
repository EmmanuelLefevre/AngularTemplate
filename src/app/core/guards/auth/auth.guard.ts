import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

import { AuthService } from '@core/_services/auth/auth.service';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const unauthorizedTree = router.parseUrl('/error/unauthorized-error');

  if (authService.isAuthLoaded()) {
    return authService.isAuthenticated() ? true : unauthorizedTree;
  }

  // If status is 'undefined' (page refresh), wait for the API call to complete
  return toObservable(authService.isAuthLoaded).pipe(
    filter((isLoaded) => isLoaded === true),
    map(() => authService.isAuthenticated() ? true : unauthorizedTree)
  );
};
