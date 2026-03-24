import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { DotLottie } from '@lottiefiles/dotlottie-web';

const ALIGN_CENTER = 0.5;

@Component({
  selector: 'unknown-error',
  imports: [TranslateModule],
  templateUrl: './unknown-error.component.html',
  styleUrl: './unknown-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnknownErrorComponent implements OnInit, OnDestroy {

  @ViewChild('lottieCanvas', { static: true }) lottieCanvas!: ElementRef<HTMLCanvasElement>;

  private dotLottieInstance?: DotLottie;

  ngOnInit(): void {
    this.dotLottieInstance = new DotLottie({
      canvas: this.lottieCanvas.nativeElement,
      src: 'assets/animations/unknown-error-abduction.lottie',
      loop: true,
      autoplay: true,
      layout: {
        fit: 'contain',
        align: [ALIGN_CENTER, ALIGN_CENTER],
      }
    });
  }

  ngOnDestroy(): void {
    this.dotLottieInstance?.destroy();
  }
}
