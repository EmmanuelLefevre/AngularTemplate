import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MainButtonComponent } from './main-button.component';

describe('MainButtonComponent', () => {

  let component: MainButtonComponent;
  let fixture: ComponentFixture<MainButtonComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [MainButtonComponent, TranslateModule.forRoot()],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(MainButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the main-button', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering and semantics', () => {
    it('should render a <button> by default', () => {
      // --- ACT ---
      const BUTTON_EL = fixture.debugElement.query(By.css('button'));

      // --- ASSERT ---
      expect(BUTTON_EL).toBeTruthy();
    });

    it('should render an <a> tag when type is "link"', () => {
      // --- ARRANGE ---
      fixture.componentRef.setInput('type', 'link');
      fixture.componentRef.setInput('link', '/test');

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      const LINK_EL = fixture.debugElement.query(By.css('a'));
      expect(LINK_EL).toBeTruthy();
      expect(LINK_EL.attributes['role']).toBe('button');
    });

    it('should display the icon if provided', () => {
      // --- ARRANGE ---
      fixture.componentRef.setInput('icon', 'icon-test');

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      const ICON_EL = fixture.debugElement.query(By.css('.c-btn__icon'));
      expect(ICON_EL.nativeElement.className).toContain('icon-test');
    });
  });

  describe('Keyboard and accessibility', () => {
    it('should emit "escaped" when Escape key is pressed', () => {
      // --- ARRANGE ---
      const SPY = vi.spyOn(component.escaped, 'emit');
      const BUTTON_EL = fixture.debugElement.query(By.css('button'));

      // --- ACT ---
      BUTTON_EL.triggerEventHandler('keydown.escape', { key: 'Escape' });

      // --- ASSERT ---
      expect(SPY).toHaveBeenCalled();
    });

    it('should emit "clicked" when Enter key is pressed', () => {
      // --- ARRANGE ---
      const SPY = vi.spyOn(component.clicked, 'emit');
      const BUTTON_EL = fixture.debugElement.query(By.css('button'));

      // --- ACT ---
      BUTTON_EL.triggerEventHandler('keydown.enter', { key: 'Enter' });

      // --- ASSERT ---
      expect(SPY).toHaveBeenCalled();
    });

    it('should apply ARIA attributes correctly', () => {
      // --- ARRANGE ---
      fixture.componentRef.setInput('ariaExpanded', true);
      fixture.componentRef.setInput('ariaControls', 'menu-id');

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      const BUTTON_EL = fixture.debugElement.query(By.css('button'));
      expect(BUTTON_EL.attributes['aria-expanded']).toBe('true');
      expect(BUTTON_EL.attributes['aria-controls']).toBe('menu-id');
    });

    describe('Space key behavior', () => {
      it('should emit "spaced" and prevent default when Space is pressed on a link', () => {
        // --- ARRANGE ---
        fixture.componentRef.setInput('type', 'link');
        fixture.componentRef.setInput('link', '/test');
        fixture.detectChanges();

        const SPY = vi.spyOn(component.spaced, 'emit');
        const PREVENT_DEFAULT_SPY = vi.fn();
        const LINK_EL = fixture.debugElement.query(By.css('a'));

        // --- ACT ---
        LINK_EL.triggerEventHandler('keydown.space', {
          key: ' ',
          preventDefault: PREVENT_DEFAULT_SPY
        });

        // --- ASSERT ---
        expect(SPY).toHaveBeenCalled();
        expect(PREVENT_DEFAULT_SPY).toHaveBeenCalled();
      });

      it('should emit "spaced" WITHOUT prevent default when Space is pressed on a button', () => {
        // --- ARRANGE ---
        const SPY = vi.spyOn(component.spaced, 'emit');
        const PREVENT_DEFAULT_SPY = vi.fn();
        const BUTTON_EL = fixture.debugElement.query(By.css('button'));

        // --- ACT ---
        BUTTON_EL.triggerEventHandler('keydown.space', {
          key: ' ',
          preventDefault: PREVENT_DEFAULT_SPY
        });

        // --- ASSERT ---
        expect(SPY).toHaveBeenCalled();
        expect(PREVENT_DEFAULT_SPY).not.toHaveBeenCalled();
      });
    });
  });

  describe('Guards and states', () => {
    it('should show loader and disable button when isLoading is true', () => {
      // --- ARRANGE ---
      fixture.componentRef.setInput('isLoading', true);

      // --- ACT ---
      fixture.detectChanges();

      const BUTTON_EL = fixture.debugElement.query(By.css('button'));
      const LOADER = fixture.debugElement.query(By.css('.c-btn__loader'));

      // --- ASSERT ---
      expect(BUTTON_EL.nativeElement.disabled).toBe(true);
      expect(LOADER).toBeTruthy();
    });

    it('should emit "clicked" when button is clicked and NOT disabled/loading', () => {
      // --- ARRANGE ---
      const SPY = vi.spyOn(component.clicked, 'emit');
      const BUTTON_EL = fixture.debugElement.query(By.css('button'));
      const MOCK_EVENT = new MouseEvent('click');

      // --- ACT ---
      BUTTON_EL.triggerEventHandler('click', MOCK_EVENT);

      // --- ASSERT ---
      expect(SPY).toHaveBeenCalledWith(MOCK_EVENT);
    });

    it('should NOT emit "clicked" (click) if isLoading or isDisabled is true', () => {
      // --- ARRANGE ---
      const SPY = vi.spyOn(component.clicked, 'emit');
      const BUTTON_EL = fixture.debugElement.query(By.css('button'));

      // --- ACT (isLoading) ---
      fixture.componentRef.setInput('isLoading', true);
      fixture.detectChanges();
      BUTTON_EL.triggerEventHandler('click', new MouseEvent('click'));

      // --- ACT (isDisabled) ---
      fixture.componentRef.setInput('isLoading', false);
      fixture.componentRef.setInput('isDisabled', true);
      fixture.detectChanges();
      BUTTON_EL.triggerEventHandler('click', new MouseEvent('click'));

      // --- ASSERT ---
      expect(SPY).not.toHaveBeenCalled();
    });

    it('should NOT emit anything on keydown if isDisabled is true', () => {
      // --- ARRANGE ---
      fixture.componentRef.setInput('isDisabled', true);
      fixture.detectChanges();

      const SPY_CLICKED = vi.spyOn(component.clicked, 'emit');
      const SPY_ESCAPED = vi.spyOn(component.escaped, 'emit');
      const BUTTON_EL = fixture.debugElement.query(By.css('button'));

      // --- ACT ---
      BUTTON_EL.triggerEventHandler('keydown.enter', { key: 'Enter' });
      BUTTON_EL.triggerEventHandler('keydown.escape', { key: 'Escape' });

      // --- ASSERT ---
      expect(SPY_CLICKED).not.toHaveBeenCalled();
      expect(SPY_ESCAPED).not.toHaveBeenCalled();
    });

    it('should NOT emit anything on keydown if isLoading is true', () => {
      // --- ARRANGE ---
      fixture.componentRef.setInput('isLoading', true);
      fixture.detectChanges();

      const SPY_SPACED = vi.spyOn(component.spaced, 'emit');
      const BUTTON_EL = fixture.debugElement.query(By.css('button'));

      // --- ACT ---
      BUTTON_EL.triggerEventHandler('keydown.space', { key: ' ' });

      // --- ASSERT ---
      expect(SPY_SPACED).not.toHaveBeenCalled();
    });
  });
});
