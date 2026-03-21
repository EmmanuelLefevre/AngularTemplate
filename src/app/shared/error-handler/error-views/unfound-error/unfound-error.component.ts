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
    if (!globalThis.document.getElementById('yt-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }

    const globalObj = globalThis as any;

    globalObj.onYouTubeIframeAPIReady = (): void => {
      this.initPlayer();
    };

    if (globalObj.YT?.Player) {
      this.initPlayer();
    }
  }

  private initPlayer(): void {
    const globalObj = globalThis as any;

    this.player = new globalObj.YT.Player('yt-player');
  }

  unmuteVideo(): void {
    if (typeof this.player?.unMute === 'function') {
      this.player.unMute();
      this.isMuted = false;
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy(): void {
    if (typeof this.player?.destroy === 'function') {
      this.player.destroy();
      this.player = null;
    }
  }
}
