import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/core/_services/auth/auth.service';
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

  handleLogin(): void {
    this.authService.login({
      email: 'admin@test.com',
      password: ENVIRONMENT.mockAdminPassword
    }).subscribe({
      next: () => {
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard']);
        }, NAVIGATION_DELAY_MS);
      }
    });
  }
}
