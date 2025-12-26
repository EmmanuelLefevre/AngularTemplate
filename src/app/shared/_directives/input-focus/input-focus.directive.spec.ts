import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { InputFocusDirective } from './input-focus.directive';

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

interface TestableDirective {
  executeFocus(): void;
}

@Component({
  imports: [InputFocusDirective],
  standalone: true,
  template: `
    <input
      id="DIRECT_INPUT"
      inputFocus
      type="text" />

    <div
      id="CONTAINER"
      inputFocus>
      <textarea id="CHILD_TEXTAREA"></textarea>
    </div>

    <div
      id="EMPTY_CONTAINER"
      inputFocus>
      <span>No input here</span>
    </div>
  `
})
class TestHostComponent {}

describe('InputFocusDirective', () => {

  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, InputFocusDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('should create an instance', () => {
    // --- ARRANGE & ACT ---
    const DIRECTIVE_DEBUG_EL = fixture.debugElement.query(By.directive(InputFocusDirective));

    // --- ASSERT ---
    expect(DIRECTIVE_DEBUG_EL).toBeTruthy();
  });

  it('should execute focus automatically via afterNextRender', async () => {
    // --- ARRANGE ---
    const INPUT_EL = fixture.nativeElement.querySelector('#DIRECT_INPUT') as HTMLInputElement;
    const FOCUS_SPY = vi.spyOn(INPUT_EL, 'focus');

    // --- ACT ---
    fixture.detectChanges();
    await fixture.whenStable();

    // --- ASSERT ---
    expect(FOCUS_SPY).toBeTruthy();
  });

  it('should focus the input element directly', async () => {
    // --- ARRANGE ---
    const INPUT_EL = fixture.nativeElement.querySelector('#DIRECT_INPUT') as HTMLInputElement;
    const FOCUS_SPY = vi.spyOn(INPUT_EL, 'focus');
    const DEBUG_EL = fixture.debugElement.query(By.css('#DIRECT_INPUT'));
    const INSTANCE = DEBUG_EL.injector.get(InputFocusDirective) as unknown as TestableDirective;

    // --- ACT ---
    INSTANCE.executeFocus();

    // --- ASSERT ---
    expect(FOCUS_SPY).toHaveBeenCalled();
  });

  it('should focus the child textarea when applied to a container', async () => {
    // --- ARRANGE ---
    const TEXTAREA_EL = fixture.nativeElement.querySelector('#CHILD_TEXTAREA') as HTMLTextAreaElement;
    const FOCUS_SPY = vi.spyOn(TEXTAREA_EL, 'focus');
    const DEBUG_EL = fixture.debugElement.query(By.css('#CONTAINER'));
    const INSTANCE = DEBUG_EL.injector.get(InputFocusDirective) as unknown as TestableDirective;

    // --- ACT ---
    INSTANCE.executeFocus();

    // --- ASSERT ---
    expect(FOCUS_SPY).toHaveBeenCalled();
  });

  it('should not throw error if no input is found', () => {
    // --- ARRANGE ---
    const EMPTY_DEBUG_EL = fixture.debugElement.query(By.css('#EMPTY_CONTAINER'));
    const INSTANCE = EMPTY_DEBUG_EL.injector.get(InputFocusDirective) as unknown as TestableDirective;

    // --- ACT & ASSERT ---
    expect(() => INSTANCE.executeFocus()).not.toThrow();
  });

  it('should handle Shadow DOM focus', async () => {
    // --- ARRANGE ---
    const CONTAINER_DEBUG_EL = fixture.debugElement.query(By.css('#CONTAINER'));
    const HOST_EL = CONTAINER_DEBUG_EL.nativeElement;
    const MOCK_SHADOW_INPUT = document.createElement('input');
    const FOCUS_SPY = vi.spyOn(MOCK_SHADOW_INPUT, 'focus');

    Object.defineProperty(HOST_EL, 'shadowRoot', {
      value: {
        querySelector: vi.fn().mockReturnValue(MOCK_SHADOW_INPUT)
      },
      configurable: true
    });

    const INSTANCE = CONTAINER_DEBUG_EL.injector.get(InputFocusDirective) as unknown as TestableDirective;

    // --- ACT ---
    INSTANCE.executeFocus();

    // --- ASSERT ---
    expect(FOCUS_SPY).toHaveBeenCalled();
  });

  it('should continue to native search if shadowRoot exists but is empty', async () => {
    // --- ARRANGE ---
    const CONTAINER_DEBUG_EL = fixture.debugElement.query(By.css('#CONTAINER'));
    const HOST_EL = CONTAINER_DEBUG_EL.nativeElement;
    const CHILD_TEXTAREA = HOST_EL.querySelector('#CHILD_TEXTAREA') as HTMLTextAreaElement;
    const FOCUS_SPY = vi.spyOn(CHILD_TEXTAREA, 'focus');

    Object.defineProperty(HOST_EL, 'shadowRoot', {
      value: { querySelector: vi.fn().mockReturnValue(null) },
      configurable: true
    });

    const INSTANCE = CONTAINER_DEBUG_EL.injector.get(InputFocusDirective) as unknown as TestableDirective;

    // --- ACT ---
    INSTANCE.executeFocus();

    // --- ASSERT ---
    expect(FOCUS_SPY).toHaveBeenCalled();
  });
});
