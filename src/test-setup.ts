import { getTestBed, TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { beforeEach } from 'vitest';

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