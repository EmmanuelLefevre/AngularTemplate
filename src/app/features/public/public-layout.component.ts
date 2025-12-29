import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SHARED_LAYOUT_COMPONENTS } from '@shared';
import { AuthService } from '@core/_services/auth/auth.service';

const NAVIGATION_DELAY_MS = 100;

@Component({
  selector: 'public-layout',
  imports: [
    RouterOutlet,
    TranslateModule,
    ...SHARED_LAYOUT_COMPONENTS
  ],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PublicLayoutComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  forceAdminLogin(): void {
    this.authService.login({
      email: 'admin@test.com',
      password: '1234'
    }).subscribe({
      next: () => {
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard']);
        }, NAVIGATION_DELAY_MS);
      }
    });
  }
}
