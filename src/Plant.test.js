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

// sprout()
test(`Plant has function sprout()`, () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    sprout: expect.any(Function),
  });
});

test(`sprout() creates one shoot cell and one root cell`, () => {
  const plant = Plant();
  const coords = createGrid(5, 6);
  plant.setCoords(coords);

  plant.sprout();

  let numShootCells = 0;
  let numRootCells = 0;

  // count the occupied coordinates
  for (const [coord, val] of Object.entries(plant.coords)) {
    if (val === 'shoot') {
      numShootCells++;
    }
    if (val === 'root') {
      numRootCells++;
    }
  }

  expect(numShootCells).toBe(1);
  expect(numRootCells).toBe(1);
});

test(`sprout() creates one shoot cell in the upper-center cell and one root cell in the lower-center cell`, () => {
  const plant = Plant();
  const coords = createGrid(5, 6);
  plant.setCoords(coords);

  plant.sprout();

  expect(plant.coords).toMatchObject({
    '2,2': 'shoot',
    '2,3': 'root',
  });
  
});

// containsShoot(coord)
test('Plant has function containsShoot()', () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    containsShoot: expect.any(Function),
  });
});

test(`containsShoot() returns true as expected with a newly sprouted Plant`, () => {
  const plant = Plant();
  const coords = createGrid(5, 6);
  plant.setCoords(coords);
  plant.sprout();

  expect(plant.containsShoot('2,2')).toBe(true);
});
test(`containsShoot() returns false as expected with a newly sprouted Plant`, () => {
  const plant = Plant();
  const coords = createGrid(5, 6);
  plant.setCoords(coords);
  plant.sprout();

  expect(plant.containsShoot('2,0')).toBe(false);
});

// containsRoot(coord)
test('Plant has function containsRoot()', () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    containsRoot: expect.any(Function),
  });
});
test(`containsRoot() returns true as expected with a newly sprouted Plant`, () => {
  const plant = Plant();
  const coords = createGrid(5, 6);
  plant.setCoords(coords);
  plant.sprout();

  expect(plant.containsRoot('2,3')).toBe(true);
});
test(`containsRoot() returns false as expected with a newly sprouted Plant`, () => {
  const plant = Plant();
  const coords = createGrid(5, 6);
  plant.setCoords(coords);
  plant.sprout();

  expect(plant.containsRoot('2,0')).toBe(false);
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
