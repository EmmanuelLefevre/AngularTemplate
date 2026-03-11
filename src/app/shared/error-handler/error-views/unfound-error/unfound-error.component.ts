/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'unfound-error',
  imports: [
    TranslateModule
  ],
  templateUrl: './unfound-error.component.html',
  styleUrl: './unfound-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UnfoundErrorComponent implements OnInit, OnDestroy {

  private readonly cdr = inject(ChangeDetectorRef);
  private player: any;

  isMuted = true;

  ngOnInit(): void {
    if (!window.document.getElementById('yt-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }

    const win = window as any;

    win.onYouTubeIframeAPIReady = (): void => {
      this.initPlayer();
    };

    if (typeof win.YT !== 'undefined' && win.YT && win.YT.Player) {
      this.initPlayer();
    }
  }

  private initPlayer(): void {
    const win = window as any;

    this.player = new win.YT.Player('yt-player');
  }

  unmuteVideo(): void {
    if (this.player && typeof this.player.unMute === 'function') {
      this.player.unMute();
      this.isMuted = false;
      this.cdr.detectChanges();
    }
  }

  // 1. IMPLÉMENTATION DE ngOnDestroy
  ngOnDestroy(): void {
    if (this.player && typeof this.player.destroy === 'function') {
      this.player.destroy();
      this.player = null;
    }
  }
}