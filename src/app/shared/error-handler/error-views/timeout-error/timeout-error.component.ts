import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { DotLottie } from '@lottiefiles/dotlottie-web';

const ALIGN_CENTER = 0.5;

@Component({
  selector: 'timeout-error',
  imports: [
    TranslateModule,
  ],
  templateUrl: './timeout-error.component.html',
  styleUrl: './timeout-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TimeoutErrorComponent implements OnInit, OnDestroy {

  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChild('lottieCanvas', { static: true }) lottieCanvas!: ElementRef<HTMLCanvasElement>;

  private dotLottieInstance?: DotLottie;

  isReady = false;

  ngOnInit(): void {
    this.dotLottieInstance = new DotLottie({
      canvas: this.lottieCanvas.nativeElement,
      src: 'assets/animations/timeout-error-sandglass.lottie',
      loop: true,
      autoplay: true,
      layout: {
        fit: 'contain',
        align: [ALIGN_CENTER, ALIGN_CENTER],
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
