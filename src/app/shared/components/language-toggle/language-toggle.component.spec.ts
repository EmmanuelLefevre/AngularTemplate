import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageToggleComponent } from './language-toggle.component';

import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('LanguageToggleComponent', () => {
  let component: LanguageToggleComponent;
  let fixture: ComponentFixture<LanguageToggleComponent>;
  let onLangChange$: Subject<unknown>;

  beforeEach(async () => {
    onLangChange$ = new Subject();

    await TestBed.configureTestingModule({
      imports: [
        LanguageToggleComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: TranslateService,
          useValue: {
            onLangChange: onLangChange$.asObservable(),
            use: vi.fn().mockReturnValue(of(null)),
            getFallbackLang: vi.fn().mockReturnValue('fr'),
            get: vi.fn().mockReturnValue(of('')),
            stream: vi.fn().mockReturnValue(of('')),
            instant: vi.fn().mockImplementation((key) => key)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageToggleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // ARRANGE
    fixture.detectChanges();

    // ASSERT
    expect(component).toBeTruthy();
  });

  it('should update currentLang signal when service emits a change', () => {
    // ARRANGE
    fixture.detectChanges();

    // ACT
    onLangChange$.next({ lang: 'en' });
    fixture.detectChanges();

    // ASSERT
    expect(component.currentLang()).toBe('en');
  });
});




// it('should have initial language from fallback', () => {
//   expect(component.currentLang()).toBe('fr');
// });

// it('should call translate.use when switchLanguage is called', () => {
//   component.switchLanguage('en');
//   expect(translateServiceMock.use).toHaveBeenCalledWith('en');
// });
