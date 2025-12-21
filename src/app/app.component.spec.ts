import { TestBed } from '@angular/core/testing';
import { provideRouter, RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

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

  it('should have a router outlet', () => {
    // --- ARRANGE ---
    const FIXTURE = TestBed.createComponent(AppComponent);

    // --- ACT ---
    FIXTURE.detectChanges();

    // --- ASSERT ---
    const OUTLET = FIXTURE.debugElement.query(By.directive(RouterOutlet));
    expect(OUTLET).toBeTruthy();
  });

  it('should have the correct title in the signal', () => {
    // --- ARRANGE ---
    const FIXTURE = TestBed.createComponent(AppComponent);
    const APP = FIXTURE.componentInstance;

    // --- ASSERT ---
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((APP as any).title()).toBe('AngularTemplate');
  });
});
