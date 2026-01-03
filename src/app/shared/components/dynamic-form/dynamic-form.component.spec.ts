import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FormFieldConfig } from '@core/_models/forms/form.model';

import { DynamicFormComponent } from './dynamic-form.component';

const VISIBLE_FIELDS_LENGTH_LOGIN = 2;
const VISIBLE_FIELDS_LENGTH_REGISTER = 3;

describe('DynamicFormComponent', () => {

  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  const MOCK_FIELDS: FormFieldConfig[] = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      initialValue: 'test@test.com',
      validators: [Validators.required]
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password'
    },
    {
      name: 'confirmPassword',
      label: 'Confirm',
      type: 'password'
    }
  ];

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        DynamicFormComponent,
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('fields', MOCK_FIELDS);
    fixture.componentRef.setInput('isRegisterMode', false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form controls based on fields input (via effect)', () => {
    // --- ASSERT ---
    expect(component['form'].contains('email')).toBe(true);
    expect(component['form'].contains('password')).toBe(true);
    expect(component['form'].contains('confirmPassword')).toBe(true);
  });

  describe('Computed: visibleFields', () => {
    it('should filter out confirmPassword when isRegisterMode is false', async() => {
      // --- ARRANGE ---
      fixture.componentRef.setInput('isRegisterMode', false);
      fixture.detectChanges();

      // --- ACT ---
      const VISIBLE = component['visibleFields']();

      // --- ASSERT ---
      expect(VISIBLE.length).toBe(VISIBLE_FIELDS_LENGTH_LOGIN);
      expect(VISIBLE.find(f => f.name === 'confirmPassword')).toBeUndefined();
    });

    it('should include confirmPassword when isRegisterMode is true', async() => {
      // --- ARRANGE ---
      fixture.componentRef.setInput('isRegisterMode', true);
      fixture.detectChanges();

      // --- ACT ---
      const VISIBLE = component['visibleFields']();

      // --- ASSERT ---
      expect(VISIBLE.length).toBe(VISIBLE_FIELDS_LENGTH_REGISTER);
      expect(VISIBLE.find(f => f.name === 'confirmPassword')).toBeDefined();
    });
  });

  describe('onSubmit()', () => {
    it('should emit submitted event with raw value if form is valid', () => {
      // --- ARRANGE ---
      const SPY = vi.spyOn(component.submitted, 'emit');
      component['form'].patchValue({
        email: 'test@test.com',
        password: 'password123',
        confirmPassword: 'password123'
      });

      // --- ACT ---
      component['onSubmit']();

      // --- ASSERT ---
      expect(SPY).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'password123',
        confirmPassword: 'password123'
      });
    });

    it('should mark all fields as touched and not emit if form is invalid', () => {
      // --- ARRANGE ---
      const SPY = vi.spyOn(component.submitted, 'emit');
      component['form'].patchValue({ email: '' });

      // --- ACT ---
      component['onSubmit']();

      // --- ASSERT ---
      expect(SPY).not.toHaveBeenCalled();
      expect(component['form'].get('email')?.touched).toBe(true);
      expect(component['form'].get('password')?.touched).toBe(true);
    });
  });

  describe('resetForm()', () => {
    it('should clear form values', () => {
      // --- ARRANGE ---
      component['form'].patchValue({ email: 'dirty@data.com' });
      expect(component['form'].get('email')?.value).toBe('dirty@data.com');

      // --- ACT ---
      component.resetForm();

      // --- ASSERT ---
      expect(component['form'].get('email')?.value).toBe(null);
    });
  });

  describe('Effect & initialization', () => {
    it('should create controls and handle missing initialValue (branch coverage)', async() => {
      // --- ARRANGE ---
      const FIELDS: FormFieldConfig[] = [{ name: 'empty', label: 'Empty', type: 'text' }];

      // --- ACT ---
      fixture.componentRef.setInput('fields', FIELDS);
      fixture.detectChanges();

      // --- ASSERT ---
      expect(component['form'].contains('empty')).toBe(true);
      expect(component['form'].get('empty')?.value).toBe('');
    });

    it('should not re-add controls if they already exist', async() => {
      // --- ARRANGE ---
      const EXPECTED_FIELDS_COUNT = MOCK_FIELDS.length;

      // --- ACT ---
      fixture.componentRef.setInput('fields', [...MOCK_FIELDS]);
      fixture.detectChanges();

      // --- ASSERT ---
      expect(Object.keys(component['form'].controls).length).toBe(EXPECTED_FIELDS_COUNT);
    });
  });
});
