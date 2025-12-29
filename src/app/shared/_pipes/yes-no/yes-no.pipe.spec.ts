
import { YesNoPipe } from './yes-no.pipe';

describe('YesNoPipe', () => {

  let pipe: YesNoPipe;

  beforeEach(() => {
    pipe = new YesNoPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform true to "Oui"', () => {
    // --- ARRANGE ---
    const VALUE = true;

    // --- ACT ---
    const RESULT = pipe.transform(VALUE);

    // --- ASSERT ---
    expect(RESULT).toBe('Oui');
  });

  it('should transform false to "Non"', () => {
    // --- ARRANGE ---
    const VALUE = false;

    // --- ACT ---
    const RESULT = pipe.transform(VALUE);

    // --- ASSERT ---
    expect(RESULT).toBe('Non');
  });

  it('should fallback to "Non" when value is null or undefined (as any)', () => {
    // --- ARRANGE ---
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const VALUE = null as any;

    // --- ACT ---
    const RESULT = pipe.transform(VALUE);

    // --- ASSERT ---
    expect(RESULT).toBe('Non');
  });
});
