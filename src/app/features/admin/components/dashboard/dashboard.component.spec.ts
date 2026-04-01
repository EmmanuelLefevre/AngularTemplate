import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from '@core/_services/auth/auth.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const AUTH_SERVICE_MOCK = {
    currentUser: signal({ username: 'Admin', roles: ['ADMIN'] }),
    isAdmin: signal(true),
    isAuthenticated: signal(true)
  };

  beforeEach(async() => {

    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: AUTH_SERVICE_MOCK }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
