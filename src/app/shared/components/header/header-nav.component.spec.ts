import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderNavComponent } from './header-nav.component';

import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('HeaderNavComponent', () => {
  let component: HeaderNavComponent;
  let fixture: ComponentFixture<HeaderNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderNavComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideRouter([]),
        {
          provide: TranslateService,
          useValue: {
            onLangChange: of({ lang: 'fr', translations: {} }),
            getFallbackLang: vi.fn().mockReturnValue('fr'),
            get: vi.fn().mockReturnValue(of('')),
            stream: vi.fn().mockReturnValue(of('')),
            instant: vi.fn().mockImplementation((key) => key)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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
});
