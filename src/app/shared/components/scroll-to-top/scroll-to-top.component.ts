import { ChangeDetectionStrategy, Component, HostListener, inject, signal, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

const TOP_POSITION = 0;

@Component({
  selector: 'scroll-to-top',
  imports: [
    FontAwesomeModule,
    MatTooltipModule,
    TranslateModule
  ],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})

export class ScrollToTopComponent {

  private readonly document = inject(DOCUMENT);

  readonly faAngleDoubleUp = faAngleDoubleUp;
  readonly showScroll = signal(false);

  @HostListener('window:scroll', [])

  onWindowScroll(): void {
    const THRESHOLD = window.innerHeight;

    const SCROLL_POSITION = window.scrollY ||
      window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      TOP_POSITION;

    const IS_OVER_THRESOLD = SCROLL_POSITION > THRESHOLD;

    if (this.showScroll() !== IS_OVER_THRESOLD) {
      this.showScroll.set(IS_OVER_THRESOLD);
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
