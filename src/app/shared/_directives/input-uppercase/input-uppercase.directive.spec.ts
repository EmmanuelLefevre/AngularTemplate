import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { InputUppercaseDirective } from './input-uppercase.directive';

@Component({
  imports: [ReactiveFormsModule, InputUppercaseDirective],
  standalone: true,
  template: '<input [formControl]="control" inputUpperCase />'
})
class TestHostComponent {
  control = new FormControl('');
}

describe('InputUppercaseDirective', () => {

  let fixture: ComponentFixture<TestHostComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    fixture.detectChanges();
  });

  it('should transform lowercase to uppercase on input event', () => {
    // --- ARRANGE ---
    const RAW_VALUE = 'angular test';
    const EXPECTED_VALUE = 'ANGULAR TEST';

    // --- ACT ---
    inputElement.value = RAW_VALUE;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // --- ASSERT ---
    expect(inputElement.value).toBe(EXPECTED_VALUE);
    expect(fixture.componentInstance.control.value).toBe(EXPECTED_VALUE);
  });

  it('should emit ngModelChange with uppercase value', () => {
    // --- ARRANGE ---
    let emittedValue: string | undefined;

    const DIRECTIVE_EL = fixture.debugElement.query(By.directive(InputUppercaseDirective));
    const DIRECTIVE_INSTANCE = DIRECTIVE_EL.injector.get(InputUppercaseDirective);

    // We subscribe manually to the sender
    DIRECTIVE_INSTANCE.ngModelChange.subscribe((val: string) => {
      emittedValue = val;
    });

    // --- ACT ---
    fixture.componentInstance.control.setValue('hello');
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // --- ASSERT ---
    expect(emittedValue).toBe('HELLO');
  });

  it('should do nothing if the input value is empty', () => {
    // --- ARRANGE ---
    const DIRECTIVE_EL = fixture.debugElement.query(By.directive(InputUppercaseDirective));
    const DIRECTIVE_INSTANCE = DIRECTIVE_EL.injector.get(InputUppercaseDirective);

    const SPY_EMIT = vi.spyOn(DIRECTIVE_INSTANCE.ngModelChange, 'emit');

    // --- ACT ---
    fixture.componentInstance.control.setValue('');
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // --- ASSERT ---
    expect(SPY_EMIT).not.toHaveBeenCalled();
  });
});
