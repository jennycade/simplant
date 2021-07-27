import Resource from './Resource';
import { parseCoord } from './helpers';

const sunCoords = [
  '0,0', '1,0', '2,0', '3,0', '4,0',
  '0,1', '1,1', '2,1', '3,1', '4,1',
  '0,2', '1,2', '2,2', '3,2', '4,2',
];

const rootCoords = [
  '0,3', '1,3', '2,3', '3,3', '4,3',
  '0,4', '1,4', '2,4', '3,4', '4,4',
  '0,5', '1,5', '2,5', '3,5', '4,5',
]

///////// getCoords()
test(`Resource has function getCoords()`, () => {
  const sun = Resource('sun', sunCoords);
  expect(sun).toMatchObject({
    getCoords: expect.any(Function),
  });
});

test(`getCoords() returns an array`, () => {
  const sun = Resource('sun', sunCoords);
  const coords = sun.getCoords();
  expect(coords).toEqual(expect.any(Array));
});

test(`getCoords() returns an array of 1 coord`, () => {
  const sun = Resource('sun', sunCoords);
  const coords = sun.getCoords();
  expect(coords.length).toBe(1);
});

test(`getCoords() returns an array containing a coord at y = 0 for sun`, () => {
  const sun = Resource('sun', sunCoords);
  const coords = sun.getCoords();
  const y = parseCoord(coords[0])[1];

  expect(y).toBe(0);
});

test(`getCoords() returns an array containing a coord at y = ymax for water`, () => {
  const water = Resource('water', rootCoords);
  const coords = water.getCoords();
  const y = parseCoord(coords[0])[1];

  expect(y).toBe(5);
});

/////////// move()
test(`Resource has function move()`, () => {
  const sun = Resource('sun', sunCoords);
  expect(sun).toMatchObject({
    move: expect.any(Function),
  });
});

test(`move() returns an array`, () => {
  const sun = Resource('sun', sunCoords);
  const newCoords = sun.move();
  expect(newCoords).toEqual(expect.any(Array));
});

test(`The sun moves down`, () => {
  const sun = Resource('sun', sunCoords);
  const newCoords = sun.move();

  const y = parseCoord(newCoords[0])[1];

  expect(y).toBe(1);
});