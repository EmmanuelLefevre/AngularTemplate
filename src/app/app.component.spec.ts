import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { TestBed } from '@angular/core/testing';

import { describe, it, expect, beforeEach } from 'vitest';

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    // --- ACT ---
    const FIXTURE = TestBed.createComponent(AppComponent);
    const APP = FIXTURE.componentInstance;

    // --- ASSERT ---
    expect(APP).toBeTruthy();
  });

  it('should render title', async () => {
    // --- ARRANGE ---
    const FIXTURE = TestBed.createComponent(AppComponent);

    // --- ACT ---
    FIXTURE.detectChanges();
    await FIXTURE.whenStable();

    // --- ASSERT ---
    const COMPILED = FIXTURE.nativeElement as HTMLElement;
    expect(COMPILED.querySelector('h1')?.textContent).toContain('AngularTemplate');
  });

  it('should verify signal value directly', () => {
    // --- ARRANGE ---
    const FIXTURE = TestBed.createComponent(AppComponent);
    const APP = FIXTURE.componentInstance;

    // --- ACT ---
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const TITLE_VALUE = (APP as any).title();

    // --- ASSERT ---
    expect(TITLE_VALUE).toBe('AngularTemplate');
  });
});
