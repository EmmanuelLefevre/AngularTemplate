import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'header-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderNavComponent {
  public isMenuOpen = signal(false);

  public toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  public closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
