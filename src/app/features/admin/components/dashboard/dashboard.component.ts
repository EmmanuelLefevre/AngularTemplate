import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AuthService } from '@core/_services/auth/auth.service';

@Component({
  selector: 'dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardComponent {

  public readonly authService = inject(AuthService);
}
