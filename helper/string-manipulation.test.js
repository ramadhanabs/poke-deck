/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
import formatCapital from './string-manipulation';

const tests = [
  { input: 'pikachu', result: 'Pikachu' },
  { input: 'elder', result: 'Elder' },
  { input: 'big smoke', result: 'Big smoke' },
  { input: '123123', result: '123123' },
];

describe('Positive Test Cases', () => {
  for (let i = 0; i < tests.length; i += 1) {
    test('return color class based on type', () => {
      expect(formatCapital(tests[i].input)).toBe(tests[i].result);
    });
  }
});
