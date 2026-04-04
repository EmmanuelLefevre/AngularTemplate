/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-magic-numbers */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location, DOCUMENT } from '@angular/common';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { GenericErrorComponent } from './generic-error.component';

describe('GenericErrorComponent', () => {

  let component: GenericErrorComponent;
  let fixture: ComponentFixture<GenericErrorComponent>;
  let routerSpy: any;
  let locationSpy: any;
  let mockDocument: Document;
  let translate: TranslateService;

  let mockAudioInstances: Record<string, any>;

  beforeEach(async() => {

    routerSpy = { navigate: vi.fn() };
    locationSpy = { back: vi.fn() };
    mockAudioInstances = {};

    await TestBed.configureTestingModule({
      imports: [
        GenericErrorComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: Location, useValue: locationSpy }
      ]
    }).compileComponents();

    translate = TestBed.inject(TranslateService);
    mockDocument = TestBed.inject(DOCUMENT);

    const mockAudioConstructor = vi.fn().mockImplementation(function(this: any, path: string) {
      this.play = vi.fn().mockResolvedValue(undefined);
      this.load = vi.fn();
      this.currentTime = 0;

      mockAudioInstances[path] = this;
    });

    vi.stubGlobal('Audio', mockAudioConstructor);

    if (mockDocument.defaultView) {
      Object.defineProperty(mockDocument.defaultView, 'Audio', {
        writable: true,
        value: mockAudioConstructor
      });
    }

    translate.setTranslation('fr', {
      'PAGES.ERROR.GENERIC': {
        'TITLE': 'Erreur système',
        'SUBTITLE': 'Veuillez réparer',
        'SUCCESS': 'Erreur colmatée',
        'IMG': {
          'ALT': 'Image d\'erreur'
        },
        'BUTTON': {
          'ARIA': 'Réparer le système {{id}}'
        }
      }
    });
    translate.use('fr');

    fixture = TestBed.createComponent(GenericErrorComponent);
    component = fixture.componentInstance;

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('Initialization', () => {
    it('should create the component with initial state', () => {
      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component).toBeTruthy();
      expect((component as any).countdown()).toBe(4);
      expect((component as any).isFinish()).toBe(false);
      expect((component as any).isSystemRebooted()).toBe(false);
    });
  });

  describe('Internationalization', () => {
    it('should render the translated title, subtitle and image alt', () => {
      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      const title = fixture.debugElement.query(By.css('.generic-error__title')).nativeElement;
      const subtitle = fixture.debugElement.query(By.css('.generic-error__subtitle')).nativeElement;
      const img = fixture.debugElement.query(By.css('.generic-error__img')).nativeElement;

      expect(title.textContent.trim()).toBe('Erreur système');
      expect(subtitle.textContent.trim()).toBe('Veuillez réparer');
      expect(img.getAttribute('alt')).toBe('Image d\'erreur');
    });

    it('should render the translated success message when system is rebooted', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      component.fixSystem(1);
      component.fixSystem(2);
      component.fixSystem(3);

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      const successMessage = fixture.debugElement.query(By.css('.generic-error__success-message')).nativeElement;
      expect(successMessage.textContent.trim()).toBe('Erreur colmatée');
    });

    it('should dynamically translate the aria-label of the control buttons with their IDs', () => {
      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      const buttons = fixture.debugElement.queryAll(By.css('.control-button'));

      expect(buttons.length).toBe(3);

      expect(buttons[0].nativeElement.getAttribute('aria-label')).toBe('Réparer le système 1');
      expect(buttons[1].nativeElement.getAttribute('aria-label')).toBe('Réparer le système 2');
      expect(buttons[2].nativeElement.getAttribute('aria-label')).toBe('Réparer le système 3');
    });
  });

  describe('Sound Effects & Preloading', () => {
    it('should preload all audio files on initialization (ngOnInit)', () => {
      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(window.Audio).toHaveBeenCalledTimes(3);
      expect(window.Audio).toHaveBeenCalledWith('assets/sounds/funny-click.mp3');
      expect(window.Audio).toHaveBeenCalledWith('assets/sounds/timer-beep.mp3');
      expect(window.Audio).toHaveBeenCalledWith('assets/sounds/congrats.mp3');

      expect(mockAudioInstances['assets/sounds/funny-click.mp3'].load).toHaveBeenCalled();
      expect(mockAudioInstances['assets/sounds/timer-beep.mp3'].load).toHaveBeenCalled();
      expect(mockAudioInstances['assets/sounds/congrats.mp3'].load).toHaveBeenCalled();
    });

    it('should play the preloaded click sound effect when fixing a node', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const clickAudioMock = mockAudioInstances['assets/sounds/funny-click.mp3'];

      // --- ACT ---
      component.fixSystem(1);

      // --- ASSERT ---
      expect(clickAudioMock.play).toHaveBeenCalledTimes(1);
      expect(clickAudioMock.currentTime).toBe(0);
    });

    it('should log info if audio play is blocked by browser', async() => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const clickAudioMock = mockAudioInstances['assets/sounds/funny-click.mp3'];

      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
      clickAudioMock.play.mockRejectedValue(new Error('NotAllowedError'));

      // --- ACT ---
      component.fixSystem(1);
      await vi.runAllTimersAsync();

      // --- ASSERT ---
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Please enable audio in your browser to hear the sound effects.')
      );
    });
  });

  describe('Reboot Logic & Navigation', () => {
    it('should toggle a node status on click', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      component.fixSystem(1);

      // --- ASSERT ---
      const nodes = (component as any).systemNodes();
      expect(nodes[0].isFixed).toBe(true);
      expect((component as any).isSystemRebooted()).toBe(false);
    });

    it('should decrement the countdown and play correct sounds during termination sequence', () => {
      // --- ARRANGE ---
      vi.spyOn(mockDocument.defaultView!.history, 'length', 'get').mockReturnValue(2);
      fixture.detectChanges();

      const beepAudioMock = mockAudioInstances['assets/sounds/timer-beep.mp3'];
      const congratsAudioMock = mockAudioInstances['assets/sounds/congrats.mp3'];

      component.fixSystem(1);
      component.fixSystem(2);
      component.fixSystem(3);

      // --- ACT & ASSERT ---
      expect(beepAudioMock.play).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(1000);
      expect((component as any).countdown()).toBe(3);
      expect(beepAudioMock.play).toHaveBeenCalledTimes(2);

      vi.advanceTimersByTime(3000);
      expect((component as any).countdown()).toBe(0);
      expect(congratsAudioMock.play).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(500);
      expect((component as any).isFinish()).toBe(true);

      vi.advanceTimersByTime(300);
      expect(locationSpy.back).toHaveBeenCalled();
    });

    it('should navigate to home if the browser history is empty', () => {
      // --- ARRANGE ---
      vi.spyOn(mockDocument.defaultView!.history, 'length', 'get').mockReturnValue(1);
      fixture.detectChanges();

      // --- ACT ---
      component.fixSystem(1);
      component.fixSystem(2);
      component.fixSystem(3);
      vi.advanceTimersByTime(4800);

      // --- ASSERT ---
      expect(locationSpy.back).not.toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should return early from fixSystem if redirection is already in progress', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const clickAudioMock = mockAudioInstances['assets/sounds/funny-click.mp3'];

      component.fixSystem(1);
      component.fixSystem(2);
      component.fixSystem(3);

      clickAudioMock.play.mockClear();

      // --- ACT ---
      component.fixSystem(1);

      // --- ASSERT ---
      expect(clickAudioMock.play).not.toHaveBeenCalled();
    });
  });

  describe('Lifecycle & Cleanup', () => {
    it('should handle clearTimer safely when timerInterval is undefined', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const clearIntervalSpy = vi.spyOn(window, 'clearInterval');

      // --- ACT ---
      fixture.destroy();

      // --- ASSERT ---
      expect(clearIntervalSpy).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases (No Window Context)', () => {
    it('should safely do nothing if defaultView is null during initialization and playing', () => {
      // --- ARRANGE ---
      const viewSpy = vi.spyOn(mockDocument, 'defaultView', 'get').mockReturnValue(null as any);

      if (vi.isMockFunction(window.Audio)) {
        vi.mocked(window.Audio).mockClear();
      }

      // --- ACT ---
      component.ngOnInit();
      component.fixSystem(1);

      // --- ASSERT ---
      expect(window.Audio).not.toHaveBeenCalled();

      // --- CLEANUP ---
      viewSpy.mockRestore();
    });

    it('should fallback to EMPTY_HISTORY and navigate home if defaultView is null during redirection', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const viewSpy = vi.spyOn(mockDocument, 'defaultView', 'get').mockReturnValue(null as any);

      // --- ACT ---
      component.fixSystem(1);
      component.fixSystem(2);
      component.fixSystem(3);
      vi.advanceTimersByTime(4800);

      // --- ASSERT ---
      expect(locationSpy.back).not.toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);

      // --- CLEANUP ---
      viewSpy.mockRestore();
    });
  });

  describe('Image', () => {
    it('should render the generic error image correctly with optimized attributes', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      const imgElement = fixture.debugElement.query(By.css('.generic-error__img')).nativeElement;

      // --- ASSERT ---
      expect(imgElement.getAttribute('src')).toContain('assets/img/generic-error.png');
      expect(imgElement.getAttribute('alt')).toBe('Image d\'erreur');
      expect(imgElement.getAttribute('width')).toBe('1500');
      expect(imgElement.getAttribute('height')).toBe('750');
    });
  });
});
