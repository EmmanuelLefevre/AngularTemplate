/* eslint-disable @typescript-eslint/no-empty-function */

import { getTestBed, TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { beforeEach, vi } from 'vitest';

vi.mock('@lottiefiles/dotlottie-web', () => {
  return {
    DotLottie: class {
      addEventListener(): void {}
      removeEventListener(): void {}
      destroy(): void {}
      play(): void {}
      pause(): void {}
      static setWasmUrl(): void {}
    }
  };
});

Object.defineProperty(globalThis.HTMLMediaElement.prototype, 'load', {
  configurable: true,
  value: () => { /* Silence */ },
});

Object.defineProperty(globalThis, 'scrollTo', {
  configurable: true,
  value: () => { /* Silence */ },
});

globalThis.scroll = vi.fn();
globalThis.scrollBy = vi.fn();

getTestBed().resetTestEnvironment();

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
);

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()]
  });
});
