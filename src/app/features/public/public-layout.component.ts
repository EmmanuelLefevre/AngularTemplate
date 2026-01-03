import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderNavComponent } from '@shared/components/header/header-nav.component';
import { MainFooterComponent } from '@shared/components/footer/main-footer.component';
import { MockAdminLoginButtonComponent } from '@shared/components/dev/mock-admin-login-button/mock-admin-login-button.component';
import { ScrollToTopComponent } from '@shared/components/scroll-to-top/scroll-to-top.component';

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
