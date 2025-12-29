import { ChangeDetectionStrategy, Component, effect, inject, Renderer2, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';

import { HEADER_NAV_LINKS } from '@core/_config/links/nav-links.constant';

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
  private readonly renderer = inject(Renderer2);

  public isMenuOpen = signal(false);

  constructor() {
    effect(() => {
      this.updateScrollBlock();
    });
  }

  public toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  public closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  private updateScrollBlock(): void {
    if (this.isMenuOpen()) {
      // Block scrolling on body (Mobile, Tablet)
      this.renderer.addClass(document.body, 'no-scroll');
    }
    else {
      // Release scroll (Desktop)
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }
}
