/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from '@core/_services/auth/auth.service';
import { ENVIRONMENT } from '@env/environment';

import { PublicLayoutComponent } from './public-layout.component';

vi.mock('@shared/_utils/dev/mock/mock-routing.util', () => ({
  injectIsHomeRoute: vi.fn()
}));

import { injectIsHomeRoute } from '@app/shared/_utils/dev/mock/mock-routing.util';
import { Mock } from 'vitest';

describe('PublicLayoutComponent', () => {

  let component: PublicLayoutComponent;
  let fixture: ComponentFixture<PublicLayoutComponent>;

  const AUTH_SERVICE_MOCK = {
    isAuthenticated: vi.fn(() => false),
    currentUser: vi.fn(() => null)
  };

  beforeEach(async() => {
    (injectIsHomeRoute as Mock).mockReturnValue(signal(false));

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
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isMockEnabled from the current environment', () => {
    expect(component.isMockEnabled).toBe(ENVIRONMENT.useMocks);
  });

  it('should initialize isMockEnabled from the current environment', () => {
    // --- ARRANGE ---

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    expect(component.isMockEnabled).toBe(ENVIRONMENT.useMocks);
  });

  describe('Mock Button Rendering', () => {
    it('should render the mock button when isMockEnabled is TRUE AND isHomeRoute is TRUE', () => {
      // --- ARRANGE ---
      (component as any).isMockEnabled = true;
      (component as any).isHomeRoute = signal(true);

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      const mockButton = fixture.debugElement.query(By.css('mock-admin-login-button'));
      expect(mockButton).toBeTruthy();
    });

    it('should NOT render the mock button when isMockEnabled is TRUE BUT isHomeRoute is FALSE', () => {
      // --- ARRANGE ---
      (component as any).isMockEnabled = true;
      (component as any).isHomeRoute = signal(false);

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      const mockButton = fixture.debugElement.query(By.css('mock-admin-login-button'));
      expect(mockButton).toBeFalsy();
    });

    it('should NOT render the mock button when isMockEnabled is FALSE (Prod Mode)', () => {
      // --- ARRANGE ---
      (component as any).isMockEnabled = false;
      (component as any).isHomeRoute = signal(true);

      // --- ACT ---
      fixture.detectChanges();

      // --- ASSERT ---
      const mockButton = fixture.debugElement.query(By.css('mock-admin-login-button'));
      expect(mockButton).toBeFalsy();
    });
  });

  describe('Initialization Branches (Coverage 100%)', () => {
    it('should initialize isHomeRoute with a false signal when ENVIRONMENT.useMocks is FALSE', () => {
      // --- ARRANGE ---
      const originalMockValue = ENVIRONMENT.useMocks;

      (ENVIRONMENT as any).useMocks = false;

      // --- ACT ---
      const prodFixture = TestBed.createComponent(PublicLayoutComponent);
      const prodComponent = prodFixture.componentInstance;

      // --- ASSERT ---
      expect(prodComponent.isHomeRoute()).toBe(false);

      // --- CLEANUP ---
      (ENVIRONMENT as any).useMocks = originalMockValue;
    });
  });
});
