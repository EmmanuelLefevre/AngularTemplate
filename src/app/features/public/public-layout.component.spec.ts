/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from '@core/_services/auth/auth.service';
import { ENVIRONMENT } from '@env/environment';

import { PublicLayoutComponent } from './public-layout.component';

describe('PublicLayoutComponent', () => {

  let component: PublicLayoutComponent;
  let fixture: ComponentFixture<PublicLayoutComponent>;

  const AUTH_SERVICE_MOCK = {
    isAuthenticated: vi.fn(() => false),
    currentUser: vi.fn(() => null)
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        PublicLayoutComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: AUTH_SERVICE_MOCK }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicLayoutComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isMockEnabled from the current environment', () => {
    expect(component.isMockEnabled).toBe(ENVIRONMENT.useMocks);
  });

  it('should render the mock admin login button when isMockEnabled is true', () => {
    // --- ARRANGE ---
    (component as any).isMockEnabled = true;
    fixture.debugElement.injector.get(ChangeDetectorRef).markForCheck();

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    const mockButton = fixture.debugElement.query(By.css('mock-admin-login-button'));

    expect(mockButton).toBeTruthy();
  });

  it('should NOT render the mock admin login button when isMockEnabled is false', () => {
    // --- ARRANGE ---
    (component as any).isMockEnabled = false;
    fixture.debugElement.injector.get(ChangeDetectorRef).markForCheck();

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    const mockButton = fixture.debugElement.query(By.css('mock-admin-login-button'));

    expect(mockButton).toBeFalsy();
  });
});
