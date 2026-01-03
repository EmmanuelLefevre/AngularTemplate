import { provideRouter, Router } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { HeaderNavComponent } from './header-nav.component';

describe('HeaderNavComponent', () => {

  let component: HeaderNavComponent;
  let fixture: ComponentFixture<HeaderNavComponent>;

  let translateService: TranslateService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderNavComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideRouter([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderNavComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);

    vi.spyOn(translateService, 'getFallbackLang').mockReturnValue('fr');
    vi.spyOn(translateService, 'use').mockReturnValue(of({}));

    document.body.className = '';
  });

  afterEach(() => {
    document.body.classList.remove('no-scroll');
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should toggle the menu signal', () => {
    // --- ACT ---
    component.toggleMenu();

    // --- ASSERT ---
    expect(component.isMenuOpen()).toBe(true);
  });

  it('should force the menu to close when closeMenu() is called', () => {
    // --- ARRANGE ---
    component.isMenuOpen.set(true);
    expect(component.isMenuOpen()).toBe(true);

    // --- ACT ---
    component.closeMenu();

    // --- ASSERT ---
    expect(component.isMenuOpen()).toBe(false);
  });

  it('should add "no-scroll" class to body when menu is opened', () => {
    // --- ACT ---
    component.isMenuOpen.set(true);
    fixture.detectChanges();

    // --- ASSERT ---
    expect(document.body.classList.contains('no-scroll')).toBe(true);
  });

  it('should remove "no-scroll" class from body when menu is closed', () => {
    // --- ARRANGE ---
    component.isMenuOpen.set(true);
    fixture.detectChanges();
    expect(document.body.classList.contains('no-scroll')).toBe(true);

    // --- ACT ---
    component.isMenuOpen.set(false);
    fixture.detectChanges();

    // --- ASSERT ---
    expect(document.body.classList.contains('no-scroll')).toBe(false);
  });

  it('should close the menu and navigate to /login when onLoginClick() is called', () => {
    // --- ARRANGE ---
    const ROUTER = TestBed.inject(Router);
    const NAVIGATE_SPY = vi.spyOn(ROUTER, 'navigate').mockImplementation(() => Promise.resolve(true));
    const CLOSE_MESNU_SPY = vi.spyOn(component, 'closeMenu');

    // --- ACT ---
    component.onLoginClick();

    // --- ASSERT ---
    expect(CLOSE_MESNU_SPY).toHaveBeenCalled();
    expect(NAVIGATE_SPY).toHaveBeenCalledWith(['/login']);
  });
});
