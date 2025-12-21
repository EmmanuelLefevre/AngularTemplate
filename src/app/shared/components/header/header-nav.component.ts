import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'header-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderNavComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
