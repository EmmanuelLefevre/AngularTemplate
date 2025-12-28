
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
    const INPUT = true;

    // --- ACT ---
    const RESULT = pipe.transform(INPUT);

    // --- ASSERT ---
    expect(RESULT).toBe('Oui');
  });

  it('should transform false to "Non"', () => {
    // --- ARRANGE ---
    const INPUT = false;

    // --- ACT ---
    const RESULT = pipe.transform(INPUT);

    // --- ASSERT ---
    expect(RESULT).toBe('Non');
  });
});
