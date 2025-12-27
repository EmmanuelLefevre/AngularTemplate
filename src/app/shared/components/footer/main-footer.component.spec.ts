import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainFooterComponent } from './main-footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { FOOTER_SOCIAL_LINKS } from '@app/core/_config/social-links.constant';

describe('MainFooterComponent', () => {
  let component: MainFooterComponent;
  let fixture: ComponentFixture<MainFooterComponent>;

  let translate: TranslateService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        MainFooterComponent,
        FontAwesomeModule,
        TranslateModule.forRoot()
      ],
      providers: [provideRouter([])]
    }).compileComponents();

    translate = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(MainFooterComponent);
    component = fixture.componentInstance;

    translate.setTranslation('fr', {
      'FOOTER': {
        'COPYRIGHT': '©{{year}}',
        'OWNER_NAME': 'LEFEVRE Emmanuel',
        'RIGHTS_RESERVED': 'Tous droits réservés.'
      }
    });
    translate.use('fr');

    fixture.detectChanges();
  });

  it('should create the footer', () => {
    // --- ASSERT ---
    expect(component).toBeTruthy();
  });

  it('should render the correct current year', () => {
    // --- ARRANGE ---
    const CURRENT_YEAR = new Date().getFullYear().toString();

    // --- ACT ---
    const COPYRIGHT_ELEMENT = fixture.debugElement.query(By.css('.footer__copyright')).nativeElement;

    // --- ASSERT ---
    expect(COPYRIGHT_ELEMENT.textContent).toContain(CURRENT_YEAR);
  });

  it('should render all social links defined in constants', () => {
    // --- ARRANGE ---
    const EXPECTED_COUNT = FOOTER_SOCIAL_LINKS.length;

    // --- ACT ---
    const SOCIAL_ITEMS = fixture.debugElement.queryAll(By.css('.footer__social-item'));

    // --- ASSERT ---
    expect(SOCIAL_ITEMS.length).toBe(EXPECTED_COUNT);
  });

  it('should differentiate between internal routing and external links', () => {
    // --- ARRANGE ---
    const LINKS = fixture.debugElement.queryAll(By.css('.footer__link'));

    // --- ACT & ASSERT ---
    LINKS.forEach((linkDebugEl, index) => {
      const LINK_DATA = FOOTER_SOCIAL_LINKS[index];
      const NATIVE_ELEMENT = linkDebugEl.nativeElement;

      if (LINK_DATA.path) {
        expect(NATIVE_ELEMENT.getAttribute('href')).toBe(LINK_DATA.path);
      }
      else if (LINK_DATA.href) {
        expect(NATIVE_ELEMENT.getAttribute('href')).toBe(LINK_DATA.href);
        expect(NATIVE_ELEMENT.getAttribute('target')).toBe('_blank');
      }
    });
  });

  it('should have correct accessibility attributes (aria-label)', () => {
    // --- ARRANGE ---
    const FIRST_LINK_DEBUG_EL = fixture.debugElement.query(By.css('.footer__link'));

    // --- ACT ---
    const ARIA_LABEL = FIRST_LINK_DEBUG_EL.nativeElement.getAttribute('aria-label');

    // --- ASSERT ---
    expect(ARIA_LABEL).toBeTruthy();
  });
});