/* eslint-disable @typescript-eslint/no-magic-numbers */
import { TestBed } from '@angular/core/testing';

import { AlertPipe } from './alert.pipe';

describe('AlertPipe', () => {

  let pipe: AlertPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AlertPipe],
      providers: [AlertPipe]
    });
    pipe = TestBed.inject(AlertPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('Value presence (Truthy)', () => {
    it('should return "Alerte !" when value is truthy', () => {
      // --- ARRANGE ---
      const TEST_VALUES = [true, 'Attention', 1, { id: 1 }];

      // --- ACT & ASSERT ---
      TEST_VALUES.forEach(VAL => {
        const RESULT = pipe.transform(VAL);
        expect(RESULT).toBe('Alerte !');
      });
    });
  });

  describe('Value absence (Falsy)', () => {
    it('should return "-" when value is falsy', () => {
      // --- ARRANGE ---
      const TEST_VALUES = [false, '', 0, null, undefined];

      // --- ACT & ASSERT ---
      TEST_VALUES.forEach(VAL => {
        const RESULT = pipe.transform(VAL);
        expect(RESULT).toBe('-');
      });
    });
  });
});
