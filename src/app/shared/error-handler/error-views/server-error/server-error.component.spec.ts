/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-magic-numbers */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ServerErrorComponent } from './server-error.component';
import { TEAM_DEVELOPERS } from '@core/_config/team/developers.constant';

describe('ServerErrorComponent', () => {

  let component: ServerErrorComponent;
  let fixture: ComponentFixture<ServerErrorComponent>;
  let mockAudio: any;
  let mockDocument: Document;
  let translate: TranslateService;

  const ANIM_MS = 900;

  beforeEach(async() => {

    mockAudio = {
      play: vi.fn().mockReturnValue(Promise.resolve()),
      load: vi.fn(),
      currentTime: 0
    };

    await TestBed.configureTestingModule({
      imports: [
        ServerErrorComponent,
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    translate = TestBed.inject(TranslateService);
    mockDocument = TestBed.inject(DOCUMENT);

    vi.stubGlobal('Audio', vi.fn().mockImplementation(function() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return mockAudio;
    }));

    translate.setTranslation('fr', {
      'PAGES.ERROR.SERVER': {
        'SUBTITLE': 'Serveurs HS',
        'INSTRUCTION': {
          'MOBILE': 'Tape avec ton pouce !',
          'DESKTOP': 'Donne un coup de masse !'
        },
        'IMG.ALT.BULK': 'Masse de choc',
        'IMG.ALT.HAMSTER': 'Un hamster fâché'
      }
    });
    translate.use('fr');

    fixture = TestBed.createComponent(ServerErrorComponent);
    component = fixture.componentInstance;

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('Initialization & State', () => {
    it('should create the component', () => {
      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component).toBeTruthy();
    });

    it('should initialize developers signal from constant on ngOnInit', () => {
      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component.developers().length).toBe(TEAM_DEVELOPERS.length);
      expect(component.developers()[0].isWhacked).toBe(false);
    });

    it('should initialize the punch sound effect', () => {
      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(window.Audio).toHaveBeenCalledWith('assets/sounds/punch.wav');
      expect(mockAudio.load).toHaveBeenCalled();
    });

    it('should log info if audio play is blocked by browser', async() => {
      // --- ARRANGE ---
      fixture.detectChanges();
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
      mockAudio.play.mockRejectedValue(new Error('NotAllowedError'));

      // --- ACT ---
      component.whackDeveloper(TEAM_DEVELOPERS[0].id);
      await Promise.resolve();

      // --- ASSERT ---
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Please enable audio')
      );
    });

    it('should compute shouldShowBulk correctly', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const devId = TEAM_DEVELOPERS[0].id;

      // --- ACT & ASSERT ---
      component.hoveredDevId.set(null);
      expect(component.shouldShowBulk()).toBe(false);

      component.hoveredDevId.set(devId);
      expect(component.shouldShowBulk()).toBe(true);

      component.whackDeveloper(devId);
      expect(component.shouldShowBulk()).toBe(false);

      component.hoveredDevId.set(9999);
      expect(component.shouldShowBulk()).toBe(false);
    });
  });

  describe('Internationalization', () => {
    it('should render the translated subtitle', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      const subtitle = fixture.debugElement.query(By.css('.server-error__subtitle')).nativeElement;

      // --- ASSERT ---
      expect(subtitle.textContent.trim()).toBe('Serveurs HS');
    });

    it('should render both instruction versions (CSS handles visibility)', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      const desktopText = fixture.debugElement.query(By.css('.server-error__instruction-desktop')).nativeElement;
      const mobileText = fixture.debugElement.query(By.css('.server-error__instruction-mobile')).nativeElement;

      // --- ASSERT ---
      expect(desktopText.textContent.trim()).toBe('Donne un coup de masse !');
      expect(mobileText.textContent.trim()).toBe('Tape avec ton pouce !');
    });
  });

  describe('Images & Media', () => {
    it('should render the custom bulk with correct attributes', () => {
      // --- ARRANGE ---
      component.isHitting.set(true);
      fixture.detectChanges();

      // --- ACT ---
      const bulkImgDebug = fixture.debugElement.query(By.css('.bulk'));

      // --- ASSERT ---
      expect(bulkImgDebug).not.toBeNull();
      const bulkImg = bulkImgDebug.nativeElement;
      expect(bulkImg.getAttribute('src')).toContain('assets/img/bulk.png');
      expect(bulkImg.getAttribute('alt')).toBe('Masse de choc');
    });

    it('should render the hamster image correctly', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      const hamsterImg = fixture.debugElement.query(By.css('.server-error__hamster')).nativeElement;

      // --- ASSERT ---
      expect(hamsterImg.getAttribute('src')).toContain('assets/img/hamster.png');
      expect(hamsterImg.getAttribute('alt')).toBe('Un hamster fâché');
    });

    it('should render developer photos with dynamic src', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const firstDev = TEAM_DEVELOPERS[0];

      // --- ACT ---
      const photo = fixture.debugElement.query(By.css('.server-error__dev-photo')).nativeElement;

      // --- ASSERT ---
      expect(photo.getAttribute('src')).toBe(firstDev.photoUrl);
      expect(photo.getAttribute('alt')).toBe(firstDev.name);
    });

    it('should apply dynamic styles (transform) to developer photos', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const devPhotos = fixture.debugElement.queryAll(By.css('.server-error__dev-photo'));

      // --- ACT ---
      const firstPhoto = devPhotos[0].nativeElement;

      // --- ASSERT ---
      expect(firstPhoto.style.transform).toContain('scale(1)');
      expect(firstPhoto.style.transform).toContain('translateY(0)');
    });
  });

  describe('Core Logic: Whacking Mechanism', () => {
    it('should play sound and update signals when whacking a developer', async() => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const targetId = TEAM_DEVELOPERS[0].id;

      // --- ACT ---
      component.whackDeveloper(targetId);
      vi.advanceTimersByTime(250);
      fixture.detectChanges();

      // --- ASSERT ---
      expect(mockAudio.play).toHaveBeenCalled();
      expect(component.isHitting()).toBe(false);
      expect(component.whackedDev()?.id).toBe(targetId);
    });

    it('should handle "isReturning" logic for the previous developer', async() => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const firstId = TEAM_DEVELOPERS[0].id;
      const secondId = TEAM_DEVELOPERS[1].id;

      component.whackDeveloper(firstId);
      vi.advanceTimersByTime(ANIM_MS);
      await fixture.whenStable();

      // --- ACT ---
      component.whackDeveloper(secondId);

      // --- ASSERT ---
      const firstDev = component.developers().find(d => d.id === firstId);
      expect(firstDev?.isWhacked).toBe(false);
      expect(firstDev?.isReturning).toBe(true);

      // --- ACT ---
      vi.advanceTimersByTime(ANIM_MS);
      await fixture.whenStable();

      // --- ASSERT ---
      const firstDevFinal = component.developers().find(d => d.id === firstId);
      expect(firstDevFinal?.isReturning).toBe(false);
    });

    it('should return early if the developer is already whacked', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const targetId = TEAM_DEVELOPERS[0].id;
      component.whackDeveloper(targetId);
      mockAudio.play.mockClear();

      // --- ACT ---
      component.whackDeveloper(targetId);

      // --- ASSERT ---
      expect(mockAudio.play).not.toHaveBeenCalled();
    });

    it('should clear existing cleanupTimeout when whacking a new developer quickly', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const firstId = TEAM_DEVELOPERS[0].id;
      const secondId = TEAM_DEVELOPERS[1].id;
      const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');

      // --- ACT ---
      component.whackDeveloper(firstId);
      component.whackDeveloper(secondId);

      // --- ASSERT ---
      expect(clearTimeoutSpy).toHaveBeenCalled();
    });

    it('should safely do nothing if punchSound is undefined when whacking', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      (component as any).punchSound = undefined;
      const targetId = TEAM_DEVELOPERS[0].id;

      // --- ACT ---
      component.whackDeveloper(targetId);

      // --- ASSERT ---
      expect(mockAudio.play).not.toHaveBeenCalled();
    });
  });

  describe('User Interaction & DOM Events', () => {
    it('should update position signals on mousemove event on document', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      const event = new MouseEvent('mousemove', { clientX: 500, clientY: 300 });
      mockDocument.dispatchEvent(event);

      // --- ASSERT ---
      expect(component.mouseX()).toBe(500);
      expect(component.mouseY()).toBe(300);
    });

    it('should update position signals on touchmove event', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      const touchEvent = new Event('touchmove') as any;
      touchEvent.touches = [{ clientX: 150, clientY: 250 }];
      mockDocument.dispatchEvent(touchEvent);

      // --- ASSERT ---
      expect(component.mouseX()).toBe(150);
      expect(component.mouseY()).toBe(250);
    });

    it('should handle touchmove event with empty touches array safely', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const touchEvent = new Event('touchmove') as any;
      touchEvent.touches = [];

      // --- ACT ---
      mockDocument.dispatchEvent(touchEvent);

      // --- ASSERT ---
      expect(component.mouseX()).toBe(0);
    });

    it('should toggle hoveredDevId on mouseenter and mouseleave', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const devBtn = fixture.debugElement.query(By.css('.server-error__dev-photo-button'));

      // --- ACT ---
      devBtn.triggerEventHandler('mouseenter', null);

      // --- ASSERT ---
      expect(component.hoveredDevId()).toBe(TEAM_DEVELOPERS[0].id);

      // --- ACT ---
      devBtn.triggerEventHandler('mouseleave', null);

      // --- ASSERT ---
      expect(component.hoveredDevId()).toBe(null);
    });
  });

  describe('Lifecycle & Cleanup', () => {
    it('should remove all event listeners from document on destroy', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const removeSpy = vi.spyOn(mockDocument, 'removeEventListener');

      // --- ACT ---
      fixture.destroy();

      // --- ASSERT ---
      expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(removeSpy).toHaveBeenCalledWith('touchmove', expect.any(Function));
      expect(removeSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
    });

    it('should NOT call clearTimeout if no timeout exists on destroy', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const spy = vi.spyOn(window, 'clearTimeout');
      (component as any).cleanupTimeout = undefined;

      // --- ACT ---
      fixture.destroy();

      // --- ASSERT ---
      expect(spy).not.toHaveBeenCalled();
    });

    it('should call clearTimeout and reset punchSound if a timeout is active on destroy', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const spy = vi.spyOn(window, 'clearTimeout');
      component.whackDeveloper(TEAM_DEVELOPERS[0].id);

      // --- ACT ---
      fixture.destroy();

      // --- ASSERT ---
      expect(spy).toHaveBeenCalled();
      expect((component as any).punchSound).toBeUndefined();
    });
  });

  describe('Edge Cases (No Window Context)', () => {
    it('should execute if(window) branch and instantiate Audio', () => {
      // --- ARRANGE ---
      const localMockAudio = { load: vi.fn() };

      const mockWin = {
        Audio: vi.fn().mockImplementation(function() {
          return localMockAudio;
        })
      };

      const viewSpy = vi.spyOn(mockDocument, 'defaultView', 'get').mockReturnValue(mockWin as any);

      // --- ACT ---
      (component as any).initAudio();

      // --- ASSERT ---
      expect((component as any).punchSound).toBe(localMockAudio);
      expect(localMockAudio.load).toHaveBeenCalled();

      // --- CLEANUP ---
      viewSpy.mockRestore();
    });

    it('should not initialize punchSound when defaultView is null', () => {
      // --- ARRANGE ---
      const viewSpy = vi.spyOn(mockDocument, 'defaultView', 'get').mockReturnValue(null as any);
      (component as any).punchSound = undefined;

      // --- ACT ---
      (component as any).initAudio();

      // --- ASSERT ---
      expect((component as any).punchSound).toBeUndefined();

      // --- CLEANUP ---
      viewSpy.mockRestore();
    });
  });

  describe('Public Method: updateMousePosition', () => {
    it('should update mouseX and mouseY signals based on the provided MouseEvent', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const mockEvent = new MouseEvent('mousemove', {
        clientX: 404,
        clientY: 500
      });

      // --- ACT ---
      component.updateMousePosition(mockEvent);

      // --- ASSERT ---
      expect(component.mouseX()).toBe(404);
      expect(component.mouseY()).toBe(500);
    });
  });
});
