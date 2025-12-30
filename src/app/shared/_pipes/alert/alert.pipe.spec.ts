import { AlertPipe } from './alert.pipe';

describe('AlertPipe', () => {

  let pipe: AlertPipe;

  beforeEach(() => {
    pipe = new AlertPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform true to "Alerte !"', () => {
    // --- ARRANGE ---
    const HAS_ALERT = true;

    // --- ACT ---
    const RESULT = pipe.transform(HAS_ALERT);

    // --- ASSERT ---
    expect(RESULT).toBe('Alerte !');
  });

  it('should transform false to "-"', () => {
    // --- ARRANGE ---
    const HAS_ALERT = false;

    // --- ACT ---
    const RESULT = pipe.transform(HAS_ALERT);

    // --- ASSERT ---
    expect(RESULT).toBe('-');
  });

  it('should return "-" as a fallback for null or undefined values', () => {
    // --- ARRANGE ---
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const UNKNOWN_VALUE = null as any;

    // --- ACT ---
    const RESULT = pipe.transform(UNKNOWN_VALUE);

    // --- ASSERT ---
    expect(RESULT).toBe('-');
  });
});
