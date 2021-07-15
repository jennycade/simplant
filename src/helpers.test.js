import { createGrid } from './helpers';

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