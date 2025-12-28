/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {

  let pipe: DateFormatPipe;

  beforeEach(() => {
    pipe = new DateFormatPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a valid ISO date string to French format (DD/MM/YYYY)', () => {
    // --- ARRANGE ---
    const INPUT_DATE = '2025-12-28';
    const EXPECTED_OUTPUT = '28/12/2025';

    // --- ACT ---
    const RESULT = pipe.transform(INPUT_DATE);

    // --- ASSERT ---
    expect(RESULT).toBe(EXPECTED_OUTPUT);
  });

  it('should format a date-time string by ignoring the time part', () => {
    // --- ARRANGE ---
    const INPUT_DATETIME = '2025-05-15T14:30:00Z';
    const EXPECTED_OUTPUT = '15/05/2025';

    // --- ACT ---
    const RESULT = pipe.transform(INPUT_DATETIME);

    // --- ASSERT ---
    expect(RESULT).toBe(EXPECTED_OUTPUT);
  });

  it('should return an empty string when value is null or undefined', () => {
    // --- ARRANGE ---
    const NULL_VALUE = null as any;
    const UNDEFINED_VALUE = undefined as any;

    // --- ACT ---
    const RESULT_NULL = pipe.transform(NULL_VALUE);
    const RESULT_UNDEFINED = pipe.transform(UNDEFINED_VALUE);

    // --- ASSERT ---
    expect(RESULT_NULL).toBe('');
    expect(RESULT_UNDEFINED).toBe('');
  });

  it('should return an empty string when value is an empty string', () => {
    // --- ARRANGE ---
    const EMPTY_STRING = '';

    // --- ACT ---
    const RESULT = pipe.transform(EMPTY_STRING);

    // --- ASSERT ---
    expect(RESULT).toBe('');
  });

  it('should handle invalid date strings gracefully', () => {
    // --- ARRANGE ---
    const INVALID_INPUT = 'not-a-date';

    // --- ACT ---
    const RESULT = pipe.transform(INVALID_INPUT);

    // --- ASSERT ---
    // By default, toLocaleDateString returns "Invalid Date" for an invalid Date object
    expect(RESULT).toBe('Invalid Date');
  });
});
