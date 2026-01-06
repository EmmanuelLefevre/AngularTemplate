import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { CloseButtonComponent } from './close-button.component';

describe('CloseButtonComponent', () => {

  let component: CloseButtonComponent;
  let fixture: ComponentFixture<CloseButtonComponent>;

  const ROUTER_MOCK = {
    url: '',
    navigate: vi.fn()
  };

  const LOCATION_MOCK = {
    back: vi.fn()
  };

  beforeEach(async() => {
    ROUTER_MOCK.url = '';

    await TestBed.configureTestingModule({
      imports: [
        CloseButtonComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        TranslateService,
        { provide: Router, useValue: ROUTER_MOCK },
        { provide: Location, useValue: LOCATION_MOCK }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CloseButtonComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('goBack()', () => {
    it('should navigate to root (/) when current URL is /login', () => {
      // --- ARRANGE ---
      ROUTER_MOCK.url = '/login';

      // --- ACT ---
      component.goBack();

      // --- ASSERT ---
      expect(ROUTER_MOCK.navigate).toHaveBeenCalledWith(['/']);
      expect(LOCATION_MOCK.back).not.toHaveBeenCalled();
    });

    it('should call location.back() when NOT on login page', async() => {
      // --- ARRANGE ---
      ROUTER_MOCK.url = '/home';

      // --- ACT ---
      component.goBack();

      // --- ASSERT ---
      expect(LOCATION_MOCK.back).toHaveBeenCalledOnce();
      expect(ROUTER_MOCK.navigate).not.toHaveBeenCalled();
    });
  });

  it('should render the font-awesome icon', () => {
    // --- ARRANGE ---
    const COMPILED = fixture.nativeElement as HTMLElement;

    // --- ACT ---
    const ICON = COMPILED.querySelector('fa-icon');

    // --- ASSERT ---
    expect(ICON).toBeTruthy();
  });
});
