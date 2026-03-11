import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TypeWriterDirective } from './typewriter.directive';

const DEFAULT_SPEED_MS = 40;
const EMPTY_TEXT_TIMEOUT_MS = 2000;
const INITIAL_DELAY_MS = 500;

const ONE_CHAR_TYPING_MS = 40;
const EIGHT_CHARS_TYPING_MS = 320;
const THREE_CHARS_CUSTOM_TYPING_MS = 30;

@Component({
  imports: [TypeWriterDirective],
  template: `
    <p id="default-speed" [typeWriter]="40">Film Noir</p>
    <p id="custom-speed" [typeWriter]="10">Fast</p>
    <p id="empty-text" [typeWriter]="40">   </p>
  `
})

class TestHostComponent {}

describe('TypeWriterDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async() => {
    vi.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should do nothing if the text content is empty', () => {
    // --- ARRANGE ---
    fixture.detectChanges();
    const HTML_ELEMENT = fixture.debugElement.query(By.css('#empty-text')).nativeElement;

    // --- ACT ---
    vi.advanceTimersByTime(EMPTY_TEXT_TIMEOUT_MS);

    // --- ASSERT ---
    expect(HTML_ELEMENT.textContent).toBe('');
    expect(HTML_ELEMENT.classList.contains('typing-finished')).toBe(false);
  });

  it('should type text character by character using default speed', () => {
    // --- ARRANGE ---
    fixture.detectChanges();
    const HTML_ELEMENT = fixture.debugElement.query(By.css('#default-speed')).nativeElement;

    // --- ACT ---
    vi.advanceTimersByTime(INITIAL_DELAY_MS);
    vi.advanceTimersByTime(ONE_CHAR_TYPING_MS);

    // --- ASSERT ---
    expect(HTML_ELEMENT.textContent).toBe('Fi');
  });

  it('should append the typing-finished class once the typing is complete', () => {
    // --- ARRANGE ---
    fixture.detectChanges();
    const HTML_ELEMENT = fixture.debugElement.query(By.css('#default-speed')).nativeElement;

    // --- ACT ---
    vi.advanceTimersByTime(INITIAL_DELAY_MS);
    vi.advanceTimersByTime(EIGHT_CHARS_TYPING_MS);
    vi.advanceTimersByTime(DEFAULT_SPEED_MS);

    // --- ASSERT ---
    expect(HTML_ELEMENT.textContent).toBe('Film Noir');
    expect(HTML_ELEMENT.classList.contains('typing-finished')).toBe(true);
  });

  it('should respect the custom typing speed provided via input', () => {
    // --- ARRANGE ---
    fixture.detectChanges();
    const HTML_ELEMENT = fixture.debugElement.query(By.css('#custom-speed')).nativeElement;

    // --- ACT ---
    vi.advanceTimersByTime(INITIAL_DELAY_MS);
    vi.advanceTimersByTime(THREE_CHARS_CUSTOM_TYPING_MS);

    // --- ASSERT ---
    expect(HTML_ELEMENT.textContent).toBe('Fast');
  });

  it('should clear timeouts when the component is destroyed', () => {
    // --- ARRANGE ---
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
    fixture.detectChanges();

    // --- ACT ---
    fixture.destroy();

    // --- ASSERT ---
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
