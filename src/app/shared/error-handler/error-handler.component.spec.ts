/* eslint-disable @typescript-eslint/no-explicit-any */
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ErrorHandlerComponent } from './error-handler.component';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('ErrorHandlerComponent', () => {
  let component: ErrorHandlerComponent;
  let fixture: ComponentFixture<ErrorHandlerComponent>;

  let queryParams$: BehaviorSubject<any>;
  let router: Router;

  beforeEach(async () => {
    queryParams$ = new BehaviorSubject({});

    await TestBed.configureTestingModule({
      imports: [
        ErrorHandlerComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: vi.fn().mockResolvedValue(true),
            url: '/error'
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: queryParams$.asObservable(),
            snapshot: { firstChild: null }
          }
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

  it('should handle missing code parameter and navigate to unknown-error', () => {
    // --- ARRANGE ---
    queryParams$.next({});

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(component.code()).toBe('');
    expect(router.navigate).toHaveBeenCalledWith(
      ['unknown-error'],
      expect.objectContaining({
        queryParams: undefined,
        replaceUrl: true
      })
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
        relativeTo: expect.any(Object),
        replaceUrl: true
      })
    );
  });

  it('should cover the unknown-error branch (Regex FALSE)', () => {
    // --- ARRANGE ---
    queryParams$.next({ code: '999' });

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(router.navigate).toHaveBeenCalledWith(
      ['unknown-error'],
      expect.objectContaining({
        queryParams: { code: '999' },
        replaceUrl: true
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
        queryParams: { code: '401' },
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
        queryParams: { code: '404' },
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
        queryParams: { code: '500' },
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

  it('should NOT navigate if the current URL already includes an error page', () => {
    // --- ARRANGE ---
    Object.defineProperty(router, 'url', { get: () => '/error/unfound-error' });
    queryParams$.next({ code: '404' });

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should infer code 404 from URL when queryParams are missing', () => {
    // --- ARRANGE ---
    Object.defineProperty(router, 'url', { value: '/error/unfound-error', configurable: true });
    queryParams$.next({});

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(component.code()).toBe('404');
  });

  it('should infer code 401 from URL when queryParams are missing', () => {
    // --- ARRANGE ---
    Object.defineProperty(router, 'url', { value: '/error/unauthorized-error', configurable: true });
    queryParams$.next({});

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(component.code()).toBe('401');
  });

  it('should infer code 500 from URL when queryParams are missing', () => {
    // --- ARRANGE ---
    Object.defineProperty(router, 'url', { value: '/error/server-error', configurable: true });
    queryParams$.next({});

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(component.code()).toBe('500');
  });
});
