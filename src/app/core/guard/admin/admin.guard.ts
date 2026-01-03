import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

import { AuthService } from '@core/_services/auth/auth.service';
import { filter, map, take } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const adminGuard: CanActivateFn = () => {

  const ONE_EMISSION = 1;

  const AUTH_SERVICE = inject(AuthService);
  const ROUTER = inject(Router);

  if (AUTH_SERVICE.currentUser() && AUTH_SERVICE.isAdmin()) {
    return true;
  }

  if (!localStorage.getItem('token')) {
    return ROUTER.parseUrl('/');
  }

  return toObservable(AUTH_SERVICE.currentUser).pipe(
    filter((user) => user !== undefined),
    take(ONE_EMISSION),
    map((user): boolean | UrlTree => {
      if (user?.roles.includes('ADMIN')) {
        return true;
      }

      return ROUTER.parseUrl('/error/unauthorized-error');
    })
  );
};
