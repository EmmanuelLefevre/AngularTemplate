import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MockAdminLoginButtonComponent } from '@app/shared/components/dev/mock-admin-login-button/mock-admin-login-button.component';
import { ScrollToTopComponent } from '@shared/components/scroll-to-top/scroll-to-top.component';
import { HeaderNavComponent } from '@app/shared/components/header/header-nav.component';
import { MainFooterComponent } from '@app/shared/components/footer/main-footer.component';

@Component({
  selector: 'public-layout',
  imports: [
    HeaderNavComponent,
    MainFooterComponent,
    MockAdminLoginButtonComponent,
    RouterOutlet,
    ScrollToTopComponent,
    TranslateModule
  ],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PublicLayoutComponent {}
