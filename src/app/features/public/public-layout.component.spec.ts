import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from '@core/_services/auth/auth.service';

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
});
