import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';

import { LinkComponent } from './link.component';

describe('LinkComponent', () => {

  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        LinkComponent
      ],
      providers: [
        provideRouter([]),
        provideTranslateService()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the label using signals', () => {
    // --- ARRANGE ---
    fixture.componentRef.setInput('label', 'MY_LINK_TEXT');

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    const SPAN = fixture.debugElement.query(By.css('.c-link__label'));
    expect(SPAN.nativeElement.textContent).toBeDefined();
    expect(SPAN.nativeElement.textContent).toContain('MY_LINK_TEXT');
  });

  it('should emit clicked and preventDefault when routerLink is null', () => {
    // --- ARRANGE ---
    const EVENT = new MouseEvent('click');
    const PREVENT_DEFAULT_SPY = vi.spyOn(EVENT, 'preventDefault');
    const EMIT_SPY = vi.spyOn(component.clicked, 'emit');

    fixture.componentRef.setInput('label', 'Action Link');
    fixture.componentRef.setInput('routerLink', null);
    fixture.detectChanges();

    // --- ACT ---
    component.onHandleClick(EVENT);

    // --- ASSERT ---
    expect(PREVENT_DEFAULT_SPY).toHaveBeenCalled();
    expect(EMIT_SPY).toHaveBeenCalledWith(EVENT);
  });

  it('should NOT preventDefault when routerLink is provided', () => {
    // --- ARRANGE ---
    const EVENT = new MouseEvent('click');
    const PREVENT_DEFAULT_SPY = vi.spyOn(EVENT, 'preventDefault');

    fixture.componentRef.setInput('label', 'Navigate');
    fixture.componentRef.setInput('routerLink', '/home');
    fixture.detectChanges();

    // --- ACT ---
    component.onHandleClick(EVENT);

    // --- ASSERT ---
    expect(PREVENT_DEFAULT_SPY).not.toHaveBeenCalled();
  });

  it('should apply custom class from input signal', () => {
    // --- ARRANGE ---
    fixture.componentRef.setInput('label', 'Styled Link');
    fixture.componentRef.setInput('customClass', 'my-custom-class');

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    const ANCHOR = fixture.debugElement.query(By.css('a'));
    expect(ANCHOR.nativeElement.classList.contains('my-custom-class')).toBe(true);
  });

  it('should render icon only when provided', () => {
    // --- ARRANGE ---
    fixture.componentRef.setInput('label', 'Icon Link');
    fixture.componentRef.setInput('icon', 'icon-test');

    // --- ACT ---
    fixture.detectChanges();

    // --- ASSERT ---
    let icon = fixture.debugElement.query(By.css('.c-link__icon'));
    expect(icon).toBeTruthy();

    // --- ACT (RE-ARRANGE/ACT) ---
    fixture.componentRef.setInput('icon', null);
    fixture.detectChanges();

    // --- ASSERT ---
    icon = fixture.debugElement.query(By.css('.c-link__icon'));
    expect(icon).toBeNull();
  });
});
