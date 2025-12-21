/* eslint-disable @typescript-eslint/no-explicit-any */
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ErrorHandlerComponent } from './error-handler.component';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ErrorHandlerComponent', () => {
  let component: ErrorHandlerComponent;
  let fixture: ComponentFixture<ErrorHandlerComponent>;

  let queryParams$: BehaviorSubject<any>;
  let router: Router;

  beforeEach(async () => {
    queryParams$ = new BehaviorSubject({});

    await TestBed.configureTestingModule({
      imports: [ErrorHandlerComponent],
      providers: [
        {
          provide: Router,
          useValue: { navigate: vi.fn().mockResolvedValue(true) }
        },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: queryParams$.asObservable() }
        }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ErrorHandlerComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create', () => {
    // --- ASSERT ---
    expect(component).toBeTruthy();
  });

  it('should handle missing code parameter', () => {
    // --- ARRANGE ---
    queryParams$.next({});

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(component.code()).toBe('');
    expect(router.navigate).toHaveBeenCalledWith(
      ['unknown-error'],
      expect.objectContaining({ queryParams: undefined })
    );
  });

  it('should cover the generic-error branch (Regex TRUE)', () => {
    const customCode = '418';
    queryParams$.next({ code: customCode });

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(router.navigate).toHaveBeenCalledWith(
      ['generic-error'],
      expect.objectContaining({
        queryParams: { code: customCode },
        relativeTo: expect.any(Object)
      })
    );
  });

  it('should cover the unknown-error branch (Regex FALSE)', () => {
    // --- ARRANGE ---
    queryParams$.next({ code: '999' });

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(router.navigate).toHaveBeenCalledWith(['unknown-error'], expect.anything());
  });

  it('should handle missing code parameter', () => {
    // --- ARRANGE ---
    queryParams$.next({});

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(component.code()).toBe('');
    expect(router.navigate).toHaveBeenCalledWith(
      ['unknown-error'],
      expect.objectContaining({
        queryParams: undefined
      })
    );
  });

  it('should navigate to /home when the button is clicked in the UI', () => {
    // --- ARRANGE ---
    fixture.detectChanges();
    const BUTTON_DEBUG_EL = fixture.debugElement.query(By.css('button'));

    // --- ACT ---
    BUTTON_DEBUG_EL.triggerEventHandler('click', null);

    // --- ASSERT ---
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to /home when goHome() is called', () => {
    // --- ARRANGE ---
    fixture.detectChanges();

    // --- ACT ---
    component.goHome();

    // --- ASSERT ---
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  // --- Redirection tests ---

  it('should navigate to "unauthorized-error" when code is 401', () => {
    // --- ARRANGE ---
    queryParams$.next({ code: '401' });

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(router.navigate).toHaveBeenCalledWith(
      ['unauthorized-error'],
      expect.objectContaining({
        queryParams: undefined,
        relativeTo: expect.any(Object)
      })
    );
  });

  it('should navigate to "unfound-error" when code is 404', () => {
    // --- ARRANGE ---
    queryParams$.next({ code: '404' });

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(router.navigate).toHaveBeenCalledWith(
      ['unfound-error'],
      expect.objectContaining({
        queryParams: undefined,
        relativeTo: expect.any(Object)
      })
    );
  });

  it('should navigate to "server-error" when code is 500', () => {
    // --- ARRANGE ---
    queryParams$.next({ code: '500' });

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(router.navigate).toHaveBeenCalledWith(
      ['server-error'],
      expect.objectContaining({
        queryParams: undefined,
        relativeTo: expect.any(Object)
      })
    );
  });

  it('should navigate to "generic-error" with params when code is valid but unhandled', () => {
    // --- ARRANGE ---
    const customCode = '418';
    queryParams$.next({ code: customCode });

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(router.navigate).toHaveBeenCalledWith(
      ['generic-error'],
      expect.objectContaining({
        queryParams: { code: customCode },
        relativeTo: expect.any(Object)
      })
    );
  });

  it('should navigate to "unknown-error" without params when code is invalid (ex : 999)', () => {
    // --- ARRANGE ---
    queryParams$.next({ code: '999' });

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(router.navigate).toHaveBeenCalledWith(
      ['unknown-error'],
      expect.objectContaining({
        queryParams: undefined,
        relativeTo: expect.any(Object)
      })
    );
  });
});
