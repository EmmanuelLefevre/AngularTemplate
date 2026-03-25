import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { DotLottie } from '@lottiefiles/dotlottie-web';

const ALIGN_CENTER = 0.5;
const DEFAULT_PIXEL_RATIO = 1;

@Component({
  selector: 'unknown-error',
  imports: [
    TranslateModule,
  ],
  templateUrl: './unknown-error.component.html',
  styleUrl: './unknown-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnknownErrorComponent implements OnInit, OnDestroy {

  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChild('lottieCanvas', { static: true }) lottieCanvas!: ElementRef<HTMLCanvasElement>;

  private dotLottieInstance?: DotLottie;

  isReady = false;

  ngOnInit(): void {
    this.dotLottieInstance = new DotLottie({
      canvas: this.lottieCanvas.nativeElement,
      src: 'assets/animations/unknown-error-abduction.lottie',
      loop: true,
      autoplay: true,
      layout: {
        fit: 'contain',
        align: [ALIGN_CENTER, ALIGN_CENTER],
      },
      renderConfig: {
        devicePixelRatio: window.devicePixelRatio || DEFAULT_PIXEL_RATIO
      }
    });

    this.dotLottieInstance.addEventListener('ready', () => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.dotLottieInstance?.destroy();
  }
}
