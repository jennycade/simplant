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

test(`getAbiotic() returns 'soil' for '0,3' on a 5x6 grid`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  
  const pixel = hab.getAbiotic('0,3');

  expect(pixel).toBe('soil');
});

test(`getAbiotic() returns 'air' for '0,2' on a 5x6 grid`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  
  const pixel = hab.getAbiotic('0,2');

  expect(pixel).toBe('air');
});

test(`getAbiotic() returns 'air' for '0,2' on a 5x5 grid`, () => {
  const hab = Habitat();
  hab.createGrid(5,5);
  
  const pixel = hab.getAbiotic('0,2');

  expect(pixel).toBe('air');
});

//////// Resources
test(`Habitat has function getResources`, () => {
  const hab = Habitat();
  expect(hab).toMatchObject({
    getResources: expect.any(Function),
  });
});

test(`getResources() returns an array`, () => {
  const hab = Habitat();
  const res = hab.getResources();
  expect(res).toEqual(expect.any(Array));
});

test(`Calling createSun makes resources length 1`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  
  hab.createSun();
  const res = hab.getResources();

  expect(res.length).toBe(1);
});

test(`Calling createWater makes resources length 1`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  
  hab.createWater();
  const res = hab.getResources();

  expect(res.length).toBe(1);
});


///////////// toString()
test(`Habitat.toString() returns the expected string for a blank grid.`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const str = hab.toString();

  let expectedStr = '';
  expectedStr += '     \n';
  expectedStr += '     \n';
  expectedStr += '     \n';
  expectedStr += '.....\n';
  expectedStr += '.....\n';
  expectedStr += '.....\n';

  expect(str).toEqual(expectedStr);
});

test(`Habitat.toString() renders environment + plant`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);

  const plant = hab.createPlant();
  plant.sprout();

  const str = hab.toString();

  let expectedStr = '';
  expectedStr += '     \n';
  expectedStr += '     \n';
  expectedStr += '  s  \n';
  expectedStr += '..r..\n';
  expectedStr += '.....\n';
  expectedStr += '.....\n';

  expect(str).toEqual(expectedStr);
});

test(`Habitat.toString() renders environment, plant, and sun`, () => {
  const hab = Habitat();
  hab.createGrid(1,6);

  const plant = hab.createPlant();
  plant.sprout();

  hab.createSun();

  const str = hab.toString();

  let expectedStr = '';
  expectedStr += 'p\n';
  expectedStr += ' \n';
  expectedStr += 's\n';
  expectedStr += 'r\n';
  expectedStr += '.\n';
  expectedStr += '.\n';

  expect(str).toEqual(expectedStr);
});

test(`Habitat.toString() renders environment, plant, and water`, () => {
  const hab = Habitat();
  hab.createGrid(1,6);

  const plant = hab.createPlant();
  plant.sprout();

  hab.createWater();

  const str = hab.toString();

  let expectedStr = '';
  expectedStr += ' \n';
  expectedStr += ' \n';
  expectedStr += 's\n';
  expectedStr += 'r\n';
  expectedStr += '.\n';
  expectedStr += 'w\n';

  expect(str).toEqual(expectedStr);
});

////////////// tick()
test(`Habitat has function tick()`, () => {
  const hab = Habitat();
  expect(hab).toMatchObject({
    tick: expect.any(Function),
  });
});

test(`After a tick, sunlight moves down`, () => {
  const hab = Habitat();
  hab.createGrid(1, 6);

  hab.createSun();
  hab.tick();

  const str = hab.toString();

  let expectedStr = '';
  expectedStr += ' \n';
  expectedStr += 'p\n';
  expectedStr += ' \n';
  expectedStr += '.\n';
  expectedStr += '.\n';
  expectedStr += '.\n';

  expect(str).toEqual(expectedStr);
});

test(`After a tick, water moves up`, () => {
  const hab = Habitat();
  hab.createGrid(1, 6);

  hab.createWater();
  hab.tick();

  const str = hab.toString();

  let expectedStr = '';
  expectedStr += ' \n';
  expectedStr += ' \n';
  expectedStr += ' \n';
  expectedStr += '.\n';
  expectedStr += 'w\n';
  expectedStr += '.\n';

  expect(str).toEqual(expectedStr);
});

test(`After a tick, sunlight moves down and water moves up`, () => {
  const hab = Habitat();
  hab.createGrid(1, 6);

  hab.createSun();
  hab.createWater();
  hab.tick();

  const str = hab.toString();

  let expectedStr = '';
  expectedStr += ' \n';
  expectedStr += 'p\n';
  expectedStr += ' \n';
  expectedStr += '.\n';
  expectedStr += 'w\n';
  expectedStr += '.\n';

  expect(str).toEqual(expectedStr);
});