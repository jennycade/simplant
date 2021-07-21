import { parseCoord } from './helpers';

// // parseCoord()
test(`parseCoord() returns [1, 1] for coord '1,1'`, () => {
  expect(parseCoord('1,1')).toEqual([1,1]);
});
test(`parseCoord() returns [99, 99] for coord '99,99'`, () => {
  expect(parseCoord('99,99')).toEqual([99,99]);
});
