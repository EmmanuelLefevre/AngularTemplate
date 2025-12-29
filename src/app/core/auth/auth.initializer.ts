import { Observable, of } from 'rxjs';

import { AuthService } from '@core/_services/auth/auth.service';
import { User } from '@core/_models/user/user.model';

export function initializeAppCustom(authService: AuthService) {

  return (): Observable<User | null> => {
    const REFRESH$ = authService.refreshUser();

    // If refreshUser() returns null (no token), the initialization is released immediately.
    // Otherwise, Angular will wait for the Observable (GET /me) to finish.
    return REFRESH$ ? REFRESH$ : of(null);
  };
}
