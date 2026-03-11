import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

import { UnauthorizedErrorComponent } from './unauthorized-error.component';

describe('UnauthorizedErrorComponent', () => {

  let component: UnauthorizedErrorComponent;
  let fixture: ComponentFixture<UnauthorizedErrorComponent>;
  let translate: TranslateService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        UnauthorizedErrorComponent,
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    translate = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(UnauthorizedErrorComponent);
    component = fixture.componentInstance;

    translate.setTranslation('fr', {
      'PAGES': {
        'ERROR': {
          'UNAUTHORIZED': {
            'TITLE': 'Accès Interdit',
            'MESSAGE': 'On a quelques questions avant de te laisser passer. A commencer par : t\'es qui ? Ton accréditation ne passe pas pour cette zone.'
          }
        }
      }
    });
    translate.setTranslation('en', {
      'PAGES': {
        'ERROR': {
          'UNAUTHORIZED': {
            'TITLE': 'Forbidden Access',
            'MESSAGE': 'We have a few questions before we let you through. First of all : who are you? Your accreditation isn\'t valid for this area.'
          }
        }
      }
    });
    translate.use('fr');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Internationalization', () => {
    it('should display the translated title and message in French by default', () => {
      // --- ACT ---
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('.interrogation-room__title')).nativeElement;
      const message = fixture.debugElement.query(By.css('.interrogation-room__message')).nativeElement;

      // --- ASSERT ---
      expect(title.textContent.trim()).toBe('Accès Interdit');
      expect(message.textContent.trim()).toBe('On a quelques questions avant de te laisser passer. A commencer par : t\'es qui ? Ton accréditation ne passe pas pour cette zone.');
    });

    it('should update translations when switching to English', () => {
      // --- ARRANGE ---
      fixture.detectChanges();

      // --- ACT ---
      translate.use('en');
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('.interrogation-room__title')).nativeElement;
      const message = fixture.debugElement.query(By.css('.interrogation-room__message')).nativeElement;

      // --- ASSERT ---
      expect(title.textContent.trim()).toBe('Forbidden Access');
      expect(message.textContent.trim()).toBe('We have a few questions before we let you through. First of all : who are you? Your accreditation isn\'t valid for this area.');
    });
  });

  describe('Mousemove Spotlight Effect', () => {
    it('should update CSS variables --mouse-x and --mouse-y on mousemove', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const container = fixture.debugElement.query(By.css('.interrogation-room')).nativeElement;

      vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
        left: 100,
        top: 50,
        width: 500,
        height: 500,
        right: 600,
        bottom: 550,
        x: 100,
        y: 50,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        toJSON: () => {}
      });

      // --- ACT ---
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 250,
        clientY: 150
      });
      document.dispatchEvent(mouseEvent);

      // --- ASSERT ---
      expect(container.style.getPropertyValue('--mouse-x')).toBe('150px');
      expect(container.style.getPropertyValue('--mouse-y')).toBe('100px');
    });

    it('should return early and not throw if the container is not found in the DOM', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const container = fixture.debugElement.query(By.css('.interrogation-room')).nativeElement;

      const parent = container.parentNode;
      parent.removeChild(container);

      // --- ACT ---
      const action = (): void => {
        const mouseEvent = new MouseEvent('mousemove', { clientX: 100, clientY: 100 });
        document.dispatchEvent(mouseEvent);
      };

      // --- ASSERT ---
      expect(action).not.toThrow();

      parent.appendChild(container);
    });
  });

  describe('Lifecycle - ngOnDestroy', () => {
    it('should remove the mousemove event listener from the document when destroyed', () => {
      // --- ARRANGE ---
      fixture.detectChanges();
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

      // --- ACT ---
      fixture.destroy();

      // --- ASSERT ---
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    });
  });
});
