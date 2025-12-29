import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '@app/core/_services/auth/auth.service';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const adminGuard: CanActivateFn = () => {

  const AUTH_SERVICE = inject(AuthService);
  const ROUTER = inject(Router);

  if (AUTH_SERVICE.isAdmin()) {
    return true;
  }

  // Otherwise, redirection to login page...
  return ROUTER.parseUrl('/error/unauthorized');
};
