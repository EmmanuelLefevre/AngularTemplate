import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { filter, map, take } from 'rxjs';

import { AuthService } from '@core/_services/auth/auth.service';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const adminGuard: CanActivateFn = () => {

  const ONE_EMISSION = 1;

  const authService = inject(AuthService);
  const router = inject(Router);

  const getDecision = (): boolean | UrlTree => {
    if (authService.isAdmin()) {
      return true;
    }

    return authService.isAuthenticated()
      ? router.parseUrl('/error/forbidden-error')
      : router.parseUrl('/');
  };

  if (authService.isAuthLoaded()) {
    return getDecision();
  }

  return toObservable(authService.isAuthLoaded).pipe(
    filter((loaded) => loaded === true),
    take(ONE_EMISSION),
    map(() => getDecision())
  );
};
