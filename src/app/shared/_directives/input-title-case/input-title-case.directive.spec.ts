import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { InputTitleCaseDirective } from './input-title-case.directive';

@Component({
  imports: [ReactiveFormsModule, InputTitleCaseDirective],
  template: '<input [formControl]="control" inputTitleCase />'
})

class TestHostComponent {
  control = new FormControl('');
}

describe('InputTitleCaseDirective', () => {

  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let inputElement: HTMLInputElement;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    // --- ACT ---
    const DIRECTIVE_EL = fixture.debugElement.query(By.directive(InputTitleCaseDirective));

    // --- ASSERT ---
    expect(DIRECTIVE_EL).toBeTruthy();
  });

  describe('Value Transformation', () => {
    it('should capitalize simple lowercase words', () => {
      // --- ACT ---
      setInputValue('angular');

      // --- ASSERT ---
      expect(inputElement.value).toBe('Angular');
      expect(component.control.value).toBe('Angular');
    });

    it('should handle hyphenated names (e.g., Jean-Luc)', () => {
      // --- ACT ---
      setInputValue('jean-luc');

      // --- ASSERT ---
      expect(inputElement.value).toBe('Jean-Luc');
    });

    it('should handle names with apostrophes (e.g., O\'Connor)', () => {
      // --- ACT ---
      setInputValue('o\'connor');

      // --- ASSERT ---
      expect(inputElement.value).toBe('O\'Connor');
    });

    it('should capitalize the first letter of each word in a sentence', () => {
      // --- ACT ---
      setInputValue('welcome to angular template');

      // --- ASSERT ---
      expect(inputElement.value).toBe('Welcome To Angular Template');
    });

    it('should handle complex names like "jean-luc o\'connor"', () => {
      // --- ACT ---
      setInputValue('jean-luc o\'connor');

      // --- ASSERT ---
      expect(inputElement.value).toBe('Jean-Luc O\'Connor');
    });
  });

  describe('Edge Cases', () => {
    it('should return an empty string if input is empty', () => {
      // --- ACT ---
      setInputValue('');

      // --- ASSERT ---
      expect(inputElement.value).toBe('');
      expect(component.control.value).toBe('');
    });

    it('should handle multiple spaces correctly', () => {
      // --- ACT ---
      setInputValue('jean  luc');

      // --- ASSERT ---
      expect(inputElement.value).toBe('Jean  Luc');
    });

    it('should not crash if char is at the very end of the word', () => {
      // --- ACT ---
      setInputValue('jean-');

      // --- ASSERT ---
      expect(inputElement.value).toBe('Jean-');
    });

    it('should return an empty string when inputTitleCase is called with falsy values', () => {
      // --- ACT ---
      const DIRECTIVE_INSTANCE = fixture.debugElement
        .query(By.directive(InputTitleCaseDirective))
        .injector.get(InputTitleCaseDirective);

      // --- ACT ---
      const RESULT_EMPTY = DIRECTIVE_INSTANCE.inputTitleCase('');
      // @ts-expect-error : security test for non-string types in pure JS
      const RESULT_NULL = DIRECTIVE_INSTANCE.inputTitleCase(null);

      // --- ASSERT ---
      expect(RESULT_EMPTY).toBe('');
      expect(RESULT_NULL).toBe('');
    });
  });

  describe('Angular Integration', () => {
    it('should update the FormControl value without emitting an extra change event (avoiding infinite loops)', () => {
      // --- ACT ---
      const SPY = vi.spyOn(component.control, 'setValue');

      // --- ACT ---
      setInputValue('test');

      // --- ASSERT ---
      expect(SPY).toHaveBeenCalledWith('Test', { emitEvent: false });
    });

    it('should emit ngModelChange when value changes', () => {
      // --- ACT ---
      const DIRECTIVE_INSTANCE = fixture.debugElement
        .query(By.directive(InputTitleCaseDirective))
        .injector.get(InputTitleCaseDirective);

      const SPY = vi.spyOn(DIRECTIVE_INSTANCE.ngModelChange, 'emit');

      // --- ACT ---
      setInputValue('emit test');

      // --- ASSERT ---
      expect(SPY).toHaveBeenCalledWith('Emit Test');
    });
  });

  /**
   * Helper function to simulate user typing
   */
  function setInputValue(value: string): void {
    inputElement.value = value;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }
});
