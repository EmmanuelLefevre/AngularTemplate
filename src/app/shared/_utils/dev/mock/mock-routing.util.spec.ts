/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-magic-numbers */

import { TestBed } from '@angular/core/testing';
import { Router, NavigationEnd, NavigationStart, Event as RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';

import { injectIsHomeRoute } from './mock-routing.util';

describe('injectIsHomeRoute', () => {
  let routerEventsSubject: Subject<RouterEvent>;
  let mockRouter: any;

  beforeEach(() => {
    routerEventsSubject = new Subject<RouterEvent>();

    mockRouter = {
      url: '/',
      events: routerEventsSubject.asObservable()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    });
  });

  it('should return true initially if the route is "/"', () => {
    // --- ARRANGE ---
    mockRouter.url = '/';

    // --- ACT ---
    const isHome = TestBed.runInInjectionContext(() => injectIsHomeRoute());

    // --- ASSERT ---
    expect(isHome()).toBe(true);
  });

  it('should return true initially if the route is "/home"', () => {
    // --- ARRANGE ---
    mockRouter.url = '/home';

    // --- ACT ---
    const isHome = TestBed.runInInjectionContext(() => injectIsHomeRoute());

    // --- ASSERT ---
    expect(isHome()).toBe(true);
  });

  it('should return false initially if the route is "/dashboard"', () => {
    // --- ARRANGE ---
    mockRouter.url = '/dashboard';

    // --- ACT ---
    const isHome = TestBed.runInInjectionContext(() => injectIsHomeRoute());

    // --- ASSERT ---
    expect(isHome()).toBe(false);
  });

  it('should ignore query parameters and return true for "/home?code=123"', () => {
    // --- ARRANGE ---
    mockRouter.url = '/home?code=123';

    // --- ACT ---
    const isHome = TestBed.runInInjectionContext(() => injectIsHomeRoute());

    // --- ASSERT ---
    expect(isHome()).toBe(true);
  });

  it('should update the signal to false when navigating away from home (NavigationEnd)', () => {
    // --- ARRANGE ---
    mockRouter.url = '/';
    const isHome = TestBed.runInInjectionContext(() => injectIsHomeRoute());

    // --- ACT ---
    mockRouter.url = '/admin';
    routerEventsSubject.next(new NavigationEnd(1, '/admin', '/admin'));

    // --- ASSERT ---
    expect(isHome()).toBe(false);
  });

  it('should update the signal to true when navigating back to home (NavigationEnd)', () => {
    // --- ARRANGE ---
    mockRouter.url = '/dashboard';
    const isHome = TestBed.runInInjectionContext(() => injectIsHomeRoute());

    // --- ACT ---
    mockRouter.url = '/home';
    routerEventsSubject.next(new NavigationEnd(2, '/home', '/home'));

    // --- ASSERT ---
    expect(isHome()).toBe(true);
  });

  it('should ignore router events other than NavigationEnd', () => {
    // --- ARRANGE ---
    mockRouter.url = '/';
    const isHome = TestBed.runInInjectionContext(() => injectIsHomeRoute());

    // --- ACT ---
    mockRouter.url = '/admin';
    routerEventsSubject.next(new NavigationStart(1, '/admin'));

    // --- ASSERT ---
    expect(isHome()).toBe(true);
  });
});
