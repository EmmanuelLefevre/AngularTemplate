import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, DestroyRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

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
    const mouseMoveListener = (event: MouseEvent): void => {
      const container = this.el.nativeElement.querySelector('.interrogation-room');
      if (!container) return;

      const rect = container.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    };

    document.addEventListener('mousemove', mouseMoveListener);

    this.destroyRef.onDestroy(() => {
      document.removeEventListener('mousemove', mouseMoveListener);
    });
  }
}
