/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfoundErrorComponent } from './unfound-error.component';

describe('UnfoundErrorComponent', () => {
  let component: UnfoundErrorComponent;
  let fixture: ComponentFixture<UnfoundErrorComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [UnfoundErrorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UnfoundErrorComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    const script = document.getElementById('yt-api-script');

    if (script) {
      script.remove();
    }

    delete (window as any).YT;
    delete (window as any).onYouTubeIframeAPIReady;

    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should create the YouTube API script tag if it does not exist', () => {
      // --- ARRANGE ---

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      const script = document.getElementById('yt-api-script') as HTMLScriptElement;

      expect(script).toBeTruthy();
      expect(script.src).toContain('https://www.youtube.com/iframe_api');
      expect(typeof (window as any).onYouTubeIframeAPIReady).toBe('function');
    });

    it('should NOT create the YouTube API script tag if it already exists', () => {
      // --- ARRANGE ---
      const dummyScript = document.createElement('script');
      dummyScript.id = 'yt-api-script';
      document.body.appendChild(dummyScript);
      const createElementSpy = vi.spyOn(document, 'createElement');

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(createElementSpy).not.toHaveBeenCalledWith('script');
    });

    it('should initialize the player when onYouTubeIframeAPIReady is called', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const playerConstructorMock = vi.fn();
      (window as any).YT = { Player: playerConstructorMock };

      // --- ACT ---
      (window as any).onYouTubeIframeAPIReady();

      // --- ASSERT ---
      expect(playerConstructorMock).toHaveBeenCalledWith('yt-player');
    });

    it('should initialize the player immediately if window.YT is already defined', () => {
      // --- ARRANGE ---
      const playerConstructorMock = vi.fn();
      (window as any).YT = { Player: playerConstructorMock };

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      expect(playerConstructorMock).toHaveBeenCalledWith('yt-player');
    });
  });

  describe('unmuteVideo', () => {
    it('should unmute the video, set isMuted to false, and trigger change detection', () => {
      // --- ARRANGE ---
      const cdrSpy = vi.spyOn((component as any).cdr, 'detectChanges');
      const unMuteMock = vi.fn();
      (component as any).player = { unMute: unMuteMock };
      component.isMuted = true;

      // --- ACT ---
      component.unmuteVideo();

      // --- ASSERT ---
      expect(unMuteMock).toHaveBeenCalled();
      expect(component.isMuted).toBe(false);
      expect(cdrSpy).toHaveBeenCalled();
    });

    it('should not throw or alter state if player is not ready or lacks unMute method', () => {
      // --- ARRANGE ---
      const cdrSpy = vi.spyOn((component as any).cdr, 'detectChanges');
      (component as any).player = null;
      component.isMuted = true;

      // --- ACT ---
      const action = (): void => component.unmuteVideo();

      // --- ASSERT ---
      expect(action).not.toThrow();
      expect(component.isMuted).toBe(true);
      expect(cdrSpy).not.toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should call destroy on the player and set the reference to null', () => {
      // --- ARRANGE ---
      const destroyMock = vi.fn();
      (component as any).player = { destroy: destroyMock };

      // --- ACT ---
      component.ngOnDestroy();

      // --- ASSERT ---
      expect(destroyMock).toHaveBeenCalled();
      expect((component as any).player).toBeNull();
    });

    it('should not throw if the player is not instanciated', () => {
      // --- ARRANGE ---
      (component as any).player = null;

      // --- ACT ---
      const action = (): void => component.ngOnDestroy();

      // --- ASSERT ---
      expect(action).not.toThrow();
    });
  });
});
