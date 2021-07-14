import { createGrid } from './helpers';

// createGrid()
test(`createGrid() takes two dimensions`, () => {
  createGrid(1000, 1000);
});

test(`createGrid() returns an array`, () => {
  expect(createGrid(10, 10)).toEqual(expect.any(Array));
});

// test(`createGrid() returns an array of the right size`, () => {

// });