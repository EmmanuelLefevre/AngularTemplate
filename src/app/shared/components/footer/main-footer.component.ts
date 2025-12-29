import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { EXTERNAL_LINKS, FOOTER_SOCIAL_LINKS } from '@core/_config/links/social-links.constant';
import { HOSTING_INFOS } from '@core/_config/links/host-links.constant';

@Component({
  selector: 'main-footer',
  imports: [
    FontAwesomeModule,
    MatTooltipModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './main-footer.component.html',
  styleUrl: './main-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainFooterComponent {
  protected readonly socialLinks = FOOTER_SOCIAL_LINKS;
  protected readonly externalLinks = EXTERNAL_LINKS;
  protected readonly hosting = HOSTING_INFOS;

  protected readonly currentYear = new Date().getFullYear();
}
