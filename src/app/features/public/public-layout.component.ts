import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MockAdminLoginButtonComponent } from '@app/shared/components/dev/mock-admin-login-button/mock-admin-login-button.component';
import { SHARED_LAYOUT_COMPONENTS } from '@shared';

@Component({
  selector: 'public-layout',
  imports: [
    MockAdminLoginButtonComponent,
    RouterOutlet,
    TranslateModule,
    ...SHARED_LAYOUT_COMPONENTS
  ],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PublicLayoutComponent {}
