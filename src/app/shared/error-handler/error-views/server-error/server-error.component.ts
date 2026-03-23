import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { DOCUMENT, NgOptimizedImage, NgStyle } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { WhackableDeveloper } from '@core/_models/team/developer.model';
import { TEAM_DEVELOPERS } from '@core/_config/team/developers.constant';

const FIRST_TOUCH_INDEX = 0;
const INITIAL_MOUSE_POS = 0;
const BULK_STRIKE_DURATION_MS = 200;
const WHACK_ANIMATION_DURATION_MS = 900;

@Component({
  selector: 'server-error',
  imports: [
    NgOptimizedImage,
    NgStyle,
    TranslateModule
  ],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ServerErrorComponent implements OnInit {

  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private cleanupTimeout?: any;
  private previousWhackedId: number | null = null;
  private punchSound?: HTMLAudioElement;

  public readonly isHitting = signal<boolean>(false);
  public readonly hoveredDevId = signal<number | null>(null);

  public readonly mouseX = signal<number>(INITIAL_MOUSE_POS);
  public readonly mouseY = signal<number>(INITIAL_MOUSE_POS);

  public readonly developers = signal<WhackableDeveloper[]>([]);
  public readonly whackedDev = signal<WhackableDeveloper | null>(null);

  public readonly shouldShowBulk = computed(() => {
    const id = this.hoveredDevId();
    if (id === null) return false;

    const dev = this.developers().find(d => d.id === id);
    return dev ? !dev.isWhacked : false;
  });

  ngOnInit(): void {
    this.initAudio();
    this.initDevelopers();
    this.initMouseAndTouchListeners();

    this.destroyRef.onDestroy(() => {
      if (this.cleanupTimeout) clearTimeout(this.cleanupTimeout);
      this.punchSound = undefined;
    });
  }

  whackDeveloper(devId: number): void {
    const targetDev = this.developers().find(d => d.id === devId);

    if (!targetDev || targetDev.isWhacked) {
      return;
    }

    this.playPunchSound();
    this.whackedDev.set(targetDev);

    if (this.cleanupTimeout) {
      clearTimeout(this.cleanupTimeout);
    }

    this.isHitting.set(true);
    setTimeout(() => {
      this.isHitting.set(false);
    }, BULK_STRIKE_DURATION_MS);

    this.developers.update(devs =>
      devs.map(dev => {
        if (dev.id === devId) {
          return { ...dev, isWhacked: true, isReturning: false };
        }

        if (dev.id === this.previousWhackedId) {
          return { ...dev, isWhacked: false, isReturning: true };
        }

        return { ...dev, isReturning: false };
      })
    );

    this.previousWhackedId = devId;

    this.cleanupTimeout = setTimeout(() => {
      this.developers.update(devs =>
        devs.map(dev =>
          dev.isReturning ? { ...dev, isReturning: false } : dev
        )
      );
    }, WHACK_ANIMATION_DURATION_MS);
  }

  updateMousePosition(event: MouseEvent): void {
    this.mouseX.set(event.clientX);
    this.mouseY.set(event.clientY);
  }

  private initDevelopers(): void {
    const initialDevs: WhackableDeveloper[] = TEAM_DEVELOPERS.map(dev => ({
      ...dev,
      isWhacked: false,
      isReturning: false
    }));

    this.developers.set(initialDevs);
  }

  private initAudio(): void {
    const window = this.document.defaultView;

    if (window) {
      this.punchSound = new window.Audio('assets/sounds/punch.wav');
      this.punchSound.load();
    }
  }

  private initMouseAndTouchListeners(): void {
    const updateMousePosition = (clientX: number, clientY: number): void => {
      this.mouseX.set(clientX);
      this.mouseY.set(clientY);
    };

    const mouseMoveListener = (event: MouseEvent): void => {
      updateMousePosition(event.clientX, event.clientY);
    };

    const touchListener = (event: TouchEvent): void => {
      const touch = event.touches[FIRST_TOUCH_INDEX];

      if (touch) {
        updateMousePosition(touch.clientX, touch.clientY);
      }
    };

    this.document.addEventListener('mousemove', mouseMoveListener);
    this.document.addEventListener('touchmove', touchListener, { passive: true });
    this.document.addEventListener('touchstart', touchListener, { passive: true });

    this.destroyRef.onDestroy(() => {
      this.document.removeEventListener('mousemove', mouseMoveListener);
      this.document.removeEventListener('touchmove', touchListener);
      this.document.removeEventListener('touchstart', touchListener);
    });
  }

  private playPunchSound(): void {
    if (this.punchSound) {
      this.punchSound.currentTime = 0;

      this.punchSound.play().catch(() => {
        console.info('Please enable audio in your browser to hear the sound effects.');
      });
    }
  }
}

