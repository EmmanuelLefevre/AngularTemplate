import { ChangeDetectionStrategy, Component, effect, inject, Renderer2, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageToggleComponent } from '@shared/components/language-toggle/language-toggle.component';
import { MainButtonComponent } from '@shared/shared';

import { HEADER_NAV_LINKS } from '@core/_config/links/nav-links.constant';

@Component({
  selector: 'header-nav',
  imports: [
    CommonModule,
    MainButtonComponent,
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

  private readonly router = inject(Router);

  public isMenuOpen = signal(false);

  constructor() {
    effect(() => {
      this.updateScrollBlock();
    });
  }

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  onLoginClick(): void {
    this.closeMenu();
    this.router.navigate(['/login']);
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
