import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { GenericInputComponent } from './generic-input.component';

describe('GenericInputComponent', () => {

  let component: GenericInputComponent;
  let fixture: ComponentFixture<GenericInputComponent>;
  let mockControl: FormControl;
  let translate: TranslateService;

  beforeEach(async() => {
    mockControl = new FormControl('', [Validators.required]);

    await TestBed.configureTestingModule({
      imports: [
        GenericInputComponent,
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    translate = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(GenericInputComponent);
    component = fixture.componentInstance;

    translate.setTranslation('fr', {
      'UI': {
        'FORMS': {
          'LABELS': { 'EMAIL': 'Email' },
          'ERRORS': {
            'EMAIL_INVALID': 'L\'email n\'est pas valide.',
            'PASSWORD_INVALID': 'Le mot de passe n\'est pas valide.'
          }
        }
      }
    });
    translate.use('fr');

    fixture.componentRef.setInput('id', 'test-input');
    fixture.componentRef.setInput('label', 'UI.FORMS.LABELS.EMAIL');
    fixture.componentRef.setInput('control', mockControl);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create and have default values', () => {
    // --- ASSERT ---
    expect(component.type()).toBe('text');
    expect(component['isPassword']()).toBe(false);
  });

  describe('Password Logic', () => {
    it('should detect password type and calculate inputType correctly', () => {
      // --- ARRANGE ---
      fixture.componentRef.setInput('type', 'password');
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component['isPassword']()).toBe(true);
      expect(component['inputType']()).toBe('password');
    });

    it('should toggle inputType when togglePassword is called', async() => {
      // --- ARRANGE ---
      fixture.componentRef.setInput('type', 'password');
      fixture.detectChanges();

      // --- ACT (Display) ---
      component['togglePassword']();
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component['showPassword']()).toBe(true);
      expect(component['inputType']()).toBe('text');

      // --- ACT (Hide) ---
      component['togglePassword']();

      // --- ASSERT ---
      expect(component['showPassword']()).toBe(false);
      expect(component['inputType']()).toBe('password');
    });
  });

  describe('Computed: hasError', () => {
    it('should be false when control is invalid but untouched/pristine', () => {
      // --- ARRANGE ---
      mockControl.setValue('');

      // --- ASSERT ---
      expect(component['hasError']()).toBe(false);
    });

    it('should be true when control is invalid and touched', async() => {
      // --- ARRANGE ---
      mockControl.setValue('');
      mockControl.markAsTouched();
      mockControl.updateValueAndValidity();

      // --- ACT ---
      fixture.detectChanges();
      await fixture.whenStable();

      // --- ASSERT ---
      expect(component['hasError']()).toBe(true);
    });

    it('should be false when control is valid and touched', async() => {
      // --- ARRANGE ---
      mockControl.setValue('valid@email.com');
      mockControl.markAsTouched();
      mockControl.updateValueAndValidity();

      // --- ACT ---
      fixture.detectChanges();
      await fixture.whenStable();

      // --- ASSERT ---
      expect(component['hasError']()).toBe(false);
    });
  });

  describe('Error Handling & i18n Keys', () => {
    it('should compute the correct dynamic errorKey based on type', () => {
      // CASE : TYPE EMAIL
      // --- ARRANGE & ACT ---
      fixture.componentRef.setInput('type', 'email');
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component['errorKey']()).toBe('UI.FORMS.ERRORS.EMAIL_INVALID');

      // CASE : TYPE PASSWORD
      // --- ARRANGE & ACT ---
      fixture.componentRef.setInput('type', 'password');
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component['errorKey']()).toBe('UI.FORMS.ERRORS.PASSWORD_INVALID');
    });

    it('should compute the correct dynamic errorKey based on type', () => {
      // --- ACT ---
      fixture.componentRef.setInput('type', 'email');

      // --- ASSERT ---
      expect(component['errorKey']()).toBe('UI.FORMS.ERRORS.EMAIL_INVALID');

      // --- ACT ---
      fixture.componentRef.setInput('type', 'password');

      // --- ASSERT ---
      expect(component['errorKey']()).toBe('UI.FORMS.ERRORS.PASSWORD_INVALID');
    });

    it('should use customErrorKey if provided by parent (Priority Check)', () => {
      // --- ARRANGE ---
      const OVERRIDE_PASSWORD_KEY = 'UI.FORMS.ERRORS.PASSWORD_INVALID';
      fixture.componentRef.setInput('type', 'email');

      // --- ACT ---
      fixture.componentRef.setInput('customErrorKey', OVERRIDE_PASSWORD_KEY);
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component['errorKey']()).toBe(OVERRIDE_PASSWORD_KEY);
    });
  });

  describe('DOM Rendering', () => {
    it('should render the label with correct translation key', () => {
      // --- ASSERT ---
      const LABEL_ELEMENT = fixture.nativeElement.querySelector('label');
      expect(LABEL_ELEMENT.textContent).toContain('Email');
    });

    it('should apply is-invalid class when hasError is true', async() => {
      // --- ARRANGE ---
      mockControl.markAsTouched();
      mockControl.setErrors({ required: true });
      fixture.componentRef.setInput('control', mockControl);

      // --- ACT ---
      fixture.detectChanges();
      await fixture.whenStable();

      // --- ASSERT ---
      const CONTAINER = fixture.nativeElement.querySelector('.c-field');
      expect(CONTAINER.classList.contains('is-invalid')).toBe(true);
    });

    it('should render the error message when hasError is true', async() => {
      // --- ARRANGE ---
      mockControl.markAsTouched();
      mockControl.setErrors({ invalid: true });
      mockControl.updateValueAndValidity();

      // --- ACT ---
      fixture.detectChanges();
      await fixture.whenStable();

      // --- ASSERT ---
      const ERROR_DIV = fixture.nativeElement.querySelector('.c-field__error');
      expect(ERROR_DIV).toBeTruthy();
    });
  });
});
