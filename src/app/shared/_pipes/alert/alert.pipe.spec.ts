import { AlertPipe } from './alert.pipe';

import { describe, it, expect, beforeEach } from 'vitest';

describe('AlertPipe', () => {

  let pipe: AlertPipe;

  beforeEach(() => {
    // --- ARRANGE ---
    pipe = new AlertPipe();
  });

  it('should create an instance', () => {
    // --- ASSERT ---
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
