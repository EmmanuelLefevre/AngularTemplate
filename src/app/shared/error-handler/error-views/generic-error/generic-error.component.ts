import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Location, DOCUMENT, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

const COUNTDOWN_START = 4;
const COUNTDOWN_END = 0;
const COUNTDOWN_STEP = 1;

const EMPTY_HISTORY = 0;
const MIN_HISTORY_LENGTH = 1;
const REDIRECT_CONGRATS_PERIOD_MS = 800;
const TERMINATION_ANIMATION_MS = 300;
const TICK_INTERVAL_MS = 1000;

const INITIAL_NODES = [
  { id: 1, isFixed: false },
  { id: 2, isFixed: false },
  { id: 3, isFixed: false }
];

@Component({
  selector: 'generic-error',
  imports: [
    NgOptimizedImage,
    TranslateModule
  ],
  templateUrl: './generic-error.component.html',
  styleUrl: './generic-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-terminating]': 'isTerminating()'
  }
})

export class GenericErrorComponent {

  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  private isRedirecting = false;
  private timerInterval: ReturnType<typeof setInterval> | undefined;

  protected readonly countdown = signal(COUNTDOWN_START);
  protected readonly isTerminating = signal(false);
  protected readonly systemNodes = signal([...INITIAL_NODES]);

  // Calculated signal: true ONLY if all buttons are activated
  protected readonly isSystemRebooted = computed(() =>
    this.systemNodes().every(node => node.isFixed)
  );

  constructor() {
    this.destroyRef.onDestroy(() => this.clearTimer());
  }

  fixSystem(id: number): void {
    if (this.isRedirecting) return;

    this.playSound('assets/sounds/funny-click.mp3');

    this.systemNodes.update(nodes =>
      nodes.map(node => node.id === id ? { ...node, isFixed: !node.isFixed } : node)
    );

    if (this.isSystemRebooted()) {
      this.handleSuccessNavigation();
    }
  }

  private handleSuccessNavigation(): void {
    this.isRedirecting = true;
    this.playSound('assets/sounds/timer-beep.mp3');

    this.timerInterval = setInterval(() => {
      const currentValue = this.countdown() - COUNTDOWN_STEP;
      this.countdown.set(currentValue);

      if (currentValue > COUNTDOWN_END) {
        this.playSound('assets/sounds/timer-beep.mp3');
      }
      else {
        this.clearTimer();
        this.playSound('assets/sounds/congrats.mp3');

        setTimeout(() => {
          this.isTerminating.set(true);
        }, REDIRECT_CONGRATS_PERIOD_MS - TERMINATION_ANIMATION_MS);

        setTimeout(() => {
          this.executeRedirection();
        }, REDIRECT_CONGRATS_PERIOD_MS);
      }
    }, TICK_INTERVAL_MS);
  }

  private executeRedirection(): void {
    const windowObj = this.document.defaultView;
    const historyLength = windowObj?.history.length ?? EMPTY_HISTORY;
    const canGoBack = historyLength > MIN_HISTORY_LENGTH;

    if (canGoBack) {
      this.location.back();
    }
    else {
      this.router.navigate(['/']);
    }
  }

  private clearTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private playSound(path: string): void {
    if (this.document.defaultView) {
      const audio = new Audio(path);
      audio.play().catch(() => {
        console.info('Please enable audio in your browser to hear the sound effects.');
      });
    }
  }
}
