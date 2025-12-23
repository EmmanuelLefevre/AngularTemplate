import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';
import { HEADER_NAV_LINKS } from '@core/config/nav-links.constant';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'header-nav',
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    LanguageToggleComponent
  ],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderNavComponent {
  protected readonly navLinks = HEADER_NAV_LINKS;

  public isMenuOpen = signal(false);

  public toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  public closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
