/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
import pokemonColor from './pokemon-color';

const tests = [
  { type: 'grass', color: 'bg-green-400' },
  { type: 'fire', color: 'bg-red-400' },
  { type: 'fighting', color: 'bg-red-400' },
  { type: 'bug', color: 'bg-yellow-500' },
];

const negativeTests = [
  { type: 'blablabla', color: 'bg-blue-400' },
  { type: 'WrOngCases', color: 'bg-blue-400' },
  { type: '123123', color: 'bg-blue-400' },
  { type: 'wrong_cases', color: 'bg-blue-400' },
  { type: true, color: 'bg-blue-400' },
  { type: 123124, color: 'bg-blue-400' },
  { type: () => {}, color: 'bg-blue-400' },
];

describe('Positive Test Cases', () => {
  for (let i = 0; i < tests.length; i += 1) {
    test('return color class based on type', () => {
      expect(pokemonColor(tests[i].type)).toBe(tests[i].color);
    });
  }
});

describe('Negative Test Cases', () => {
  for (let i = 0; i < negativeTests.length; i += 1) {
    test('return default color', () => {
      expect(pokemonColor(negativeTests[i].type)).toBe(negativeTests[i].color);
    });
  }
});
