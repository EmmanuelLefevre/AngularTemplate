import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ErrorHandlerComponent } from './error-handler.component';

describe('ErrorHandlerComponent', () => {
  let component: ErrorHandlerComponent;
  let fixture: ComponentFixture<ErrorHandlerComponent>;

  // Create Vitest mock router
  const routerSpy = {
    navigate: vi.fn()
  };

  // QueryParams mock
  const queryParamsSubject = new BehaviorSubject<unknown>({});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorHandlerComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: queryParamsSubject.asObservable() }
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

  // --- Smoke test ---
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- Redirection tests ---

  it('should navigate to "unauthorized-error" when code is 401', () => {
    // Simulate value
    queryParamsSubject.next({ code: '401' });

    // Trigger change detection (launch ngOnInit)
    fixture.detectChanges();

    // Vitest assertion
    expect(routerSpy.navigate).toHaveBeenCalledWith(['unauthorized-error'], { queryParams: undefined });
  });

  it('should navigate to "unfound-error" when code is 404', () => {
    queryParamsSubject.next({ code: '404' });
    fixture.detectChanges();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['unfound-error'], { queryParams: undefined });
  });

  it('should navigate to "server-error" when code is 500', () => {
    queryParamsSubject.next({ code: '500' });
    fixture.detectChanges();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['server-error'], { queryParams: undefined });
  });

  it('should navigate to "generic-error" with params when code is valid but unhandled', () => {
    queryParamsSubject.next({ code: '418' });
    fixture.detectChanges();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['generic-error'], { queryParams: { code: '418' } });
  });

  it('should navigate to "unknown-error" without params when code is invalid (ex : 999)', () => {
    queryParamsSubject.next({ code: '999' });
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['unknown-error'], { queryParams: undefined });
  });

  // --- Home return test ---

  it('should navigate to /home when goHome() is called', () => {
    fixture.detectChanges();

    // Action
    component.goHome();

    // Assertion
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
});
