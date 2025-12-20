import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ErrorHandlerComponent } from './error-handler.component';

describe('ErrorHandlerComponent', () => {
  let component: ErrorHandlerComponent;
  let fixture: ComponentFixture<ErrorHandlerComponent>;

  // Create Vitest mock router
  const ROUTER_SPY = {
    navigate: vi.fn()
  };

  // QueryParams mock
  const QUERY_PARAMS_SUBJECT = new BehaviorSubject<unknown>({});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorHandlerComponent],
      providers: [
        { provide: Router, useValue: ROUTER_SPY },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: QUERY_PARAMS_SUBJECT.asObservable() }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorHandlerComponent);
    component = fixture.componentInstance;
  });

  // Clean after each test (prevents test '404' from influencing test '500')
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create', () => {
    // --- ASSERT ---
    expect(component).toBeTruthy();
  });

  it('should handle missing code parameter', () => {
    // --- ARRANGE ---
    QUERY_PARAMS_SUBJECT.next({});

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(component.code).toBe('');
    expect(ROUTER_SPY.navigate).toHaveBeenCalledWith(['unknown-error'], { queryParams: undefined });
  });

  it('should navigate to /home when the button is clicked in the UI', () => {
    // --- ARRANGE ---
    fixture.detectChanges();
    const BUTTON_DEBUG_EL = fixture.debugElement.query(By.css('button'));

    // --- ACT ---
    BUTTON_DEBUG_EL.triggerEventHandler('click', null);

    // --- ASSERT ---
    expect(ROUTER_SPY.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to /home when goHome() is called', () => {
    // --- ARRANGE ---
    fixture.detectChanges();

    // --- ACT ---
    component.goHome();

    // --- ASSERT ---
    expect(ROUTER_SPY.navigate).toHaveBeenCalledWith(['/home']);
  });

  // --- Redirection tests ---
  it('should navigate to "unauthorized-error" when code is 401', () => {
    // --- ARRANGE ---
    QUERY_PARAMS_SUBJECT.next({ code: '401' });

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(ROUTER_SPY.navigate).toHaveBeenCalledWith(['unauthorized-error'], { queryParams: undefined });
  });

  it('should navigate to "unfound-error" when code is 404', () => {
    // --- ARRANGE ---
    QUERY_PARAMS_SUBJECT.next({ code: '404' });

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(ROUTER_SPY.navigate).toHaveBeenCalledWith(['unfound-error'], { queryParams: undefined });
  });

  it('should navigate to "server-error" when code is 500', () => {
    // --- ARRANGE ---
    QUERY_PARAMS_SUBJECT.next({ code: '500' });

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(ROUTER_SPY.navigate).toHaveBeenCalledWith(['server-error'], { queryParams: undefined });
  });

  it('should navigate to "generic-error" with params when code is valid but unhandled', () => {
    // --- ARRANGE ---
    QUERY_PARAMS_SUBJECT.next({ code: '418' });

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(ROUTER_SPY.navigate).toHaveBeenCalledWith(['generic-error'], { queryParams: { code: '418' } });
  });

  it('should navigate to "unknown-error" without params when code is invalid (ex : 999)', () => {
    // --- ARRANGE ---
    QUERY_PARAMS_SUBJECT.next({ code: '999' });

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(ROUTER_SPY.navigate).toHaveBeenCalledWith(['unknown-error'], { queryParams: undefined });
  });
});
