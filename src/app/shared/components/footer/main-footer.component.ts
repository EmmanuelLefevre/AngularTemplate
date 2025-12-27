import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { FOOTER_SOCIAL_LINKS, EXTERNAL_LINKS } from '@app/core/_config/social-links.constant';

@Component({
  selector: 'main-footer',
  imports: [
    FontAwesomeModule,
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
  protected readonly currentYear = new Date().getFullYear();
}
