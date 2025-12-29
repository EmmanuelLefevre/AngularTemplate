/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { signal } from '@angular/core';

import { AdminLayoutComponent } from './admin-layout.component';
import { AuthService } from '@core/_services/auth/auth.service';
import { User } from '@core/_models/user/user.model';

describe('AdminLayoutComponent', () => {

  let fixture: ComponentFixture<AdminLayoutComponent>;
  let component: AdminLayoutComponent;
  let router: Router;

  const MOCK_USER: Partial<User> = { username: 'Admin Test' };

  const AUTH_SERVICE_MOCK = {
    currentUser: signal(MOCK_USER),
    logout: () => {}
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [AdminLayoutComponent],
      providers: [
        { provide: AuthService, useValue: AUTH_SERVICE_MOCK },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the username from the signal', () => {
    // --- ARRANGE ---
    const DEBUG_ELEMENT = fixture.nativeElement as HTMLElement;

    // --- ACT ---
    const NAME_SPAN = DEBUG_ELEMENT.querySelector('.user-info__name');

    // --- ASSERT ---
    expect(NAME_SPAN?.textContent).toContain('Admin Test');
  });

  it('should trigger logout process when logout is called', () => {
    // --- ARRANGE ---
    const LOGOUT_SPY = vitest.spyOn(AUTH_SERVICE_MOCK, 'logout');
    const NAVIGATE_SPY = vi.spyOn(router, 'navigate');

    // --- ACT ---
    component.logout();

    // --- ASSERT ---
    expect(LOGOUT_SPY).toHaveBeenCalled();
    expect(NAVIGATE_SPY).toHaveBeenCalledWith(['/']);
  });
});
