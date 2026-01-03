import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '@core/_services/auth/auth.service';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const authGuard: CanActivateFn = () => {

  const AUTH_SERVICE = inject(AuthService);
  const ROUTER = inject(Router);

  // Immediate signal verification
  if (AUTH_SERVICE.isAuthenticated()) {
    return true;
  }

  // If no token locally, return to homepage to login
  if (!localStorage.getItem('token')) {
    return ROUTER.parseUrl('/');
  }

  // If we have a token but not yet the user (refresh in progress)
  // We allow it or redirect it according to the initAuth() policy
  return ROUTER.parseUrl('/error/unauthorized-error');
};
