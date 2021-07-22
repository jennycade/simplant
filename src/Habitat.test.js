import Habitat from './Habitat';

test(`Habitat has function createGrid()`, () => {
  const hab = Habitat();
  expect(hab).toMatchObject({
    createGrid: expect.any(Function),
  });
});

// createGrid()
test(`createGrid() takes two dimensions`, () => {
  const hab = Habitat();
  hab.createGrid(10, 10);
});

test(`createGrid() returns an array`, () => {
  const hab = Habitat();
  const grid = hab.createGrid(10,10);
  expect(grid).toEqual(expect.any(Array));
});

test(`createGrid() returns an array of length 100 for a 10 x 10 board`, () => {
  const hab = Habitat();
  const grid = hab.createGrid(10,10);
  expect(grid.length).toBe(100);
});

test(`Habitat has function createPlant()`, () => {
  const hab = Habitat();
  expect(hab).toMatchObject({
    createPlant: expect.any(Function),
  });
});

test(`createPlant() returns an object`, () => {
  const hab = Habitat();
  const plant = hab.createPlant();

  expect(plant).toEqual(expect.any(Object));
});

// getMaxCoord()
test(`getMaxCoord returns the coord '4,4' on a 5x5 grid`, () => {
  const hab = Habitat();
  hab.createGrid(5,5);

  const max = hab.getMaxCoord();

  expect(max).toBe('4,4');
});

// getMidpoint()
test(`getMidpoint() returns the coord '2,2' for shoot on a 5x6 grid`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  expect(hab.getMidpoint('shoot')).toBe('2,2');
});

test(`getMidpoint() returns the coord '2,3' for root on a 5x6 grid`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  expect(hab.getMidpoint('root')).toBe('2,3');
});

test(`getMidpoint() returns the coord '49, 49' for shoot on a 100x100 grid`, () => {
  const hab = Habitat();
  hab.createGrid(100,100);
  expect(hab.getMidpoint('shoot')).toBe('49,49');
});

// getMidline()
test(`getMidline() returns 2 for a 5x6 grid`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  expect(hab.getMidline()).toBe(2);
});

test(`getMidline() returns 49 for a 100x100 grid`, () => {
  const hab = Habitat();
  hab.createGrid(100,100);
  expect(hab.getMidline()).toBe(49);
});

// getPixel
test(`Habitat has function getAbiotic()`, () => {
  const hab = Habitat();
  expect(hab).toMatchObject({
    getAbiotic: expect.any(Function),
  });
});

test(`getAbiotic() returns 'air' for empty shoot space`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  
  const pixel = hab.getAbiotic('0,0');

  expect(pixel).toBe('air');
});

test(`getAbiotic() returns 'soil' for empty root space`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  
  const pixel = hab.getAbiotic('4,4');

  expect(pixel).toBe('soil');
});