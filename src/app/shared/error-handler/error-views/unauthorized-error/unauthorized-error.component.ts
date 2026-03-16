import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, DestroyRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

const FIRST_TOUCH_INDEX = 0;

@Component({
  selector: 'unauthorized-error',
  imports: [
    TranslateModule,
  ],
  templateUrl: './unauthorized-error.component.html',
  styleUrl: './unauthorized-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UnauthorizedErrorComponent implements OnInit {

  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const container = this.el.nativeElement.querySelector('.interrogation-room');

    if (!container) return;

    const updateLightPosition = (clientX: number, clientY: number): void => {
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    };

    const mouseMoveListener = (event: MouseEvent): void => {
      updateLightPosition(event.clientX, event.clientY);
    };

    const touchListener = (event: TouchEvent): void => {
      const touch = event.touches[FIRST_TOUCH_INDEX];

      if (touch) {
        updateLightPosition(touch.clientX, touch.clientY);
      }
    };

    document.addEventListener('mousemove', mouseMoveListener);
    document.addEventListener('touchmove', touchListener, { passive: true });
    document.addEventListener('touchstart', touchListener, { passive: true });

    this.destroyRef.onDestroy(() => {
      document.removeEventListener('mousemove', mouseMoveListener);
      document.removeEventListener('touchmove', touchListener);
      document.removeEventListener('touchstart', touchListener);
    });
  }
}
