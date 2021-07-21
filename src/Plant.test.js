import Plant from './Plant';
import Habitat from './Habitat';

// setCoords(coords)
test('Plant has function setCoords(coords)', () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    setCoords: expect.any(Function),
  });
});


// sprout()
test(`Plant has function sprout()`, () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    sprout: expect.any(Function),
  });
});

test(`sprout() creates one shoot cell and one root cell`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();

  plant.sprout();

  const numShootCells = plant.countCells('shoot');
  const numRootCells = plant.countCells('root');

  expect(numShootCells).toBe(1);
  expect(numRootCells).toBe(1);
});

test(`sprout() creates one shoot cell in the upper-center cell and one root cell in the lower-center cell`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();

  plant.sprout();

  expect(plant.coords).toMatchObject({
    '2,2': 'shoot',
    '2,3': 'root',
  });
  
});

test(`Successful call to sprout() returns true`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();
  
  const result = plant.sprout();

  expect(result).toBe(true);
});

// containsShoot(coord)
test('Plant has function containsShoot()', () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    containsShoot: expect.any(Function),
  });
});

test(`containsShoot() returns true as expected with a newly sprouted Plant`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();
  plant.sprout();

  expect(plant.containsShoot('2,2')).toBe(true);
});
test(`containsShoot() returns false as expected with a newly sprouted Plant`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();
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
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();
  plant.sprout();

  expect(plant.containsRoot('2,3')).toBe(true);
});
test(`containsRoot() returns false as expected with a newly sprouted Plant`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();
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

test(`Calling growShoots() on a new plant creates a second shoot cell`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();
  plant.sprout();

  plant.growShoots();

  const numShootCells = plant.countCells('shoot');

  expect(numShootCells).toBe(2);
});

test(`Calling growShoots() on a new plant makes a new cell directly above the new plant`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();
  plant.sprout();

  plant.growShoots();

  let str = '';
  str += '-----\n';
  str += '--s--\n';
  str += '--s--\n';
  str += '--r--\n';
  str += '-----\n';
  str += '-----\n';

  expect(plant.toString()).toBe(str);
});

test(`Calling growShoots() doesn't affect the number of root cells`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();
  plant.sprout();

  plant.growShoots();

  const numRootCells = plant.countCells('root');

  expect(numRootCells).toBe(1);
});

test(`A successful call to growShoots() returns true`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();
  plant.sprout();

  const result = plant.growShoots();

  expect(result).toBe(true);
});

// growRoots()
test(`Plant has function growRoots()`, () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    growRoots: expect.any(Function),
  });
});

test(`Calling growRoots() on a new plant creates a second root cell`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();
  plant.sprout();

  plant.growRoots();

  const numRootCells = plant.countCells('root');

  expect(numRootCells).toBe(2);
});

test(`Calling growRoots() on a new plant makes a new cell directly below the new plant`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();
  plant.sprout();

  plant.growRoots();

  let str = '';
  str += '-----\n';
  str += '-----\n';
  str += '--s--\n';
  str += '--r--\n';
  str += '--r--\n';
  str += '-----\n';

  expect(plant.toString()).toBe(str);
});

test(`Calling growRoots() doesn't affect the number of shoot cells`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();
  plant.sprout();

  plant.growRoots();

  const numShootCells = plant.countCells('shoot');

  expect(numShootCells).toBe(1);
});

test(`A successful call to growRoots() returns true`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();
  plant.sprout();

  const result = plant.growRoots();

  expect(result).toBe(true);
});

// newShoot()
test(`Plant has function newShoot()`, () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    newShoot: expect.any(Function),
  });
});

test(`Calling newShoot() and then growShoots() on a new plant creates two new shoot cells`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();

  plant.sprout();
  plant.newShoot();
  plant.growShoots();

  const numShootCells = plant.countCells('shoot');

  // console.log(plant.toString());

  expect(numShootCells).toBe(3);
});

test(`Calling newShoot() and then growShoots() twice on a new plant creates six shoot cells total`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();

  plant.sprout();
  plant.newShoot();
  plant.growShoots();
  plant.newShoot();
  plant.growShoots();

  const numShootCells = plant.countCells('shoot');

  // console.log(plant.toString());

  expect(numShootCells).toBe(6);
});

test(`Calling newShoot() and then growShoots() doesn't affect the number of root cells`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();

  plant.sprout();
  plant.newShoot();
  plant.growShoots();

  const numRootCells = plant.countCells('root');

  expect(numRootCells).toBe(1);
});

test(`A successful call to newShoot() returns true`, () => { // TODO: Consider returning something about the new origin point/GrowingTip instead?
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();

  plant.sprout();
  const result = plant.newShoot();

  expect(result).toBe(true);
});

// newRoot()
test(`Plant has function newRoot()`, () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    newRoot: expect.any(Function),
  });
});

test(`Calling newRoot() and then growRoots() on a new plant creates two new root cells`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();

  plant.sprout();
  plant.newRoot();
  plant.growRoots();

  const numRootCells = plant.countCells('root');

  // console.log(plant.toString());

  expect(numRootCells).toBe(3);
});

test(`Calling newRoot() and then growRoots() twice on a new plant creates six shoot cells total`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();

  plant.sprout();
  plant.newRoot();
  plant.growRoots();
  plant.newRoot();
  plant.growRoots();

  const numRootCells = plant.countCells('root');

  // console.log(plant.toString());

  expect(numRootCells).toBe(6);
});

test(`Calling newRoot() and then growRoots() doesn't affect the number of shoot cells`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();

  plant.sprout();
  plant.newRoot();
  plant.growRoots();

  const numShootCells = plant.countCells('shoot');

  expect(numShootCells).toBe(1);
});

test(`A successful call to newRoot() returns true`, () => { // TODO: Consider returning something about the new origin point/GrowingTip instead?
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();

  plant.sprout();
  const result = plant.newRoot();

  expect(result).toBe(true);
});

// bloom()
test(`Plant has function bloom()`, () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    bloom: expect.any(Function),
  });
});

test(`Successful call to bloom() returns true`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();

  plant.sprout();
  const result = plant.bloom();

  expect(result).toBe(true);
});

test(`When bloom() is called, one shoot cell switches to a flower cell`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();

  plant.sprout();
  plant.bloom();

  console.log(plant.toString());

  const numFlowerCells = plant.countCells('flower');

  expect(numFlowerCells).toBe(1);
});

// for dev: count cells
test(`Plant has function countCells()`, () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    countCells: expect.any(Function),
  });
});

// for dev: toString
test(`Plant has function toString()`, () => {
  const plant = Plant();
  expect(plant).toMatchObject({
    toString: expect.any(Function),
  });
});

test(`toString() returns a string`, () => {
  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();
  expect(plant.toString()).toEqual(expect.any(String));
});

test(`toString() properly stringifies an unsprouted plant`, () => {
  let str = '';
  str += '-----\n';
  str += '-----\n';
  str += '-----\n';
  str += '-----\n';
  str += '-----\n';

  const hab = Habitat();
  hab.createGrid(5,6);
  const plant = Plant();

  expect(plant.toString()).toBe(str);
});


// TODO: Write tests for when plant growth goes off the board