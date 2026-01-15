import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LogoComponent } from './logo.component';

const DEFAULT_HEIGHT = 'auto';
const DEFAULT_WIDTH = 120;
const LINK_ID = 1;
const TEST_SRC = 'assets/logo.svg';
const TEST_ALT = 'Texte alternatif du logo';

interface LogoInputs {
  src?: string;
  alt?: string;
  link?: string | (string | number)[] | null;
  width?: string | number;
  height?: string | number;
  priority?: boolean;
}

describe('LogoComponent', () => {

  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  async function setup(inputs: LogoInputs = {}): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [LogoComponent],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('src', TEST_SRC);
    fixture.componentRef.setInput('alt', TEST_ALT);

    Object.entries(inputs).forEach(([key, value]) => {
      fixture.componentRef.setInput(key, value);
    });

    await fixture.whenStable();
  }

  it('should create the logo', async() => {
    // --- ACT ---
    await setup();

    // --- ASSERT ---
    expect(component).toBeTruthy();
  });

  describe('Default Config', () => {
    it('should apply the initial dimensions to the host\'s CSS variables', async() => {
      // --- ACT ---
      await setup();
      const HOST = fixture.nativeElement as HTMLElement;

      // --- ASSERT ---
      expect(HOST.style.getPropertyValue('--logo-width')).toBe(`${DEFAULT_WIDTH}px`);
      expect(HOST.style.getPropertyValue('--logo-height')).toBe(DEFAULT_HEIGHT);
    });

    it('should display a <div> tag for the wrapper when no link is provided', async() => {
      // --- ACT ---
      await setup();
      const WRAPPER = fixture.nativeElement.querySelector('.logo__wrapper');

      // --- ASSERT ---
      expect(WRAPPER.tagName.toLowerCase()).toBe('div');
      expect(fixture.nativeElement.classList.contains('logo--clickable')).toBe(false);
    });
  });

  describe('Dimension Formatting', () => {
    it('should convert a number into pixels for the width', async() => {
      // --- ARRANGE ---
      const INPUT = { width: 300 };

      // --- ACT ---
      await setup(INPUT);
      const HOST = fixture.nativeElement as HTMLElement;

      // --- ASSERT ---
      expect(HOST.style.getPropertyValue('--logo-width')).toBe('300px');
    });

    it('should retain the string value as is for the width', async() => {
      // --- ARRANGE ---
      const INPUT = { width: '100%' };

      // --- ACT ---
      await setup(INPUT);
      const HOST = fixture.nativeElement as HTMLElement;

      // --- ASSERT ---
      expect(HOST.style.getPropertyValue('--logo-width')).toBe('100%');
    });

    it('should convert a number into pixels for the height', async() => {
      // --- ARRANGE ---
      const INPUT = { height: 150 };

      // --- ACT ---
      await setup(INPUT);
      const HOST = fixture.nativeElement as HTMLElement;

      // --- ASSERT ---
      expect(HOST.style.getPropertyValue('--logo-height')).toBe('150px');
    });

    it('should retain the string value for the height', async() => {
      // --- ARRANGE ---
      const INPUT = { height: '50vh' };

      // --- ACT ---
      await setup(INPUT);
      const HOST = fixture.nativeElement as HTMLElement;

      // --- ASSERT ---
      expect(HOST.style.getPropertyValue('--logo-height')).toBe('50vh');
    });
  });

  describe('Link Logic', () => {
    it('should render an <a> with aria-label when link is present', async() => {
      // --- ARRANGE ---
      const INPUT = { link: '/accueil' };

      // --- ACT ---
      await setup(INPUT);
      const LINK_ELEMENT = fixture.nativeElement.querySelector('a');

      // --- ASSERT ---
      expect(LINK_ELEMENT).toBeTruthy();
      expect(LINK_ELEMENT.getAttribute('href')).toBe('/accueil');
      expect(LINK_ELEMENT.getAttribute('aria-label')).toBe(TEST_ALT);
      expect(fixture.nativeElement.classList.contains('logo--clickable')).toBe(true);
    });

    it('should support links in table format', async() => {
      // --- ARRANGE ---
      const INPUT = { link: ['/page', LINK_ID] };

      // --- ACT ---
      await setup(INPUT);
      const LINK_ELEMENT = fixture.nativeElement.querySelector('a');

      // --- ASSERT ---
      expect(LINK_ELEMENT.getAttribute('href')).toBe('/page/1');
    });
  });

  describe('Image Attributes and Performance', () => {
    it('should apply loading="eager" and priority="high" if priority is true', async() => {
      // --- ARRANGE ---
      const INPUT = { priority: true };

      // --- ACT ---
      await setup(INPUT);
      const IMG = fixture.nativeElement.querySelector('img');

      // --- ASSERT ---
      expect(IMG.getAttribute('loading')).toBe('eager');
      expect(IMG.getAttribute('fetchpriority')).toBe('high');
    });

    it('should remain in lazy loading by default', async() => {
      // --- ARRANGE ---
      const INPUT = { priority: false };

      // --- ACT ---
      await setup(INPUT);
      const IMG = fixture.nativeElement.querySelector('img');

      // --- ASSERT ---
      expect(IMG.getAttribute('loading')).toBe('lazy');
      expect(IMG.getAttribute('fetchpriority')).toBe('auto');
    });

    it('should have the correct src and alt', async() => {
      // --- ACT ---
      await setup();
      const IMG = fixture.nativeElement.querySelector('img');

      // --- ASSERT ---
      expect(IMG.src).toContain(TEST_SRC);
      expect(IMG.alt).toBe(TEST_ALT);
    });
  });
});
