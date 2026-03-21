import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { SnackbarComponent } from './snackbar.component';
import { SnackbarData } from '@core/_models/snackbar/snackbar.model';

describe('SnackbarComponent', () => {

  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let snackBarRefMock: any;
  let translateService: TranslateService;

  const MOCK_DATA: SnackbarData = {
    message: 'This is a test message',
    type: 'logIn-logOut'
  };

  beforeEach(async() => {
    snackBarRefMock = {
      dismiss: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        SnackbarComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: MOCK_DATA },
        { provide: MatSnackBarRef, useValue: snackBarRefMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);

    vi.spyOn(translateService, 'get').mockImplementation(
      (key: string | string[]): Observable<string | object> => of(key)
    );

    vi.spyOn(translateService, 'stream').mockImplementation(
      (key: string | string[]): Observable<string | object> => of(key)
    );

    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct injected message', () => {
    // --- ACT ---
    const MESSAGE_SPAN = fixture.debugElement.query(By.css('.snackbar__message')).nativeElement;

    // --- ASSERT ---
    expect(MESSAGE_SPAN.textContent.trim()).toBe(MOCK_DATA.message);
  });

  it('should display the FontAwesome icon for close button', () => {
    // --- ACT ---
    const ICON = fixture.debugElement.query(By.css('fa-icon'));

    // --- ASSERT ---
    expect(ICON).toBeTruthy();
    expect(component.faXmark).toBeDefined();
  });

  it('should call dismiss on snackBarRef when the close button is clicked', () => {
    // --- ARRANGE ---
    const CLOSE_BUTTON = fixture.debugElement.query(By.css('.snackbar__action')).nativeElement;

    // --- ACT ---
    CLOSE_BUTTON.click();

    // --- ASSERT ---
    expect(snackBarRefMock.dismiss).toHaveBeenCalledOnce();
  });

  describe('Accessibility & Translation', () => {
    it('should have the translated aria-label and tooltip on the close button', async() => {
      // --- ARRANGE ---
      fixture.detectChanges();
      await fixture.whenStable();

      // --- ACT ---
      const CLOSE_BUTTON_DEBUG = fixture.debugElement.query(By.css('.snackbar__action'));
      const CLOSE_BUTTON_NATIVE = CLOSE_BUTTON_DEBUG.nativeElement;
      const TOOLTIP_INSTANCE = CLOSE_BUTTON_DEBUG.injector.get(MatTooltip);

      // --- ASSERT ---
      expect(CLOSE_BUTTON_NATIVE.getAttribute('aria-label')).toBe('UI.BUTTONS.CLOSE.ARIA');

      expect(TOOLTIP_INSTANCE.message).toBe('UI.BUTTONS.CLOSE.TOOLTIP');
    });

    it('should call dismiss on snackBarRef when Enter key is pressed on the close button', () => {
      // --- ARRANGE ---
      const CLOSE_BUTTON_DEBUG = fixture.debugElement.query(By.css('.snackbar__action'));
      const event = new KeyboardEvent('keydown', { key: 'Enter' });

      // --- ACT ---
      CLOSE_BUTTON_DEBUG.triggerEventHandler('keydown.enter', event);

      // --- ASSERT ---
      expect(snackBarRefMock.dismiss).toHaveBeenCalledOnce();
    });

    it('should call dismiss on snackBarRef when Space key is pressed on the close button', () => {
      // --- ARRANGE ---
      const CLOSE_BUTTON_DEBUG = fixture.debugElement.query(By.css('.snackbar__action'));
      const event = new KeyboardEvent('keydown', { key: 'Space' });

      // --- ACT ---
      CLOSE_BUTTON_DEBUG.triggerEventHandler('keydown.space', event);

      // --- ASSERT ---
      expect(snackBarRefMock.dismiss).toHaveBeenCalledOnce();
    });

    it('should have aria-hidden="true" on the FontAwesome icon to hide it from screen readers', () => {
      // --- ARRANGE ---
      const ICON_DEBUG = fixture.debugElement.query(By.css('fa-icon'));
      const ICON_NATIVE = ICON_DEBUG.nativeElement;

      // --- ACT ---
      const ariaHiddenValue = ICON_NATIVE.getAttribute('aria-hidden');

      // --- ASSERT ---
      expect(ariaHiddenValue).toBe('true');
    });
  });
});
