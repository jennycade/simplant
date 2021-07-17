import { createGrid, findMidpoint, parseCoord, findMidline } from './helpers';

// createGrid()
test(`createGrid() takes two dimensions`, () => {
  createGrid(10, 10);
});

test(`createGrid() returns an array`, () => {
  expect(createGrid(10, 10)).toEqual(expect.any(Array));
});

test(`createGrid() returns an array of length 100 for a 10 x 10 board`, () => {
  const grid = createGrid(10,10);
  expect(grid.length).toBe(100);
});

// findMidpoint()
test(`findMidpoint() returns the coord '2,2' for shoot on a 5x5 grid`, () => {
  const grid = createGrid(5,6);
  expect(findMidpoint(grid, 'shoot')).toBe('2,2');
});

test(`findMidpoint() returns the coord '2,3' for root on a 5x5 grid`, () => {
  const grid = createGrid(5,6);
  expect(findMidpoint(grid, 'root')).toBe('2,3');
});

test(`findMidpoint() returns the coord '49, 49' for shoot on a 100x100 grid`, () => {
  const grid = createGrid(100,100);
  expect(findMidpoint(grid, 'shoot')).toBe('49,49');
});

// findMidline()
test(`findMidline() returns 2 for a 5x6 grid`, () => {
  const grid = createGrid(5, 6);
  expect(findMidline(grid)).toBe(2);
});

test(`findMidline() returns 49 for a 100x100 grid`, () => {
  const grid = createGrid(100, 100);
  expect(findMidline(grid)).toBe(49);
});

// // parseCoord()
test(`parseCoord() returns [1, 1] for coord '1,1'`, () => {
  expect(parseCoord('1,1')).toEqual([1,1]);
});
test(`parseCoord() returns [99, 99] for coord '99,99'`, () => {
  expect(parseCoord('99,99')).toEqual([99,99]);
});
