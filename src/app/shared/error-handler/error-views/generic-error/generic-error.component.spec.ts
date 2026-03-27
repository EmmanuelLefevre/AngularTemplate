/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-magic-numbers */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericErrorComponent } from './generic-error.component';
import { Router } from '@angular/router';
import { Location, DOCUMENT } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

describe('GenericErrorComponent', () => {

  let component: GenericErrorComponent;
  let fixture: ComponentFixture<GenericErrorComponent>;
  let routerSpy: any;
  let locationSpy: any;
  let mockDocument: Document;
  let mockAudio: any;
  let translate: TranslateService;

  beforeEach(async() => {

    routerSpy = { navigate: vi.fn() };
    locationSpy = { back: vi.fn() };

    mockAudio = {
      play: vi.fn().mockReturnValue(Promise.resolve()),
      load: vi.fn(),
      currentTime: 0
    };

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

    vi.stubGlobal('Audio', vi.fn().mockImplementation(function() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return mockAudio;
    }));

    translate.setTranslation('fr', {
      'PAGES.ERROR.GENERIC': {
        'TITLE': 'Erreur système',
        'SUBTITLE': 'Veuillez réparer',
        'SUCCESS': 'Erreur colmatée',
        'IMG': {
          'ALT': 'Image d\'erreur'
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
      expect((component as any).isTerminating()).toBe(false);
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
  });

  describe('Sound Effects', () => {
    it('should initialize and play the click sound effect when fixing a node', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      component.fixSystem(1);

      // --- ASSERT ---
      expect(window.Audio).toHaveBeenCalledWith('assets/sounds/funny-click.mp3');
      expect(mockAudio.play).toHaveBeenCalled();
    });

    it('should log info if audio play is blocked by browser', async() => {
      // --- ARRANGE ---
      fixture.detectChanges();
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
      mockAudio.play.mockRejectedValue(new Error('NotAllowedError'));

      // --- ACT ---
      component.fixSystem(1);
      await Promise.resolve();

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

    it('should decrement the countdown and trigger termination sequence', () => {
      // --- ARRANGE ---
      vi.spyOn(mockDocument.defaultView!.history, 'length', 'get').mockReturnValue(2);

      fixture.detectChanges();
      component.fixSystem(1);
      component.fixSystem(2);
      component.fixSystem(3);

      // --- ACT & ASSERT ---
      vi.advanceTimersByTime(1000);
      expect((component as any).countdown()).toBe(3);

      vi.advanceTimersByTime(3000);
      expect((component as any).countdown()).toBe(0);
      expect(window.Audio).toHaveBeenCalledWith('assets/sounds/congrats.mp3');

      vi.advanceTimersByTime(500);
      expect((component as any).isTerminating()).toBe(true);

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
      component.fixSystem(1);
      component.fixSystem(2);
      component.fixSystem(3);

      mockAudio.play.mockClear();

      // --- ACT ---
      component.fixSystem(1);

      // --- ASSERT ---
      expect(mockAudio.play).not.toHaveBeenCalled();
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
    it('should safely do nothing if defaultView is null when playing sound', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      const viewSpy = vi.spyOn(mockDocument, 'defaultView', 'get').mockReturnValue(null as any);

      if (vi.isMockFunction(window.Audio)) {
        vi.mocked(window.Audio).mockClear();
      }

      // --- ACT ---
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
});
