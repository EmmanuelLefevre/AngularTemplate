import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/core/_services/auth/auth.service';
import { SNACKBAR_KEYS } from '@core/_config/snackbar/snackbar.constant';
import { SnackbarService } from '@app/core/_services/snackbar/snackbar.service';
import { ENVIRONMENT } from '@env/environment';

const NAVIGATION_DELAY_MS = 100;

@Component({
  selector: 'mock-admin-login-button',
  imports: [],
  templateUrl: './mock-admin-login-button.component.html',
  styleUrl: './mock-admin-login-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MockAdminLoginButtonComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackbarService = inject(SnackbarService);

  handleLogin(): void {
    this.authService.login({
      email: 'admin@test.com',
      password: ENVIRONMENT.mockAdminPassword ?? ''
    }).subscribe({
      next: () => {
        this.snackbarService.showNotification(SNACKBAR_KEYS.LOGIN_SUCCESS, 'logIn-logOut');

        setTimeout(() => {
          this.router.navigate(['/admin/dashboard']);
        }, NAVIGATION_DELAY_MS);
      },
      error: () => {
        this.snackbarService.showNotification(SNACKBAR_KEYS.LOGIN_ERROR, 'red-alert');
      }
    });
  }
}
