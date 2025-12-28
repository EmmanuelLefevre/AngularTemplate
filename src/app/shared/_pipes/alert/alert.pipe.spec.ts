
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
    const PRESENCE = true;

    // --- ACT ---
    const RESULT = pipe.transform(PRESENCE);

    // --- ASSERT ---
    expect(RESULT).toBe('Alerte !');
  });

  it('should transform false to "-"', () => {
    // --- ARRANGE ---
    const NO_PRESENCE = false;

    // --- ACT ---
    const RESULT = pipe.transform(NO_PRESENCE);

    // --- ASSERT ---
    expect(RESULT).toBe('-');
  });
});
