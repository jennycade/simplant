import Plant from './Plant';
import { createGrid } from './helpers';

// setCoords(coords)
test('Plant has function setCoords(coords)', () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    setCoords: expect.any(Function),
  });
});

test(`setCoords() takes an array of coordinates`, () => {
  const plant = Plant();
  const coords = createGrid(10,10);
  plant.setCoords(coords); // no error is good enough for this test
});

test(`setCoords() sets the coords`, () => {
  const plant = Plant();
  const coords = createGrid(10,10); // ['0,0', '0,1', '0,2', ..., '9,9']
  plant.setCoords(coords);
  expect(Object.keys(plant.coords)).toEqual(coords);
});

test(`setCoords() makes all coords empty`, () => {
  const plant = Plant();
  const coords = createGrid(2, 2);
  plant.setCoords(coords);

  const grid = {
    '0,0': '',
    '0,1': '',
    '1,0': '',
    '1,1': '',
  };

  expect(plant.coords).toEqual(grid);
});

// containsShoot(coord)
test('Plant has function containsShoot()', () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    containsShoot: expect.any(Function),
  });
});

// containsRoot(coord)
test('Plant has function containsRoot()', () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    containsRoot: expect.any(Function),
  });
});

// growShoots()
test(`Plant has function growShoots()`, () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    growShoots: expect.any(Function),
  });
});

// growRoots()
test(`Plant has function growRoots()`, () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    growRoots: expect.any(Function),
  });
});

// newShoot()
test(`Plant has function newShoot()`, () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    newShoot: expect.any(Function),
  });
});

// newRoot()
test(`Plant has function newRoot()`, () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    newRoot: expect.any(Function),
  });
});

// bloom()
test(`Plant has function bloom()`, () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    bloom: expect.any(Function),
  });
});
